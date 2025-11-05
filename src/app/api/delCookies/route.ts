import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function DELETE() {
  const cookieStore = await cookies();
  cookieStore.delete("role");
  cookieStore.delete("token");

  const res = NextResponse.json({
    status: 200,
    message: "Logout Telah Berhasil",
  });

  res.cookies.set("role", "", { maxAge: 0, path: "/" });
  res.cookies.set("token", "", { maxAge: 0, path: "/" });

  return res;
}
