"use client";
import ExamsComponent from "@/components/ExamComp/content";
import { Suspense } from "react";

export default function Soal() {
  return (
    <Suspense
      fallback={<h1 className="text-3xl font-semibold">Loading Exam...</h1>}
    >
      <ExamsComponent />
    </Suspense>
  );
}
