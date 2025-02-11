"use client";
import React, { useState, useEffect } from 'react';
import EventGrid from '@/components/EventGrid';
// import { IEvent } from '@/types/event';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
export interface IEvent {
    _id: string;
    name: string;
    description: string;
    date: string;
    image: string;
    creator: string;
    attendees: string[];
  }

const EventsPage: React.FC = () => {
    const router = useRouter();
  const [events, setEvents] = useState<IEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/events/events`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (!response.ok) {
        //   throw new Error('Failed to fetch events');
        router.push("/auth/login");
        }

        const data = await response.json();
        console.log(data);
        setEvents(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-red-50 p-4 rounded-lg">
          <p className="text-red-800">Error: {error}</p>
        </div>
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">
            No Events Found
          </h2>
          <p className="text-gray-500">
            There are currently no events to display.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
    <Navbar />  
    
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 mt-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Events</h1>
        <p className="mt-2 text-gray-600">
          Discover and join upcoming events
        </p>
      </div>
      
      <EventGrid events={events} />
    </div>
    </div>
  );
};

export default EventsPage;