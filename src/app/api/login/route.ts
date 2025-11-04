import { supabase } from "@/lib/supabase/data";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  const { valueEmail, valuePassword, valueTypeAccount } = await req.json();

  if (valueTypeAccount === "siswa") {
    const { data: dataStudent, error }: any = await supabase
      .from("account-student")
      .select("idStudent,fullName")
      .eq("email", valueEmail)
      .eq("password", valuePassword)
      .single();
    if (error) {
      return NextResponse.json({ success: false, status: 401 });
    }
    const token = jwt.sign(
      {
        email: valueEmail,
        name: dataStudent.fullName,
      },
      process.env.JWT_SECRET || "mySecretKey123",
      { expiresIn: "2h" }
    );

    const res = NextResponse.json({
      success: true,
      id: dataStudent.idStudent,
      tipe: valueTypeAccount,
      tokenJWT: token,
    });
    res.cookies.set("role", "pelajar", {
      path: "/",
      httpOnly: true,
      sameSite: "lax",
    });
    return res;
  } else if (valueTypeAccount === "guru") {
    const { data: dataTeacher, error }: any = await supabase
      .from("account_teacher")
      .select("id_teacher")
      .eq("email", valueEmail)
      .eq("password", valuePassword)
      .single();
    if (error) {
      return NextResponse.json({ success: false, status: 401 });
    }
    const res = NextResponse.json({
      success: true,
      id: dataTeacher.id_teacher,
      tipe: valueTypeAccount,
    });
    res.cookies.set("role", "pengajar", {
      path: "/",
      httpOnly: true,
      sameSite: "lax",
    });
    return res;
  }
  return NextResponse.json({ success: false, status: 401 });
}
