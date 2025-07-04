"use client";
import { seeResultExams } from "@/app/service/seeResultExam";
import NavigasiBar from "@/component/navigasiBar/navbar";
import { supabase } from "@/lib/supabase/data";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { useEffect, useState } from "react";

export default function ResultExam() {
  const [getData, setGetData] = useState<any>([]);
  const paramId = useSearchParams();
  useEffect(() => {
    async function get() {
      const dataUserById = await seeResultExams(Number(paramId.get("id")));
      setGetData(dataUserById);
    }
    get();
  }, []);

  // console.log(getData[0]);

  // useEffect(() => {
  //   async function handleView() {
  //     const { data, error } = await supabase.from("result-exam-PG").select("*");
  //     if (error) {
  //       console.log("data gagal ditampilkan:", error.message);
  //     } else {
  //       console.log("Data berhasil ditampilkan:", data);
  //     }
  //   }
  //   handleView();
  // }, []);

  return (
    <div>
      <NavigasiBar />
      <div>
        <h1>Lihat Hasil Ujian</h1>
      </div>
    </div>
  );
}
