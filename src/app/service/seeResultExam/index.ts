import { supabase } from "@/lib/supabase/data";

export async function seeResultExams(id:number) {
    const {data, error} = await supabase.from("for-result-exams").select("*").eq("id", id)
    if(error){
        console.log("error")
    }else{
        return data
    }
}