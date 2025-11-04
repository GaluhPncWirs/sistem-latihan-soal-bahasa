import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(req: NextRequest) {
  const token: any = req.nextUrl.searchParams.get("token");
  const secret = process.env.JWT_SECRET || "mySecretKey123";
  try {
    const verifyToken = jwt.verify(token, secret);
    return NextResponse.json({
      status: true,
      message: "Token Valid",
      data: verifyToken,
    });
  } catch (error) {
    return NextResponse.json({ status: false, message: "Token Tidak Valid" });
  }
}
