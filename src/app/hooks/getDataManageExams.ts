import { supabase } from "@/lib/supabase/data";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export function useManageExamsData() {
  const [viewQuestions, setViewQuestions] = useState<any>([]);

  useEffect(() => {
    async function handleViewQuestions() {
      const { data: examsCollections, error: examsError } = await supabase
        .from("exams")
        .select("*");
      const { data: classCollections, error: classError } = await supabase
        .from("choose_class")
        .select("*");
      if (examsError || classError) {
        toast("Gagal ❌", {
          description: "data gagal ditampilkan:",
        });
      }

      const mergeDatas = examsCollections?.map((item: any) => {
        const chooseClass = classCollections?.find(
          (f: any) => f.exam_id === item.id
        );

        return {
          ...item,
          kelas: chooseClass?.kelas.match(/.{1,2}/g) ?? null,
          status: chooseClass?.status ?? false,
        };
      });
      setViewQuestions(mergeDatas);
    }
    handleViewQuestions();
  }, []);

  return viewQuestions;
}
