import { jwtDecode } from "jwt-decode";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const tokenJWTFromCokies: any = req.cookies.get("token")?.value;
  const role = req.cookies.get("role")?.value;
  try {
    const resultDecodeJWT = jwtDecode(tokenJWTFromCokies);
    return NextResponse.json({
      status: true,
      message: "Berhasil Decode Token",
      data: resultDecodeJWT,
      role: role,
      expired: resultDecodeJWT.exp,
    });
  } catch (err) {
    return NextResponse.json({
      status: false,
      message: "Token Gagal Di Decode",
    });
  }
}
