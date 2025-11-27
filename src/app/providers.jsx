// app/providers.js
"use client";

import { SessionProvider } from "next-auth/react";
import AuthProvider from "@/providers/AuthProvider";
import { Toaster } from "react-hot-toast";

export default function Providers({ children }) {
  return (
    <AuthProvider>
      <SessionProvider>
        {children}
        <Toaster position="top-right" reverseOrder={false} />
      </SessionProvider>
    </AuthProvider>
  );
}