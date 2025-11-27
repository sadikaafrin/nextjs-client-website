// components/ProtectedRoute.js
"use client";

import { useSession, signIn } from "next-auth/react";

export default function ProtectedRoute({ children }) {
  const { data: session, status } = useSession();

  const handleLoginClick = () => {
    signIn("google");
  };

  const handleRegisterClick = () => {
    console.log("Register button clicked");
    signIn("google");
  };

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="loading loading-spinner loading-lg"></div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-base-200">
        <div className="card bg-base-100 shadow-xl w-96">
          <div className="card-body text-center">
            <h1 className="card-title text-2xl justify-center mb-4">Login Required</h1>
            <p className="text-gray-600 mb-6">Please log in to access this page.</p>
            
            <div className="flex flex-col gap-3">
              <button 
                onClick={handleLoginClick}
                className="btn btn-primary w-full"
              >
                Sign In with Google
              </button>
              
              <button 
                onClick={handleRegisterClick}
                className="btn btn-outline w-full"
              >
                Register with Google
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return children;
}