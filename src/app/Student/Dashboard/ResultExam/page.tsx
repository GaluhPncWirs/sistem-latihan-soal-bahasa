"use client";
import ResultExamComponent from "@/components/ResultExamComp/content";
import { Suspense } from "react";

export default function ResultExam() {
  return (
    <Suspense
      fallback={<h1 className="text-3xl font-semibold">Loading Exam...</h1>}
    >
      <ResultExamComponent />
    </Suspense>
  );
}
