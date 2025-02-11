"use client"
import { RegistrationForm } from "@/components/RegistrationForm";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Register() {

    useEffect(() => { 
        fetchUserData();
    }, []);
    const router = useRouter();

    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
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
  
        // const data = await response.json();
  
        if (response.ok) {
          router.push("/dashboard");
        }
      } 
       
      catch (error) {
        console.log("An error occurred", error);
      }
    };
  

  return (

    <div className="flex items-center justify-center min-h-screen bg-gray-100">
     
        <RegistrationForm />
      </div>
    
  );
}