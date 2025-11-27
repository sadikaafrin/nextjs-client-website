import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user, account }) {
      console.log("SignIn callback - Production");
      
      try {
        const response = await fetch(`${process.env.BACKEND_URL}/api/user`, {
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
          console.error(`Backend error: ${response.status}`);
          // Still allow signin even if backend fails
          return true;
        }

        const result = await response.json();
        console.log("User saved in production:", result.user?.email);

      } catch (err) {
        console.error("Production - Error saving user:", err.message);
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
  debug: process.env.NODE_ENV === 'development',
};

export default NextAuth(authOptions);