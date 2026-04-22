import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { useRandomId } from "@/app/hooks/getRandomId";
import { supabase } from "@/lib/supabase/data";

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
      if (account?.provider === "google" && user) {
        // 1. Cek apa user sudah ada di database
        const { data: existingUser, error } = await supabase
          .from("account-student")
          .select("email, idStudent, role, typeAccount, classes,nis,noTlp")
          .eq("email", user.email)
          .single();

        if (existingUser) {
          // 2. Jika user SUDAH ADA, ambil id dan role dari database
          token.idStudent = existingUser.idStudent;
          token.role = existingUser.role;
          token.typeAccount = existingUser.typeAccount;
          token.classes = existingUser.classes;
          token.nis = existingUser.nis;
          token.noTlp = existingUser.noTlp;
        } else {
          // 3. Jika user BELUM ADA, buat data baru
          const newId = useRandomId(7, "STD");
          const dataUser = {
            fullName: user.name,
            email: user.email,
            profilImage: user.image,
            role: "pelajar",
            idStudent: newId,
            typeAccount: "google",
            classes: "belum diisi",
          };

          const { error: insertError } = await supabase
            .from("account-student")
            .insert(dataUser);

          if (!insertError) {
            token.idStudent = dataUser.idStudent;
            token.role = dataUser.role;
            token.typeAccount = dataUser.typeAccount;
            console.log("User baru berhasil didaftarkan");
          }
        }
      }

      return token;
    },

    async session({ session, token }: any) {
      if (session.user) {
        session.user.fullname = token.fullname;
        session.user.email = token.email;
        session.user.profileImage = token.profileImage;
        session.user.role = token.role;
        session.user.idStudent = token.idStudent;
        session.user.typeAccount = token.typeAccount;
        session.user.classes = token.classes;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
