import { useEffect, useState } from 'react';
import Link from 'next/link';


export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);


  useEffect(() => {
    fetchUserData();  
  }, []);

   const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/auth/me`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`, // Include the token in the header
            },
          }
        );
  
        const data = await response.json();
        console.log(data);
  
        if (response.ok) {
          if (data.emailVerified) {
            setIsAuthenticated(true);
            
            return;
          }
          
         
        }
        
      } catch (error) {
        console.log(error);
        
      } 
        
      
    };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-lg fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
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

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            <Link href="/">
              <div className="text-gray-600 hover:text-indigo-600  px-3 py-2 rounded-md text-md  font-bold transition-colors duration-200">
                Home
              </div>
            </Link>
            <Link href="/events">
              <div className="text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-md text-ms font-bold transition-colors duration-200">
                Events
              </div>
            </Link>
            <Link href="/about">
              <div className="text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-md text-md font-bold transition-colors duration-200">
                About
              </div>
            </Link>
            <Link href="/auth/register">
              <div className="ml-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-colors duration-200">
                Get Started
              </div>
            </Link>
          </div>

          {/* Hamburger Menu Button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={toggleMenu}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-indigo-600 hover:bg-gray-100 focus:outline-none transition-colors duration-200"
              aria-expanded="false"
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

      {/* Mobile Menu */}
      <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t">
          <Link href="/">
            <div className="block text-gray-600 hover:text-indigo-600 hover:bg-gray-50 px-3 py-2 rounded-md text-base font-medium transition-colors duration-200">
              Home
            </div>
          </Link>
          <Link href="/events">
            <div className="block text-gray-600 hover:text-indigo-600 hover:bg-gray-50 px-3 py-2 rounded-md text-base font-medium transition-colors duration-200">
              Events
            </div>
          </Link>
          <Link href="/about">
            <div className="block text-gray-600 hover:text-indigo-600 hover:bg-gray-50 px-3 py-2 rounded-md text-base font-medium transition-colors duration-200">
              About
            </div>
          </Link>
          <div className="px-3 py-2">
            <Link href={`${isAuthenticated ? "/dashboard": '"auth/register"'}`}>
              <div className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-colors duration-200">
               {isAuthenticated ? "Dashboard" : "Get Started" }
              </div>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;