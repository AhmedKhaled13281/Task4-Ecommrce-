import  NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import { signIn } from "next-auth/react";

export default NextAuth ({
    session: {
      strategy: "jwt",
    },
    providers : [
       CredentialsProvider({
            name: "credentials",
            authorize: async (credentials) => {
              const {userName , email, password } = credentials;
              if(email && password && userName) {
                return {userName , email}
              }else{
                return null;
              }
            },
        }),

      GitHubProvider ({
            name : "github",
            clientId : process.env.GITHUB_ID,
            clientSecret : process.env.GITHUB_SECRET
        })
    ],
    callbacks: {
      async jwt({ token, user }) {
        // Persist the OAuth access_token and or the user id to the token right after signin
        if (user) {
          token.accessToken = user.access_token
          token.id = user?.id
        }
        return token
      },
      async session({ session, token, userName }) {
        console.log(userName)
        // Send properties to the client, like an access_token and user id from a provider.
        session.accessToken = token.accessToken
        session.user.id = token.id
        console.log(session)
        return session
      }
    },
    // secret : "test",
    jwt : {
      secret : "test",
      encryption : true,
    }

    // pages : {
    //   signIn : '/auth/LoginModal'
    // }
})

