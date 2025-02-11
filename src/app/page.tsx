"use client";
import { Navbar } from "@/components/Navbar";
import HomePage from "@/components/HomePage";

export default function Home() {
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div className="mt-16">
        <HomePage />
      </div>
    </div>
  );
}
