import { jwtDecode } from "jwt-decode";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

type ValueTokenJWTFromLoginDefault = {
  idStudent: string;
  email: string;
  name: string;
  role: string;
  iat: number;
  exp: number;
};

export async function GET(req: NextRequest) {
  const tokenJWTFromLoginDefaultCookies = req.cookies.get("tokenLogin")?.value;
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

    if (tokenJWTFromLoginDefaultCookies) {
      const resultDecodeJWT: ValueTokenJWTFromLoginDefault = jwtDecode(
        tokenJWTFromLoginDefaultCookies,
      );
      return NextResponse.json({
        status: true,
        message: "Berhasil Decode Token",
        data: resultDecodeJWT,
        role: resultDecodeJWT.role,
        expired: resultDecodeJWT.exp,
      });
    }

    return NextResponse.json({
      status: false,
      message: "Token tidak ditemukan",
    });
  } catch {
    return NextResponse.json({
      status: false,
      message: "Token Gagal Di Decode",
    });
  }
}
