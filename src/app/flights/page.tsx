'use client';
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import airlineData from "./airlines.json";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"


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

export default function Home() {
    const [arrivingFlight, setArrivingFlight] = useState<ArrivingFlight | null>(null);
    const [departingFlight, setDepartingFlight] = useState<DepartingFlight | null>(null);
    const [flightNumber, setFlightNumber] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [activeTab, setActiveTab] = useState("arrivals");
    const [airline, setAirline] = useState('');
    const [date, setDate] = useState('');

    useEffect(() => {
        console.log(date)
    }, [date])

    async function fetchArrivingFlight() {
        setIsLoading(true);
        const response = await fetch(`/api/flights/arrivals?flightNumber=${flightNumber}&airline=${airline}&date=${date}`);
        const data = await response.json();
        setArrivingFlight(data.flight);
        setIsLoading(false);
    }

    async function fetchDepartingFlight() {
        setIsLoading(true);
        const response = await fetch(`/api/flights/departures?flightNumber=${flightNumber}&airline=${airline}&date=${date}`);
        const data = await response.json();
        setDepartingFlight(data.flight);
        setIsLoading(false);
    }

    function handleSearch() {
        if (activeTab === "arrivals") {
            fetchArrivingFlight();
        } else {
            fetchDepartingFlight();
        }
    }

    return (
        <div className="container mx-auto py-8">
            <div className="flex items-center justify-between mb-5 mt-12">
                <h1 className="text-xl font-satoshi-bold sm:text-4xl ml-3">Eco-Lot FlightFinder</h1>
            </div>
            <div className="flex flex-col gap-4 ml-3 mb-4">
                <div className="relative">
                    <p className="font-satoshi-medium">Welcome to Eco-Lot's FlightFinder! Looking for a specific flight?
                        Enter the flight number below to view statuses and gate information.</p>
                </div>
                {/* Stack vertically on mobile, show horizontally on desktop, make sure they have breathing room */}
                <div className="flex flex-col sm:flex-row gap-4">
                    <Select
                        value={date}
                        onValueChange={(value) => setDate(value)}
                    >
                        <SelectTrigger className="w-auto font-satoshi-medium">
                            <SelectValue placeholder="Select Date"  />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value={new Date().toISOString().split('T')[0]} onClick={() => setDate(new Date().toISOString().split('T')[0])} onChange={() => setDate(new Date().toISOString().split('T')[0])}>
                                Today
                            </SelectItem>
                            <SelectItem value={new Date(Date.now() + 86400000).toISOString().split('T')[0]} onClick={() => setDate(new Date(Date.now() + 86400000).toISOString().split('T')[0])} onChange={() => setDate(new Date(Date.now() + 86400000).toISOString().split('T')[0])}>
                                Tomorrow
                            </SelectItem>
                        </SelectContent>
                    </Select>
                    <Select
                        value={airline}
                        onValueChange={(value) => setAirline(value)}
                    >
                        <SelectTrigger className="w-auto font-satoshi-medium">
                            <SelectValue placeholder="Select Airline" />
                        </SelectTrigger>
                        <SelectContent>
                            {Object.entries(airlineData).map(([airlineName, airlineCode]) => (
                                <SelectItem key={airlineCode} value={airlineCode}>
                                    {airlineName}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <Input
                        type="text"
                        placeholder="Enter flight number..."
                        inputMode="numeric"
                        value={flightNumber}
                        onChange={(e) => {
                            const value = e.target.value;
                            const numericReg = /^[0-9]*$/;
                            if (numericReg.test(value)) {
                                setFlightNumber(value);
                            }
                        }}
                        className="w-auto font-satoshi-medium"
                    />
                    <Button onClick={handleSearch} disabled={isLoading}>
                        Search
                    </Button>
                </div>
            </div>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-2 rounded-full">
                    <TabsTrigger className="font-satoshi-bold rounded-full" value="arrivals">Arrivals</TabsTrigger>
                    <TabsTrigger className="font-satoshi-bold rounded-full" value="departures">Departures</TabsTrigger>
                </TabsList>
                <TabsContent value="arrivals">
                    {arrivingFlight && (
                        <Card className="mt-4">
                            <CardHeader>
                                <CardTitle>
                                    {arrivingFlight.origin.split('(')[0]}
                                    <span className="text-neutral-400">({arrivingFlight.origin.split('(')[1]}</span>
                                    <p className="font-satoshi-medium mt-2 text-xl">{arrivingFlight.airline} | {arrivingFlight.flight_number}</p>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div>
                                    <p className={`font-satoshi-medium text-2xl ${
                                        arrivingFlight.status === "Delayed" || arrivingFlight.status === "Cancelled"
                                            ? "text-red-500"
                                            : arrivingFlight.status === "Landed" ||
                                            arrivingFlight.status === "On-Time" ||
                                            arrivingFlight.status.includes("Now")
                                                ? "text-green-500"
                                                : ""
                                    }`}>
                                        {arrivingFlight.status} | Gate {arrivingFlight.gate}
                                    </p>
                                </div>
                                <div>
                                    <p className="font-satoshi-medium text-neutral-400 mt-1">{arrivingFlight.date} at {arrivingFlight.scheduled_time}</p>
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </TabsContent>
                <TabsContent value="departures">
                    {departingFlight && (
                        <Card className="mt-4">
                            <CardHeader>
                                <CardTitle>
                                    {departingFlight.destination.split('(')[0]}
                                    <span
                                        className="text-neutral-400">({departingFlight.destination.split('(')[1]}</span>
                                    <p className="font-satoshi-medium mt-2 text-xl">{departingFlight.airline} | {departingFlight.flight_number}</p>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div>
                                    <p className={`font-satoshi-medium text-2xl ${
                                        departingFlight.status === "Delayed" || departingFlight.status === "Cancelled"
                                            ? "text-red-500"
                                            : departingFlight.status === "Departed" ||
                                            departingFlight.status === "On-Time" ||
                                            departingFlight.status.includes("Now")
                                                ? "text-green-500"
                                                : ""
                                    }`}>
                                        {departingFlight.status} | Gate {departingFlight.gate}
                                    </p>
                                </div>
                                <div>
                                    <p className="font-satoshi-medium text-neutral-400 mt-1">{departingFlight.date} at {departingFlight.scheduled_time}</p>
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </TabsContent>
            </Tabs>
            <a href={`https://github.com/Spherrrical/ecolot-parking-tool`}
               className="text-neutral-400 font-satoshi-light flex text-sm ml-4 mt-10 mb-12 ">
                All data was fetched from the official website of Seattle-Tacoma International Airport
                (portseattle.org) <span
                className="text-neutral-500 underline ml-1">Click here to view the source code</span>
            </a>
        </div>
    );
}
