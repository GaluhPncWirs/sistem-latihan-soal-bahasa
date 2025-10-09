import { supabase } from "@/lib/supabase/data";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const searchParamIdExam = req.nextUrl.searchParams.get("id");
  const searchParamIdStudent = req.nextUrl.searchParams.get("idStudent");

  const { data: dataResultExam, error: errResultExam } = await supabase
    .from("history-exam-student")
    .select("*, exams(nama_ujian,tipeUjian,questions_exam)")
    .eq("exam_id", Number(searchParamIdExam))
    .eq("student_id", searchParamIdStudent)
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
