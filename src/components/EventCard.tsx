"use client";
import React from 'react';
import Image from 'next/image';
import { format } from 'date-fns';

export interface IEvent {
    _id: string;
    name: string;
    description: string;
    date: string;
    image: string;
    creator: string;
    attendees: string[];
  }

interface EventCardProps {
  event: IEvent;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 ease-in-out transform hover:-translate-y-1 flex flex-col h-full">
      <div className="relative h-48 w-full">
        <img
          src={event.image}
          alt={event.name}
          className="object-cover w-full h-full"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
      </div>
      
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-2xl font-semibold text-gray-900 mb-3 truncate">
          {event.name}
        </h3>
        
        <p className="text-gray-700 mb-4 line-clamp-2">
          {event.description}
        </p>
        
        <div className="mt-auto space-y-3">
          <div className="flex items-center text-sm text-gray-600">
            <svg 
              className="w-5 h-5 mr-2" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" 
              />
            </svg>
            {format(new Date(event.date), 'MMM dd, yyyy - HH:mm')}
          </div>
          
          <div className="flex items-center text-sm text-gray-600">
            <svg 
              className="w-5 h-5 mr-2" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" 
              />
            </svg>
            {event.attendees.length} Attendees
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;