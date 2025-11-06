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
      return NextResponse.json({
        success: false,
        status: 401,
        message: "Email dan Password Salah Input Kembali",
      });
    }
    const token = jwt.sign(
      {
        idStudent: dataStudent.idStudent,
        email: valueEmail,
        name: dataStudent.fullName,
      },
      process.env.JWT_SECRET || "mySecretKey123",
      { expiresIn: "3h" }
    );

    const res = NextResponse.json({
      success: true,
      tipe: valueTypeAccount,
      message: "Masuk Akun Berhasil",
    });
    res.cookies.set("role", "pelajar", {
      path: "/",
      httpOnly: true,
      sameSite: "lax",
    });
    res.cookies.set("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/",
    });
    return res;
  } else if (valueTypeAccount === "guru") {
    const { data: dataTeacher, error }: any = await supabase
      .from("account_teacher")
      .select("id_teacher, fullName")
      .eq("email", valueEmail)
      .eq("password", valuePassword)
      .single();
    if (error) {
      return NextResponse.json({
        success: false,
        status: 401,
        message: "Email dan Password Salah Input Kembali",
      });
    }
    const token = jwt.sign(
      {
        idTeacher: dataTeacher.id_teacher,
        email: valueEmail,
        name: dataTeacher.fullName,
      },
      process.env.JWT_SECRET || "mySecretKey123",
      {
        expiresIn: "3h",
      }
    );
    const res = NextResponse.json({
      success: true,
      tipe: valueTypeAccount,
      message: "Masuk Akun Berhasil",
    });
    res.cookies.set("role", "pengajar", {
      path: "/",
      httpOnly: true,
      sameSite: "lax",
    });
    res.cookies.set("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/",
    });
    return res;
  }
  return NextResponse.json({
    success: false,
    status: 401,
    message: "Gagal Fetch Api Autentikasi",
  });
}
