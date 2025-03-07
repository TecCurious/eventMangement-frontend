import { useEffect, useState } from 'react';
import Link from 'next/link';

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
 

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      
      if (!token) {
        setIsAuthenticated(false);
        return;
      }

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/auth/me`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
    
        const data = await response.json();
    
        if (response.ok && data.emailVerified) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
          localStorage.removeItem("token"); // Clear invalid token
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        setIsAuthenticated(false);
        localStorage.removeItem("token");
      } finally {
      }
    };

    checkAuth();
  }, []); // Run once on mount

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

 

  return (
    <nav className="bg-white shadow-lg fixed w-full top-0 z-50">
      {/* Rest of your existing nav markup... */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo section remains the same */}
          <div className="flex-shrink-0 flex items-center">
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

          {/* Desktop Navigation with conditional rendering */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            <Link href="/">
              <div className="text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-md text-md font-bold">
                Home
              </div>
            </Link>
           {isAuthenticated && <Link href="/events">
              <div className="text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-md text-md font-bold">
                Events
              </div>
            </Link>}
            <Link href={isAuthenticated ? "/dashboard" : "/auth/register"}>
              <div className="ml-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
                {isAuthenticated ? "Dashboard" : "Get Started"}
              </div>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-indigo-600 hover:bg-gray-100 focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t">
          <Link href="/">
            <div className="block text-gray-600 hover:text-indigo-600 hover:bg-gray-50 px-3 py-2 rounded-md text-base font-medium">
              Home
            </div>
          </Link>
          <Link href="/events">
            <div className="block text-gray-600 hover:text-indigo-600 hover:bg-gray-50 px-3 py-2 rounded-md text-base font-medium">
              Events
            </div>
          </Link>
          <div className="px-3 py-2">
            <Link href={isAuthenticated ? "/dashboard" : "/auth/register"}>
              <div className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
                {isAuthenticated ? "Dashboard" : "Get Started"}
              </div>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;