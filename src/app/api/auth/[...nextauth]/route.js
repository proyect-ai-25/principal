import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
//import GitHubProvider from 'next-auth/providers/github';
import config from "../../../../../config";

const handler = NextAuth({
  site: process.env.NEXTAUTH_URL || 'http://localhost:3000',
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    /*GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),*/
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email", placeholder: "tuemail@email.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        //console.log('credentials', credentials)
        const res = await fetch(config.apiUrl + "api/usuario/login", { // URL de tu backend ASP.NET
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: credentials.email,
            password: credentials.password
          }),
        });

        const user = await res.json();
        console.log('user', user)

        if (res.ok && user) {
          return user; // Lo que retorna tu backend
        }
        return null;
      }
    })
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.user = user;
      return token;
    },
    async session({ session, token }) {
      session.user = token.user;
      return session;
    }
  }  
});
export { handler as GET, handler as POST };
