import * as cheerio from 'cheerio';
import { NextRequest, NextResponse } from "next/server";

interface DepartingFlight {
    destination: string;
    airline: string;
    flight_number: string;
    date: string;
    scheduled_time: string;
    status: string;
    gate: string;
    details: string;
}

export async function GET(req: NextRequest, res: NextResponse) {
    const { searchParams } = new URL(req.url);
    const flightNumber = searchParams.get('flightNumber');
    const airline = searchParams.get('airline');
    const date = searchParams.get('date');

    if (!flightNumber) {
        return NextResponse.json({ error: 'Flight number is required.' }, { status: 400 });
    }

    const baseUrl = `https://www.portseattle.org/sea-tac/flight-status?flight_date=${date}&arr_or_depart=D&airline=${airline}&depart_city=&flightNo=${flightNumber}&datetime_start=&datetime_end=`;
    try {
        const response = await fetch(baseUrl);
        const html = await response.text();
        const $ = cheerio.load(html);

        const flightData: DepartingFlight = {
            destination: '',
            airline: '',
            flight_number: '',
            date: '',
            scheduled_time: '',
            status: '',
            gate: '',
            details: '',
        };

        const flightDetail = $('.flight-detail-item');
        if (flightDetail.length > 0) {
            flightData.destination = $('p:contains("Destination") strong', flightDetail).parent().text().trim().replace('Destination:', '').trim();
            flightData.airline = $('h4.modal-title a', flightDetail).text().trim();
            flightData.flight_number = $('p:contains("Flight Number") strong', flightDetail).parent().text().trim().replace('Flight Number:', '').trim();
            flightData.date = $('p:contains("Date") strong', flightDetail).parent().text().trim().replace('Date:', '').trim();
            flightData.scheduled_time = $('p:contains("Scheduled Time") strong', flightDetail).parent().text().trim().replace('Scheduled Time:', '').trim();
            flightData.status = $('p:contains("Status") strong', flightDetail).parent().text().trim().replace('Status:', '').trim();
            flightData.gate = $('p:contains("Gate") strong', flightDetail).parent().text().trim().replace('Gate:', '').trim();
        }

        return NextResponse.json({ flight: flightData }, { status: 200 });
    } catch (error) {
        console.error(`Error fetching data for flight ${flightNumber}:`, error);
        return NextResponse.json({ error: 'Failed to fetch flight data.' }, { status: 500 });
    }
}
