import { supabase } from "@/lib/supabase/data";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { valueEmail, valuePassword, valueTypeAccount } = await req.json();

  if (valueTypeAccount === "siswa") {
    const { data: dataStudent, error }: any = await supabase
      .from("account-student")
      .select("idStudent")
      .eq("email", valueEmail)
      .eq("password", valuePassword)
      .single();
    if (error) {
      return NextResponse.json({ success: false, status: 401 });
    }
    const res = NextResponse.json({
      success: true,
      id: dataStudent.idStudent,
      tipe: valueTypeAccount,
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
