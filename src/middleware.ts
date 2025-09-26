import { NextRequest, NextResponse } from "next/server";
import { supabase } from "./lib/supabase/data";
import { useEffect } from "react";

export async function middleware(req: NextRequest) {
  const role = req.cookies.get("role")?.value;
  async function isDoneExams(idExam: number, idStudent: string) {
    const { data: statExam } = await supabase
      .from("history-exam-student")
      .select("status_exam,student_id,hasil_ujian")
      .eq("exam_id", idExam)
      .eq("student_id", idStudent)
      .single();

    return statExam;
  }

  // if (getCookieStartExam === "true") {
  //   window.addEventListener("popstate", () => {
  //     console.log("User tekan tombol back");
  //     // if (!accepted) {
  //     //   alert("Waktu ujian sudah habis, Anda tidak bisa kembali!");
  //     //   // router.replace("/timeout");
  //     // }
  //   });
  // }

  if (req.nextUrl.pathname.startsWith("/Student/Exams")) {
    const getCookieStartExam = req.cookies.get("startExam")?.value;
    const examId = req.nextUrl.searchParams.get("idExams");
    const idStudent = req.nextUrl.searchParams.get("idStudent");

    const pathnameUrl = `/Student/Exams?idExams=${examId}&idStudent=${idStudent}`;

    if (pathnameUrl && getCookieStartExam === "true") {
      console.log("tes aja");
      // return NextResponse.redirect(new URL("/Student/Exams", req.url));
    }

    if (!examId && !idStudent) {
      return NextResponse.redirect(new URL("/Student/Dashboard", req.url));
    }
    const isDone = await isDoneExams(Number(examId), idStudent!);

    if (isDone?.status_exam === undefined && isDone?.student_id === undefined) {
      return NextResponse.next();
    } else {
      if (
        (isDone.status_exam === true && isDone.student_id === idStudent) ||
        (isDone.status_exam === true &&
          isDone.student_id === idStudent &&
          isDone.hasil_ujian === "telat")
      ) {
        return NextResponse.redirect(new URL("/Student/Dashboard", req.url));
      } else {
        return NextResponse.next();
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
