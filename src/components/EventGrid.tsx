"use client";
import React from 'react';
import EventCard from './EventCard';
// import { IEvent } from '../types/event';
export interface IEvent {
    _id: string;
    name: string;
    description: string;
    date: string;
    image: string;
    creator: string;
    attendees: string[];
  }

interface EventGridProps {
  events: IEvent[];
}

const EventGrid: React.FC<EventGridProps> = ({ events }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {events.map((event) => (
        <EventCard key={event._id} event={event} />
      ))}
    </div>
  );
};

export default EventGrid;