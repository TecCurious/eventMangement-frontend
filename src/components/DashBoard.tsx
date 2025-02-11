"use client"
import React, {  useEffect } from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

interface UserData {
  email: string;
  username: string;
}

const Dashboard = () => {
  

  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const [userData, setUserData] = useState<UserData | null>(null);


  useEffect(()=>{
    fetchUserData();
  },[]);

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

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        setUserData({ email: data.email, username: data.username });
      } else {
        router.push("/auth/login");
        
      }
    } catch (error) {
      console.log(error);

      router.push("/auth/login");
      
    } finally {
      setLoading(false);
    }
  };

  if (loading && !userData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return <div>
    <div>
        <h1>Name:{userData?.username}</h1>
        <h1>Email:{userData?.email}</h1>
    </div>
  </div>;
};

export default Dashboard;
