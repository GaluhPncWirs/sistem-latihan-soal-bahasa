import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { useRandomId } from "@/app/hooks/getRandomId";
import { supabase } from "@/lib/supabase/data";
import jwt from "jsonwebtoken";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      name: "google",
      clientId: process.env.GOOGLE_OAUTH_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET || "",
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (account?.provider === "google") {
        const dataUser = {
          fullName: user.name,
          email: user.email,
          profilImage: user.image,
          role: "pelajar",
          idStudent: useRandomId(7, "STD"),
          typeAccount: "google",
        };
        // harus dari database
        const { data, error }: any = await supabase
          .from("account-student")
          .select("email")
          .eq("email", user.email);
        if (data?.length > 0) {
          console.log("akun email sudah ada");
        } else if (error) {
          console.log("gagal mengambil data");
        } else {
          const { error }: any = await supabase
            .from("account-student")
            .insert(dataUser);
          if (error) {
            console.log("gagal menyimpan data");
          } else {
            ((token.idStudent = dataUser.idStudent),
              (token.role = dataUser.role));
            console.log("berhasil buat akun");
          }
        }
      }
      return token;
    },

    async session({ session, token }: any) {
      session.user.fullname = token.fullname;
      session.user.email = token.email;
      session.user.profileImage = token.profileImage;
      session.user.role = token.role;
      session.user.idStudent = token.idStudent;
      session.user.typeAccount = token.typeAccount;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
