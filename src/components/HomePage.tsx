import React from 'react';
import Link from 'next/link';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section - Enhanced mobile responsiveness */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1600320271815-fd1edc51650b?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Event background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black opacity-50"></div>
        </div>
        
        <div className="relative px-4 py-12 sm:px-6 sm:py-16 md:py-20 lg:py-24 lg:px-8">
          <div className="text-center max-w-xl mx-auto">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white">
              Create & Manage Events
              <span className="block text-indigo-400 mt-2">Your Way</span>
            </h1>
            <p className="mt-4 sm:mt-6 text-base sm:text-lg md:text-xl text-gray-300 px-4">
              Create, manage, and join events effortlessly. Perfect for organizers and attendees alike.
            </p>
            <div className="mt-6 sm:mt-8 md:mt-10">
              <Link 
                href="/auth/register" 
                className="inline-flex items-center px-6 sm:px-8 py-2.5 sm:py-3 border border-transparent text-sm sm:text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-colors duration-200"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section - Improved spacing for mobile */}
      <div className="py-12 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Why Choose Our Platform?</h2>
          </div>

          <div className="mt-12 sm:mt-16">
            <div className="grid grid-cols-1 gap-y-8 sm:gap-12 md:grid-cols-3 md:gap-8">
              {/* Feature 1 - Adjusted for better mobile layout */}
              <div className="flex flex-col items-center px-4">
                <div className="flex items-center justify-center h-12 w-12 sm:h-16 sm:w-16 rounded-md bg-indigo-500 text-white">
                  <svg className="h-6 w-6 sm:h-8 sm:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <h3 className="mt-4 text-lg sm:text-xl font-medium text-gray-900">Create Events</h3>
                <p className="mt-2 text-sm sm:text-base text-gray-500 text-center">
                  Create and customize your events with ease. Add details, set capacity, and manage registrations.
                </p>
              </div>

              {/* Feature 2 - Adjusted for better mobile layout */}
              <div className="flex flex-col items-center px-4">
                <div className="flex items-center justify-center h-12 w-12 sm:h-16 sm:w-16 rounded-md bg-indigo-500 text-white">
                  <svg className="h-6 w-6 sm:h-8 sm:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="mt-4 text-lg sm:text-xl font-medium text-gray-900">Join Events</h3>
                <p className="mt-2 text-sm sm:text-base text-gray-500 text-center">
                  Discover and join events that interest you. Connect with like-minded people.
                </p>
              </div>

              {/* Feature 3 - Adjusted for better mobile layout */}
              <div className="flex flex-col items-center px-4">
                <div className="flex items-center justify-center h-12 w-12 sm:h-16 sm:w-16 rounded-md bg-indigo-500 text-white">
                  <svg className="h-6 w-6 sm:h-8 sm:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h3 className="mt-4 text-lg sm:text-xl font-medium text-gray-900">Track Everything</h3>
                <p className="mt-2 text-sm sm:text-base text-gray-500 text-center">
                  Keep track of your events, RSVPs, and attendees all in one place.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section - Enhanced mobile responsiveness */}
      <div className="bg-indigo-800">
        <div className="max-w-2xl mx-auto text-center py-12 px-4 sm:py-16 sm:px-6 lg:py-20 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white">
            Ready to start organizing?
          </h2>
          <p className="mt-4 text-base sm:text-lg leading-6 text-indigo-200">
            Join thousands of event organizers who trust our platform
          </p>
          <Link
            href="/register"
            className="mt-6 sm:mt-8 w-full sm:w-auto inline-flex items-center justify-center px-4 sm:px-5 py-2.5 sm:py-3 border border-transparent text-sm sm:text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50 transition-colors duration-200"
          >
            Get Started Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;