import { supabase } from "@/lib/supabase/data";
import { useEffect, useState } from "react";

export function getDataStudent(idStudent:string) {
  const [student, setStudent] = useState({});
  useEffect(() => {
    async function dataStudent(){
      const {data, error} = await supabase.from("data-account-student").select("*").eq("idStudent", idStudent).single()
      setStudent(data)
      if(error){
          console.log("error")
      }else{
        setStudent(data)
      }
    }
    if(idStudent){
      dataStudent()
    }
  },[idStudent])
  return student
}