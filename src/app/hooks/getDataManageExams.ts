import { supabase } from "@/lib/supabase/data";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export function useManageExamsData(id: string | undefined) {
  const [viewQuestions, setViewQuestions] = useState<any>([]);

  useEffect(() => {
    if (!id) return;
    async function handleViewQuestions() {
      const { data: examsCollections, error: examsError } = await supabase
        .from("exams")
        .select("*")
        .eq("idTeacher", id);
      if (examsError) {
        toast("Gagal ❌", {
          description: "data gagal ditampilkan:",
        });
      }
      setViewQuestions(examsCollections);
    }
    handleViewQuestions();
  }, [id]);

  return viewQuestions;
}
