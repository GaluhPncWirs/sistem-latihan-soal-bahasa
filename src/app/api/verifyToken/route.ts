import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { getToken } from "next-auth/jwt";

export async function GET(req: NextRequest) {
  const tokenJWTFromCokies: any = req.cookies.get("tokenLogin")?.value;
  const tokenFromGoogleCookies: any = req.cookies.get(
    "next-auth.session-token",
  )?.value;

  try {
    if (tokenFromGoogleCookies) {
      const tokenFromGoogle: any = await getToken({
        req,
        secret: process.env.NEXTAUTH_SECRET,
      });
      if (tokenFromGoogle) {
        return NextResponse.json({
          status: true,
          message: "Token Valid",
          data: tokenFromGoogle,
        });
      }
    }
    if (tokenJWTFromCokies) {
      const secret = process.env.JWT_SECRET || "mySecretKey123";
      const verifyToken = jwt.verify(tokenJWTFromCokies, secret);
      return NextResponse.json({
        status: true,
        message: "Token Valid",
        data: verifyToken,
      });
    }
  } catch (error) {
    return NextResponse.json({ status: false, message: "Token Tidak Valid" });
  }
}
