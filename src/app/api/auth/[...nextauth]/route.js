// src/app/api/auth/[...nextauth]/route.js
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

// Use fallback secret
const nextAuthSecret = process.env.NEXTAUTH_SECRET || "temp-secret-32-chars-long-123456789012";

const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  secret: nextAuthSecret,
  callbacks: {
    async signIn({ user, account }) {
      console.log("✅ SignIn callback for:", user?.email);
      
      try {
        // Use relative URL for same-app API call
        const baseUrl = process.env.NEXTAUTH_URL || "https://nextjs-client-website.vercel.app";
        const response = await fetch(`${baseUrl}/api/user`, {
          method: "POST",
          headers: { 
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: user.email,
            name: user.name,
            image: user.image,
            provider: account.provider,
          }),
        });

        if (!response.ok) {
          console.error(`API error: ${response.status}`);
        } else {
          const result = await response.json();
          console.log("User saved:", result);
        }
      } catch (err) {
        console.error("Error saving user:", err.message);
        // Don't block signin on errors
      }

      return true;
    },

    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token.sub;
      }
      return session;
    }
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
  debug: true,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };