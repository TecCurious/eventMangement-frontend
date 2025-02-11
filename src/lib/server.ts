"use server";
import { cookies } from "next/headers";

export const getCookies = async () => {
  const token = (await cookies()).get("token")?.value; // No need for `await`
  
  if (token) {
    console.log("Token found:", token);

    try {
      const value = JSON.parse(token); // If the token contains JSON data
      return value;
    } catch (error) {
      console.error("Error parsing token:", error);
      return token; // Return as string if it's not JSON
    }
  }

  return null;
};
