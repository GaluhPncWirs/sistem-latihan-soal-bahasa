import { NextRequest, NextResponse } from "next/server";
import { supabase } from "./lib/supabase/data";

export async function middleware(req: NextRequest) {
  const role = req.cookies.get("role")?.value;
  async function isDoneExams(id: number) {
    const { data, error } = await supabase
      .from("history-exam-student")
      .select("status_exam")
      .eq("exam_id", id)
      .single();
    if (error) {
      console.log("data gagal di load");
    }
    return data;
  }

  if (req.nextUrl.pathname.startsWith("/Student/Exams")) {
    const examId = req.nextUrl.searchParams.get("id");
    if (!examId) {
      return NextResponse.redirect(new URL("/Student/Dashboard", req.url));
    }
    const isDone = await isDoneExams(Number(examId));
    if (isDone?.status_exam === true || isDone === null) {
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
