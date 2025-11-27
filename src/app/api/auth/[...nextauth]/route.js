import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
callbacks: {
    async signIn({ user, account }) {
      console.log("SignIn callback triggered");
      
      try {
        const response = await fetch("https://my-nextjs-server-sigma.vercel.app/api/user", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: user.email,
            name: user.name,
            image: user.image,
            provider: account.provider,
          }),
        });

        const result = await response.json();
        console.log("User saved:", result);

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
    debug: true,
};



const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };