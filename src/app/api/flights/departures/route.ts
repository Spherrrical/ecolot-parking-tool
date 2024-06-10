import * as cheerio from 'cheerio';
import { NextRequest, NextResponse } from "next/server";

const fetchedFlights = new Set();

export async function GET(req: NextRequest, res: NextResponse) {
    const { searchParams } = new URL(req.url);
    const startPage = parseInt(searchParams.get('page') || '1', 10);

    const baseUrl = "https://www.portseattle.org/sea-tac/flight-status?flightNo=&flight_date=&airline=&page={}&arrive_city=&depart_city=&arr_or_depart=D&datetime_start=&datetime_end=&orderby=City";
    const headers: string[] = [];
    const flights: {}[] = [];

    let page = startPage;
    let hasMoreFlights = true;

    while (hasMoreFlights && page <= 36) {
        const url = baseUrl.replace('{}', String(page));
        try {
            const response = await fetch(url);
            const html = await response.text();
            const $ = cheerio.load(html);

            if (page === 1) {
                const headerHtml = $('table.datatable thead');
                headers.push(...headerHtml.find('th').map((_, el) => $(el).text().trim()).get());
            }

            const rowHtml = $('table.datatable tbody tr');
            let newFlightsAdded = false;

            rowHtml.each((_, row) => {
                const flightData = {};
                const cells = $(row).find('td');
                cells.each((i, cell) => {
                    if (i < headers.length) {
                        const key = headers[i].toLowerCase().replace(/\s/g, '_').replace('#', '').replace(/_$/, '');
                        // @ts-ignore
                        flightData[key] = $(cell).text().trim();
                    }
                });

                const flightKey = JSON.stringify(flightData);
                if (!fetchedFlights.has(flightKey)) {
                    flights.push(flightData);
                    fetchedFlights.add(flightKey);
                    newFlightsAdded = true;
                }
            });

            hasMoreFlights = newFlightsAdded;
            page++;
        } catch (error) {
            console.error(`Error fetching data from page ${page}:`, error);
            hasMoreFlights = false;
        }
    }

    const nextPage = page <= 21 ? page : null;
    return NextResponse.json({ flights, nextPage }, { status: 200 });
}
