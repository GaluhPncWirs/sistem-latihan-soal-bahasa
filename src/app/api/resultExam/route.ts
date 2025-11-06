import { supabase } from "@/lib/supabase/data";
import { jwtDecode } from "jwt-decode";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const idExam = req.nextUrl.searchParams.get("id");
  const token: any = req.cookies.get("token")?.value;
  const decodedTokenIdStudent: any = jwtDecode(token);

  const { data: dataResultExam, error: errResultExam } = await supabase
    .from("history-exam-student")
    .select("*, exams(nama_ujian,tipeUjian,questions_exam)")
    .eq("exam_id", Number(idExam))
    .eq("student_id", decodedTokenIdStudent.idStudent)
    .single();

  if (errResultExam) {
    return NextResponse.json({
      status: 401,
      success: false,
      message: "Data Gagal di Ambil",
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
