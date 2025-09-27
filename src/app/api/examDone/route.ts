import { supabase } from "@/lib/supabase/data";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const request = await req.json();

  const { error: insertErr } = await supabase
    .from("history-exam-student")
    .insert(request);

  if (insertErr) {
    return NextResponse.json({
      status: 401,
      success: false,
      message: "Gagal menyimpan data",
    });
  } else {
    const res = NextResponse.json({
      status: 200,
      success: true,
      message: "Ujian Telah Selesai",
    });
    res.cookies.delete("startExam");
    return res;
  }
}
