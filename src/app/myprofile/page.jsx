// app/myprofile/page.js
"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";

export default function MyprofilePage() {
  const { data: session } = useSession();
    const handleSignInClick = () => {
      signIn("google");
    };
  

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Please Login</h1>
          <button  onClick={handleSignInClick}  className="btn btn-primary">
            Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <ProtectedRoute>
      <div className="card w-96 bg-base-100 card-sm shadow-sm">
        <div className="card-body">
          {session.user?.image && (
            <img
              src={session.user.image}
              alt="Profile"
              className="w-20 h-20 rounded-full"
            />
          )}
          <h1>Name: {session.user?.name || "Not provided"}</h1>
          <p>Email: {session.user?.email}</p>
        </div>
      </div>
    </ProtectedRoute>
  );
}
