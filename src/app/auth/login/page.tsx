"use client";
import { LoginForm } from "@/components/LoginForm";
import Navbar from "@/components/Navbar";

export default function Login() {
  return (
    <div>
      <Navbar />

      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <LoginForm />
      </div>
    </div>
  );
}
