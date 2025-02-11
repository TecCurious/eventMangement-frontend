"use client";
import Link from "next/link";
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
