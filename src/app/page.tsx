'use client';
import { useEffect, useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";

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

interface ArrivingFlight {
    origin: string;
    airline: string;
    flight_number: string;
    date: string;
    scheduled_time: string;
    status: string;
    claim: string;
    gate: string;
    details: string;
}

export default function Home() {
    const [departingFlights, setDepartingFlights] = useState<DepartingFlight[]>([]);
    const [arrivingFlights, setArrivingFlights] = useState<ArrivingFlight[]>([]);
    const [filteredDepartingFlights, setFilteredDepartingFlights] = useState<DepartingFlight[]>([]);
    const [filteredArrivingFlights, setFilteredArrivingFlights] = useState<ArrivingFlight[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const [flightNumberFilter, setFlightNumberFilter] = useState("");

    useEffect(() => {
        const filtered = departingFlights.filter((flight) => {
            const flightNumberMatch =
                flightNumberFilter === "" ||
                flight.flight_number.includes(flightNumberFilter);
            return flightNumberMatch;
        });
        setFilteredDepartingFlights(filtered);
    }, [departingFlights, flightNumberFilter]);

    useEffect(() => {
        const filtered = arrivingFlights.filter((flight) => {
            const flightNumberMatch =
                flightNumberFilter === "" ||
                flight.flight_number.includes(flightNumberFilter);
            return flightNumberMatch;
        });
        setFilteredArrivingFlights(filtered);
    }, [arrivingFlights, flightNumberFilter]);

    async function fetchDepartingFlights() {
        setIsLoading(true);
        const response = await fetch(`/api/flights/departures`);
        const data = await response.json();
        setDepartingFlights(data.flights);
        setIsLoading(false);
    }

    async function fetchArrivingFlights() {
        setIsLoading(true);
        const response = await fetch(`/api/flights/arrivals`);
        const data = await response.json();
        console.log(data);
        setArrivingFlights(data.flights);
        setIsLoading(false);
    }

    useEffect(() => {
        fetchDepartingFlights();
        fetchArrivingFlights();
    }, []);

    return (
        <div className="container mx-auto py-8">
            <div className="flex items-center justify-between mb-5 mt-12">
                <h1 className="text-xl font-satoshi-bold sm:text-4xl  ml-3">Eco-Lot FlightFinder</h1>
            </div>
            <div className="flex flex-col gap-4 ml-3 mb-4">
                <div className="relative">
                    <p className="font-satoshi-medium">Welcome to Eco-Lot's FlightFinder! Looking for a specific flight? Enter the flight number below to view statuses and gate information.</p>
                </div>
                <Input
                    type="text"
                    placeholder="Filter by a flight number..."
                    value={flightNumberFilter}
                    onChange={(e) => setFlightNumberFilter(e.target.value)}
                    className="mb-4 sm:mb-0 w-auto font-satoshi-medium"
                />
            </div>
            <Tabs defaultValue="arrivals">
                <TabsList  className="grid w-full grid-cols-2 rounded-full">
                    <TabsTrigger className="font-satoshi-bold rounded-full" value="arrivals">Arrivals</TabsTrigger>
                    <TabsTrigger className="font-satoshi-bold rounded-full" value="departures">Departures</TabsTrigger>
                </TabsList>
                <TabsContent value="arrivals">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[200px] font-satoshi-medium">Origin</TableHead>
                                <TableHead className="font-satoshi-medium">Airline</TableHead>
                                <TableHead className="font-satoshi-medium">Flight Number</TableHead>
                                <TableHead className="font-satoshi-medium">Scheduled Arrival</TableHead>
                                <TableHead className="font-satoshi-medium">Status</TableHead>
                                <TableHead className="font-satoshi-medium">Gate</TableHead>
                                <TableHead className="font-satoshi-medium">Baggage Claim</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredArrivingFlights.map((flight, index) => (
                                <TableRow key={index}>
                                    <TableCell className="font-satoshi-bold">
                                        {flight.origin.split('(')[0]}
                                        <span className="text-neutral-400">({flight.origin.split('(')[1]}</span>
                                    </TableCell>
                                    <TableCell className="font-satoshi-medium">{flight.airline}</TableCell>
                                    <TableCell className="font-satoshi-medium">{flight.flight_number}</TableCell>
                                    <TableCell className="font-satoshi-medium">{flight.date} at {flight.scheduled_time}</TableCell>
                                    <TableCell
                                        className={`font-satoshi-medium ${
                                            flight.status === "Delayed" || flight.status === "Cancelled"
                                                ? "text-red-500"
                                                : flight.status === "Landed" ||
                                                flight.status === "On-Time" ||
                                                flight.status.includes("Now")
                                                    ? "text-green-500"
                                                    : ""
                                        }`}
                                    >
                                        {flight.status}
                                    </TableCell>
                                    <TableCell className="font-satoshi-light">{flight.gate}</TableCell>
                                    <TableCell className="font-satoshi-light">{flight.claim}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TabsContent>
                <TabsContent value="departures">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[200px] font-satoshi-medium">Destination</TableHead>
                                <TableHead className="font-satoshi-medium">Airline</TableHead>
                                <TableHead className="font-satoshi-medium">Flight Number</TableHead>
                                <TableHead className="font-satoshi-medium">Scheduled Departure</TableHead>
                                <TableHead className="font-satoshi-medium">Status</TableHead>
                                <TableHead className="font-satoshi-medium">Gate</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredDepartingFlights.map((flight, index) => (
                                <TableRow key={index}>
                                    <TableCell className="font-satoshi-bold">
                                        {flight.destination.split('(')[0]}
                                        <span className="text-neutral-400">({flight.destination.split('(')[1]}</span>
                                    </TableCell>
                                    <TableCell className="font-satoshi-medium">{flight.airline}</TableCell>
                                    <TableCell className="font-satoshi-medium">{flight.flight_number}</TableCell>
                                    <TableCell className="font-satoshi-medium">{flight.date} at {flight.scheduled_time}</TableCell>
                                    <TableCell
                                        className={`font-satoshi-medium ${
                                            flight.status === "Delayed" || flight.status === "Cancelled"
                                                ? "text-red-500"
                                                : flight.status === "Departed" ||
                                                flight.status === "On-Time" ||
                                                flight.status.includes("Now")
                                                    ? "text-green-500"
                                                    : ""
                                        }`}
                                    >
                                        {flight.status}
                                    </TableCell>
                                    <TableCell className="font-satoshi-light">{flight.gate}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TabsContent>
            </Tabs>

            <a href={`https://github.com/Spherrrical/ecolot-parking-tool`} className="text-neutral-400 font-satoshi-light flex text-sm ml-4 mt-10 mb-12 ">
                All data was fetched from the official website of Seattle-Tacoma International Airport (portseattle.org) <span className="text-neutral-500 underline ml-1">Click here to view the source code</span>
            </a>
        </div>
    );
}
