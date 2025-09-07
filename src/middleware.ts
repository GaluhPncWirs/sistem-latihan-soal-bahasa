import { NextRequest, NextResponse } from "next/server";
import { supabase } from "./lib/supabase/data";
import { useGetIdStudent } from "./app/hooks/getIdStudent";

export async function middleware(req: NextRequest) {
  const role = req.cookies.get("role")?.value;
  async function isDoneExams(idExam: number, idStudent: string) {
    const { data } = await supabase
      .from("history-exam-student")
      .select("status_exam,student_id")
      .eq("exam_id", idExam)
      .eq("student_id", idStudent)
      .single();
    return data;
  }

  if (req.nextUrl.pathname.startsWith("/Student/Exams")) {
    const examId = req.nextUrl.searchParams.get("id");
    const studentId = req.nextUrl.searchParams.get("idStudent");
    if (!examId) {
      return NextResponse.redirect(new URL("/Student/Dashboard", req.url));
    }
    const isDone = await isDoneExams(Number(examId), studentId!);
    if (isDone === null) {
      return NextResponse.redirect(new URL("/Student/Dashboard", req.url));
    } else if (isDone?.status_exam === true || isDone?.student_id === null) {
      return NextResponse.redirect(new URL("/Student/Dashboard", req.url));
    } else {
      return NextResponse.next();
    }
  }

  if (role !== "pengajar") {
    return NextResponse.redirect(new URL("/", req.url));
  } else {
    return NextResponse.next();
  }
}

export const config = {
  matcher: ["/Teacher/:path*", "/Student/Exams/:path*"],
};
