"use client";
import React, { useState } from 'react';
import { Menu, X, ChevronRight, LayoutDashboard, Calendar, CalendarCheck, Home, User, Mail, LogOut } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
    const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const menuItems = [
    { icon: LayoutDashboard, text: 'Dashboard', href: '/dashboard' },
    { icon: Calendar, text: 'Create Event', href: '/dashboard/create-event' },
    { icon: CalendarCheck, text: 'My Events', href: '/dashboard/my-events' },
  ];

  const handleLinkClick = () => {
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  };

  const handleLogout = () =>{
    localStorage.removeItem('token');
    router.push("/auth/login");
  }

  return (
    <div className="min-h-screen bg-indigo-50">
      {/* Top Bar */}
      <div className="fixed top-0 left-0 right-0 h-16 bg-white border-b z-30 ">
        <div className="flex items-center justify-between px-4 h-full max-w-7xl mx-auto">
          <div className="flex items-center">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg hover:bg-indigo-50 lg:hidden"
            >
              {sidebarOpen ? <X size={24} className="text-indigo-600" /> : <Menu size={24} className="text-indigo-600" />}
            </button>
            <Link href="/">
              <div className="text-xl font-bold text-indigo-600 flex items-center">
                <svg 
                  className="h-8 w-8 mr-2" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" 
                  />
                </svg>
                EventHub
              </div>
            </Link>
          </div>

          <div className="flex items-center space-x-6">
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/" className="text-gray-600 hover:text-indigo-600 flex items-center gap-2">
                <Home size={20} />
                Home
              </Link>
              <Link href="/events" className="text-gray-600 hover:text-indigo-600 flex items-center gap-2">
                <Calendar size={20} />
                Events
              </Link>
            </nav>
            
            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="p-2 rounded-full hover:bg-indigo-50"
              >
                <User size={24} className="text-indigo-600" />
              </button>

              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 border">
                  <button
                    onClick={() => {
                      setShowProfileMenu(false);
                      handleLinkClick();
                    }}
                    className="w-full px-4 py-2 text-left text-gray-600 hover:bg-indigo-50 flex items-center gap-2"
                  >
                    <div className='flex items-center gap-2' onClick={handleLogout}>
                      <LogOut size={16} />
                      Logout
                    </div>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Rest of the component remains unchanged */}
      <div
        className={`fixed top-0 left-0 h-screen w-64 bg-white border-r transform transition-transform duration-200 ease-in-out z-20
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      >
        <div className="h-16 flex items-center justify-center border-b">
          <span className="text-xl font-bold text-indigo-600">Events Hub</span>
        </div>

        <nav className="p-4 space-y-2 mt-2 flex flex-col h-[calc(100vh-4rem)]">
          <div className="flex-1">
            {menuItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                onClick={handleLinkClick}
                className="flex items-center space-x-3 px-4 py-3 text-gray-600 rounded-lg hover:bg-indigo-50 hover:text-indigo-600 transition-colors mb-2"
              >
                <item.icon size={20} />
                <span>{item.text}</span>
                <ChevronRight size={16} className="ml-auto" />
              </Link>
            ))}
          </div>

          <div className="border-t pt-4">
            <div className="flex items-center space-x-3 px-4 py-3 text-gray-600">
              <Mail size={20} />
              <span className="text-sm">user@example.com</span>
            </div>
          </div>
        </nav>
      </div>

      <div className="pt-16 lg:pl-64">
        <main className="p-6">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default DashboardLayout;