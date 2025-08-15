"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext"; // Assuming you have an AuthContext

export default function RedirectUser() {
  const router = useRouter();
  const { user, loading } = useAuth(); // Assuming useAuth provides the user object and a loading state

  useEffect(() => {
    // Wait until the user data is no longer loading
    if (loading) {
      return;
    }

    // If a user is logged in
    if (user) {
      if (user.role === "admin") {
        // Redirect admin users to the dashboard
        router.push("/admin");
      } else {
        // Keep ordinary users on the landing page or redirect them elsewhere
        router.push("/"); // Or router.push("/user/profile")
      }
    } else {
      // If there's no user, redirect to the login page
      router.push("/login");
    }
  }, [user, loading, router]);

  // You can return a loading spinner while the check is happening
  return <div>Loading...</div>;
}