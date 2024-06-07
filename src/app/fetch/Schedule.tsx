import { useEffect, useState } from 'react';

type Flight = {
    flight: {
        airline: {
            name: string;
        };
        identification: {
            number: {
                default: string;
            };
        };
        airport: {
            destination: {
                name: string;
            };
            origin: {
                info: {
                    gate: string;
                };
            };
        };
        time: {
            scheduled: {
                departure: number;
            };
        };
        status: {
            text: string;
        };
    };
};


const FlightTable = () => {
    const [flights, setFlights] = useState<Flight[]>([]);

    useEffect(() => {
        const fetchFlights = async () => {
            const response = await fetch(
                'https://api.flightapi.io/compschedule/666005c15ee135f4d47f9f33?mode=departures&iata=SEA'
            );
            const data = await response.json();
            setFlights(data.airport?.pluginData.schedule.departures.data);
        };

        fetchFlights();
    }, []);

    return (
        <div className="container mx-auto">
            <h1 className="text-2xl font-bold mb-4">Flight Information</h1>
            <table className="table-auto w-full">
                <thead>
                <tr>
                    <th className="px-4 py-2">Airline</th>
                    <th className="px-4 py-2">Flight Num</th>
                    <th className="px-4 py-2">Destination</th>
                    <th className="px-4 py-2">Scheduled Time</th>
                    <th className="px-4 py-2">Gate</th>
                    <th className="px-4 py-2">Status</th>
                </tr>
                </thead>
                <tbody>
                {flights.map((flight) => (
                    <tr key={flight.flight.identification.number.default}>
                        <td className="border px-4 py-2">
                            {flight.flight.airline.name}
                        </td>
                        <td className="border px-4 py-2">
                            {flight.flight.identification.number.default}
                        </td>
                        <td className="border px-4 py-2">
                            {flight.flight.airport.destination.name}
                        </td>
                        <td className="border px-4 py-2">
                            {new Date(
                                flight.flight.time.scheduled.departure * 1000
                            ).toLocaleString()}
                        </td>
                        <td className="border px-4 py-2">
                            {flight.flight.airport.origin.info.gate}
                        </td>
                        <td className="border px-4 py-2">{flight.flight.status.text}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default FlightTable;
