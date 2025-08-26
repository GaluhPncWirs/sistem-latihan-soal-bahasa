import { supabase } from "@/lib/supabase/data";
import { useEffect, useState } from "react";

export function useGetDataTeacher(idTeacher: string) {
  const [dataTeacher, setDataTeacher] = useState<any>([]);
  useEffect(() => {
    if (!idTeacher) return;
    async function dataProfileTeacher() {
      const { data, error }: any = await supabase
        .from("account_teacher")
        .select("*")
        .eq("id_teacher", idTeacher)
        .single();

      if (error) {
        console.log("data error ditampilkan");
      }
      setDataTeacher(data);
    }
    dataProfileTeacher();
  }, [idTeacher]);

  return dataTeacher;
}
