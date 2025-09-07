import { NextRequest, NextResponse } from "next/server";
import { supabase } from "./lib/supabase/data";

export async function middleware(req: NextRequest) {
  const role = req.cookies.get("role")?.value;
  async function isDoneExams(idExam: number, idStudent: string) {
    const { data: statExam } = await supabase
      .from("history-exam-student")
      .select("status_exam,student_id")
      .eq("exam_id", idExam)
      .eq("student_id", idStudent)
      .single();
    // const { data: dataExam }: any = await supabase
    //   .from("managed_exams")
    //   .select("idExams,kelas")
    //   .eq("idExams", idExam);

    // const findId = dataExam?.reduce((acc: any, cur: any) => {
    //   const findClass = acc.find((f: any) => f.idExams === cur.idExams);
    //   if (!findClass) {
    //     acc.push({
    //       kelas: cur.kelas,
    //       idExam: [cur.idExams],
    //     });
    //   } else {
    //     findClass.idExam.push(cur.idExam);
    //   }
    //   return acc;
    // }, []);

    // return {
    //   statusExam: statExam,
    //   idExam: findId,
    // };
    return statExam;
  }

  if (req.nextUrl.pathname.startsWith("/Student/Exams")) {
    const examId = req.nextUrl.searchParams.get("idExams");
    const idStudent = req.nextUrl.searchParams.get("idStudent");
    if (!examId && !idStudent) {
      return NextResponse.redirect(new URL("/Student/Dashboard", req.url));
    }
    const isDone = await isDoneExams(Number(examId), idStudent!);
    console.log(isDone);

    // hasilnya seperti ini
    // {
    //   statusExam: { status_exam: true, student_id: 'STD-NTSWwPX' },
    //   idExam: [ { kelas: '3A', idExam: [ 12 ] }, { kelas: '1A', idExam: [ 12 ] } ]
    // }

    // if (isDone === null) {
    //   return NextResponse.next();
    // } else {
    //   if (isDone.statusExam.status_exam === true && isDone.statusExam.student_id === idStudent) {
    //     return NextResponse.redirect(new URL("/Student/Dashboard", req.url));
    //   } else {
    //     return NextResponse.next();
    //   }
    // }
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
