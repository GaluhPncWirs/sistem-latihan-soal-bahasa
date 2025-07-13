import { supabase } from "@/lib/supabase/data";
import { useEffect, useState } from "react";

export function useGetDataStudent(idStudent:string) {
  const [student, setStudent] = useState<any>(null);
  useEffect(() => {
    if(!idStudent) return;
    async function dataStudent(){
      const {data, error} = await supabase.from("data-account-student").select("*").eq("idStudent", idStudent).single()
      setStudent(data)
      if(error){
          console.log("error")
      }else{
        setStudent(data)
      }
    }
    dataStudent()
  },[idStudent])
  return student
}