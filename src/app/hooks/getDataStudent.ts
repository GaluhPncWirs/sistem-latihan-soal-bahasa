import { supabase } from "@/lib/supabase/data";
import { useEffect, useState } from "react";

export function useGetDataStudent(idStudent: string) {
  const [dataStudent, setDataStudent] = useState<any>([]);

  useEffect(() => {
    if (!idStudent) return;
    async function dataStudent() {
      try {
        const { data, error } = await supabase
          .from("account-student")
          .select("*")
          .eq("idStudent", idStudent)
          .single();
        if (error) {
          setDataStudent([]);
          console.log("Data gagal diambil");
        } else {
          setDataStudent(data);
        }
      } catch {
        setDataStudent([]);
        console.log("Data gagal diambil, error pada database");
      }
    }
    dataStudent();
  }, [idStudent]);
  return dataStudent;
}
