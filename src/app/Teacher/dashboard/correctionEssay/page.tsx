"use client";
import CorrectionEssayComponent from "@/components/correctionEssayComp/content";
import { Suspense } from "react";

export default function CorrectionEssay() {
  return (
    <Suspense
      fallback={<h1 className="text-3xl font-semibold">Loading Exam...</h1>}
    >
      <CorrectionEssayComponent />
    </Suspense>
  );
}
