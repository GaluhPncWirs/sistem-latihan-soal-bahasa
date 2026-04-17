import { jwtDecode } from "jwt-decode";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const tokenJWTFromCokies = req.cookies.get("tokenLogin")?.value;
  const tokenFromGoogleCookies = req.cookies.get(
    "next-auth.session-token",
  )?.value;
  try {
    if (tokenFromGoogleCookies) {
      const tokenFromGoogle = await getToken({
        req,
        secret: process.env.NEXTAUTH_SECRET,
      });
      return NextResponse.json({
        status: true,
        message: "Berhasil Decode Token",
        data: tokenFromGoogle,
        role: tokenFromGoogle?.role,
        expired: tokenFromGoogle?.exp,
      });
    }

    if (tokenJWTFromCokies) {
      const resultDecodeJWT: any = jwtDecode(tokenJWTFromCokies);
      return NextResponse.json({
        status: true,
        message: "Berhasil Decode Token",
        data: resultDecodeJWT,
        role: resultDecodeJWT.role,
        expired: resultDecodeJWT.exp,
      });
    }
  } catch (err) {
    return NextResponse.json({
      status: false,
      message: "Token Gagal Di Decode",
    });
  }
}
