import  NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";


export default NextAuth ({
    session: {
      strategy: "jwt",
    },
    providers : [
       CredentialsProvider({
            id : "credentials",
            name: "credentials",
            credentials : {
              username : {type : "text"},
              email : {type : "email"},
              password : {type : "password"}
            },
            authorize: async (credentials) => {
              const {userName , email, password } = credentials;
              if(email == "ahmedrashad13281@gmail.com" && password == "123456") {
                return credentials
              }else{
                throw new Error("Credentials Error")
              }
            },
        }),

      GitHubProvider ({
            clientId : process.env.GITHUB_ID,
            clientSecret : process.env.GITHUB_SECERT,
            // authorization : {params : {redirect_uri : "http://localhost:3000" , scope : "user"}}
        })
    ],
    callbacks: {
      async redirect ({url , baseUrl}) {
        return url
      },
      async signIn ({user}) {
        return true
      }

    },

    secret : "test",

    jwt : {
      secret : "test",
    },

    // pages : {
    //   signIn : '/',
    //   signOut : "/"
    // }
})

