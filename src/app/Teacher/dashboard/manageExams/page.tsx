"use client";
import ManageExamComponent from "@/components/ManageExamComp/content";
import { Suspense } from "react";

export default function ViewQuestions() {
  return (
    <Suspense
      fallback={<h1 className="text-3xl font-semibold">Loading Exam...</h1>}
    >
      <ManageExamComponent />
    </Suspense>
  );
}
