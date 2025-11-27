import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user, account }) {
      console.log("SignIn callback triggered");
      
      try {
        // Call LOCAL API route (same app)
        const response = await fetch('/api/user', {
          method: "POST",
          headers: { "Content-Type": "application/json" },
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
        console.error("Error saving user:", err);
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
  debug: process.env.NODE_ENV === 'development',
});