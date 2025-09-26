import { NextRequest, NextResponse } from "next/server";
import { supabase } from "./lib/supabase/data";
import { useEffect } from "react";

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
    const pathnameUrl = `/Student/Exams?idExams=${examId}&idStudent=${idStudent}`;

    if (
      isStartExam === "true" &&
      !req.nextUrl.pathname.startsWith("/Student/Exams")
    ) {
      return NextResponse.redirect(new URL(pathnameUrl, req.url));
    }

    if (!examId && !idStudent) {
      return NextResponse.redirect(new URL("/Student/Dashboard", req.url));
    }

    if (isDone?.status_exam === undefined && isDone?.student_id === undefined) {
      const response = NextResponse.next();
      response.cookies.set({
        name: "startExam",
        value: "true",
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
        response.cookies.set({
          name: "startExam",
          value: "true",
          path: "/",
          httpOnly: true,
          sameSite: "strict",
        });
        return response;
      }
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
