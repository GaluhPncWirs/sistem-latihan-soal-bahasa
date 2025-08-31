import next from "next";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  (await cookies()).delete("role");

  return NextResponse.json({ status: 200, message: "Logout Telah Berhasil" });
}
