import { NextRequest, NextResponse } from "next/server";
import { supabase } from "./lib/supabase/data";

export async function middleware(req: NextRequest) {
  const role = req.cookies.get("role")?.value;
  const isStartExam = req.cookies.get("startExam")?.value;

  async function isDoneExams(idExam: number, idStudent: string) {
    const { data: statExam } = await supabase
      .from("history-exam-student")
      .select("status_exam,student_id,hasil_ujian")
      .eq("exam_id", idExam)
      .eq("student_id", idStudent)
      .single();

    return statExam;
  }

  if (req.nextUrl.pathname.startsWith("/Student/Exams")) {
    const examId = req.nextUrl.searchParams.get("idExams");
    const idStudent = req.nextUrl.searchParams.get("idStudent");
    const isDone = await isDoneExams(Number(examId), idStudent!);

    if (isStartExam === "true" && req.nextUrl.pathname !== "/Student/Exams") {
      return NextResponse.redirect(new URL("/Student/Dashboard", req.url));
    }

    if (!examId && !idStudent) {
      return NextResponse.redirect(new URL("/Student/Dashboard", req.url));
    }

    if (isDone?.status_exam === undefined && isDone?.student_id === undefined) {
      const response = NextResponse.next();
      response.cookies.set("startExam", "true", {
        path: "/",
        httpOnly: true,
        sameSite: "strict",
      });
      return response;
    } else {
      if (
        (isDone.status_exam === true && isDone.student_id === idStudent) ||
        (isDone.status_exam === true &&
          isDone.student_id === idStudent &&
          isDone.hasil_ujian === "telat")
      ) {
        return NextResponse.redirect(new URL("/Student/Dashboard", req.url));
      } else {
        const response = NextResponse.next();
        response.cookies.set("startExam", "true", {
          path: "/",
          httpOnly: true,
          sameSite: "strict",
        });
        return response;
      }
    }
  }

  if (req.nextUrl.pathname.startsWith("/Teacher") && role !== "pengajar") {
    return NextResponse.redirect(new URL("/", req.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/Teacher/:path*",
    "/Student/Exams/:path*",
    "/Student/Dashboard/:path*",
    "/api/:path*",
  ],
};
