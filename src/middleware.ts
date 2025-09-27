import { NextRequest, NextResponse } from "next/server";
import { supabase } from "./lib/supabase/data";

export async function middleware(req: NextRequest) {
  const role = req.cookies.get("role")?.value;
  const isStartExam = req.cookies.get("startExam")?.value;

  if (req.nextUrl.pathname.startsWith("/Student/Exams/StartExam")) {
    const examId = req.nextUrl.searchParams.get("idExams");
    const idStudent = req.nextUrl.searchParams.get("idStudent");

    if (!examId || !idStudent) {
      return NextResponse.redirect(new URL("/Student/Dashboard", req.url));
    }

    const { data: isDone } = await supabase
      .from("history-exam-student")
      .select("status_exam,student_id,hasil_ujian")
      .eq("exam_id", examId)
      .eq("student_id", idStudent)
      .single();

    if (isDone?.status_exam === undefined && isDone?.student_id === undefined) {
      const response = NextResponse.next();
      response.cookies.set("startExam", "true", {
        path: "/",
        httpOnly: true,
        sameSite: "strict",
      });
      response.cookies.set("examId", examId!, {
        path: "/",
        httpOnly: true,
        sameSite: "strict",
      });
      response.cookies.set("idStudent", idStudent!, {
        path: "/",
        httpOnly: true,
        sameSite: "strict",
      });
      return response;
    }

    if (
      (isDone?.status_exam === true && isDone?.student_id === idStudent) ||
      (isDone?.status_exam === true &&
        isDone?.student_id === idStudent &&
        isDone?.hasil_ujian === "telat")
    ) {
      return NextResponse.redirect(new URL("/Student/Dashboard", req.url));
    }

    if (isStartExam !== "true") {
      const response = NextResponse.next();
      response.cookies.set("startExam", "true", {
        path: "/",
        httpOnly: true,
        sameSite: "strict",
      });
      return response;
    }

    const expectedUrl = `/Student/Exams/StartExam?idExams=${examId}&idStudent=${idStudent}`;
    const currentUrl = req.nextUrl.pathname + req.nextUrl.search;

    if (isStartExam === "true" && currentUrl !== expectedUrl) {
      return NextResponse.redirect(new URL(expectedUrl, req.url));
    }

    return NextResponse.next();
  }

  if (req.nextUrl.pathname.startsWith("/Teacher") && role !== "pengajar") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (
    isStartExam === "true" &&
    req.nextUrl.pathname.startsWith("/Student") &&
    !req.nextUrl.pathname.startsWith("/Student/Exams/StartExam")
  ) {
    const examId = req.cookies.get("examId")?.value;
    const idStudent = req.cookies.get("idStudent")?.value;

    if (examId && idStudent) {
      return NextResponse.redirect(
        new URL(
          `/Student/Exams/StartExam?idExams=${examId}&idStudent=${idStudent}`,
          req.url
        )
      );
    } else {
      return NextResponse.redirect(new URL("/Student/Dashboard", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/Teacher/:path*", "/Student/:path*", "/api/:path*"],
};
