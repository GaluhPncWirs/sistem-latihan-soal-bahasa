import { supabase } from "@/lib/supabase/data";
import { jwtDecode } from "jwt-decode";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const idExam = req.nextUrl.searchParams.get("id");
  const tokenJWTFromCokies: any = req.cookies.get("tokenLogin")?.value;
  const tokenFromGoogleCookies: any = req.cookies.get(
    "next-auth.session-token",
  )?.value;

  let idStudent: string | null = null;
  if (tokenFromGoogleCookies) {
    const tokenFromGoogle: any = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    });
    idStudent = tokenFromGoogle.idStudent;
  }

  if (tokenJWTFromCokies) {
    const decodedTokenIdStudent: any = jwtDecode(tokenJWTFromCokies);
    idStudent = decodedTokenIdStudent.idStudent;
  }

  const { data: dataResultExam, error: errResultExam } = await supabase
    .from("history-exam-student")
    .select("*, exams(nama_ujian,tipeUjian,questions_exam)")
    .eq("exam_id", Number(idExam))
    .eq("student_id", idStudent)
    .single();

  if (errResultExam) {
    return NextResponse.json({
      status: 401,
      success: false,
      message: "Data Gagal di Ambil",
      dataResultExams: [],
    });
  } else {
    return NextResponse.json({
      status: 200,
      success: true,
      message: "Data Berhasil di Ambil",
      dataResultExams: dataResultExam,
    });
  }
}
