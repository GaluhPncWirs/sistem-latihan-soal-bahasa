import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXT_AUTH_SECRET,
  providers: [
    GoogleProvider({
      name: "google",
      clientId: process.env.GOOGLE_OAUTH_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET || "",
    }),
  ],
  //   callbacks: {
  //     async jwt({token, user,account}){
  //         if(account?.provider === "google"){
  //             const dataUser = {
  //                 fullname: user.fullname,
  //                 email : user.email,
  //                 image: user.image,
  //                 type: "google"
  //             }
  //             // harus dari firestore
  //             await signInWithGoogle()
  //         }
  //     }
  //   },
};
