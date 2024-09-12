"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useGlobalState } from "@/context/globalContext";
import Navbar from "../../../components/navbar";

function HomePage() {
  const router = useRouter();
  const { isUserLogin } = useGlobalState(); // Client-side global state for login status

  useEffect(() => {
    // If the user is not logged in, redirect to the login page
    if (!isUserLogin) {
      router.push("/"); // Redirect to login page if not authenticated
    }
  }, [isUserLogin, router]);

  return (
    <>
      <Navbar />
      <div>HomePage</div>
    </>
  );
}

export default HomePage;
