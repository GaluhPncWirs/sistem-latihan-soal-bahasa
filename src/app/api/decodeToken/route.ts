import { NextRequest, NextResponse } from "next/server";
import { jwtDecode } from "jwt-decode";

export async function GET(req: NextRequest) {
  const token: any = req.nextUrl.searchParams.get("token");
  try {
    const verifyToken = jwtDecode(token);
    return NextResponse.json({
      status: true,
      message: "Berhasi Decode Token",
      data: verifyToken,
      expired: verifyToken.exp,
    });
  } catch (error) {
    return NextResponse.json({
      status: false,
      message: "Token Gagal Di Decode",
    });
  }
}
