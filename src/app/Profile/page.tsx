"use client";
import Image from "next/image";
import Link from "next/link";
import { useGetDataStudent } from "../hooks/getDataStudent";
import { useGetIdStudent } from "../hooks/getIdStudent";
import LayoutBodyContent from "@/layout/bodyContent";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/data";

export default function Profil() {
  const id = useGetIdStudent();
  const dataStudent = useGetDataStudent(id);
  const options: any = { day: "numeric", month: "long", year: "numeric" };
  const formatedDate = new Date(dataStudent?.created_at).toLocaleDateString(
    "id-ID",
    options
  );
  const optionsTime: any = {
    day: "numeric",
    month: "long",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Jakarta",
  };
  const [historyStudent, setHistoryStudent] = useState([]);

  useEffect(() => {
    async function getHistoryStudent() {
      const { data, error }: any = await supabase
        .from("history-exam-student")
        .select(
          "created_at, student_id, exams (nama_ujian,status_pengerjaan_siswa)"
        );
      setHistoryStudent(data);
      if (error) {
        console.log("gagal di tampilkan");
      }
    }

    getHistoryStudent();
  }, []);

  return (
    <LayoutBodyContent>
      <div className="pt-16 flex gap-14">
        <div className="bg-[#71C9CE] bg-gradient-to-t to-[#08D9D6] px-7 pt-10 basis-1/4 pb-5 shadow-lg">
          {/* <Image src="" alt="Profile User" width={300} height={300} /> */}
          <h1 className="text-center my-5">ini buat gambar</h1>
          <ul className="my-7 flex flex-col justify-center gap-3">
            <li>Nama {dataStudent?.fullName}</li>
            <li>Kelas {dataStudent?.classes}</li>
            <li>Email {dataStudent?.email}</li>
            <li>Peran {dataStudent?.role}</li>
            <li>Tgl Bergabung {formatedDate}</li>
            <li>Status Akun Aktif</li>
          </ul>
          <Button className="px-5 cursor-pointer">Edit Profile</Button>
        </div>
        <div className="mt-16 basis-2/3">
          <div className="bg-[#71C9CE] rounded-lg p-7">
            <h1 className="mb-10 text-center text-2xl font-semibold">
              Riwayat Ujian
            </h1>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>No</TableHead>
                  <TableHead>Nama Ujian</TableHead>
                  <TableHead>Tanggal</TableHead>
                  <TableHead>Nilai</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {historyStudent.map((item: any, i: number) => (
                  <TableRow key={i}>
                    <TableCell>{i + 1}</TableCell>
                    <TableCell>{item.exams?.nama_ujian}</TableCell>
                    <TableCell>
                      {new Date(item.created_at).toLocaleDateString(
                        "id-ID",
                        optionsTime
                      )}
                    </TableCell>
                    <TableCell>
                      {item.exams?.status_pengerjaan_siswa[0]?.hasil_ujian}
                    </TableCell>
                    <TableCell>
                      {item.exams?.status_pengerjaan_siswa[0]?.status_exam ===
                      true
                        ? "Selesai"
                        : "Belum Selesai"}
                    </TableCell>
                  </TableRow>
                ))}

                {/* {historyStudent
                  .flatMap((item: any) =>
                    item.exams.map((item: any) => ({
                      nama_ujian: item.nama_ujian,
                      created_at: item.created_at,
                      hasil_ujian: item.status_pengerjaan_siswa?.hasil_ujian,
                      status_exam: item.status_pengerjaan_siswa?.status_exam,
                    }))
                  )
                  .map((nilai: any, i: number) => (
                    <TableRow key={i}>
                      <TableCell>{i + 1}</TableCell>
                      <TableCell>{nilai.nama_ujian}</TableCell>
                      <TableCell>{nilai.created_at}</TableCell>
                      <TableCell>{nilai.hasil_ujian}</TableCell>
                      <TableCell>
                        {nilai.status_exam === true
                          ? "Selesai"
                          : "Belum Selesai"}
                      </TableCell>
                    </TableRow>
                  ))} */}
                {/* {historyStudent
                  .flatMap((item: any) => item.exams)
                  .flatMap((data: any) => data.status_pengerjaan_siswa)
                  .map((nilai: any, i: number) => (
                    <TableRow key={i}>
                      <TableCell>{i + 1}</TableCell>
                      <TableCell>sad</TableCell>
                      <TableCell>sekarang</TableCell>
                      <TableCell>{nilai.hasil_ujian}</TableCell>
                      <TableCell>
                        {nilai.status_exam === true
                          ? "Selesai"
                          : "Belum Selesai"}
                      </TableCell>
                    </TableRow>
                  ))} */}
                {/* {historyStudent.flatMap((data: any, i: any) => (
                  <TableRow key={i}>
                    <TableCell>1</TableCell>
                    <TableCell>mtk</TableCell>
                    <TableCell>{data.created_at}</TableCell>
                    <TableCell>40</TableCell>
                    <TableCell>selesai</TableCell>
                  </TableRow>
                ))} */}
              </TableBody>
            </Table>
          </div>
          <Button className="mt-10 px-5 cursor-pointer">Logout</Button>
        </div>
      </div>
    </LayoutBodyContent>
  );
}

// <div className="w-full mx-auto flex justify-center items-center pt-32 bg-[#71C9CE] bg-gradient-to-t to-[#A6E3E9]">
//   {!dataStudent ? (
//     <div className="w-1/2 bg-slate-400 rounded-lg h-80 p-5 animate-pulse">
//       <h1 className="w-full bg-slate-300 h-8 rounded-md"></h1>
//       <div className="flex bg-slate-300 rounded-md mt-3 h-24 px-3 justify-around items-center">
//         <div className="w-1/4 bg-slate-200 h-16 rounded-md flex justify-center items-center">
//           <div className="w-3/4 bg-slate-300 h-12 rounded-md"></div>
//         </div>
//         <ul className="w-2/3 bg-slate-200 h-16 rounded-md flex flex-col justify-center gap-1 p-2">
//           <li className="w-full bg-slate-300 h-4 rounded-md"></li>
//           <li className="w-full bg-slate-300 h-4 rounded-md"></li>
//           <li className="w-full bg-slate-300 h-4 rounded-md"></li>
//         </ul>
//       </div>
//       <div className="w-full bg-slate-200 h-24 rounded-md mt-3 flex flex-col justify-center gap-1 p-3">
//         <div className="w-full bg-slate-300 h-4 rounded-md"></div>
//         <div className="w-full bg-slate-300 h-4 rounded-md"></div>
//         <div className="w-full bg-slate-300 h-4 rounded-md"></div>
//         <div className="w-full bg-slate-300 h-4 rounded-md"></div>
//       </div>
//       <div className="w-1/4 bg-slate-300 h-5 mt-4 rounded-md"></div>
//     </div>
//   ) : (
//     <div className="w-1/2 bg-[#3282B8] pb-5 rounded-lg">
//       <h1 className="font-semibold text-xl text-center my-3">
//         Profile Kamu
//       </h1>
//       <div className="flex bg-[#3FC1C9]">
//         <div className="basis-1/4">
//           <Image
//             src="/img/profile/userProfile.png"
//             alt="Profile"
//             width={500}
//             height={500}
//             className="w-full"
//           />
//         </div>
//         <ul className="tracking-wide font-semibold basis-2/3 flex flex-col justify-center pl-7">
//           <li>
//             id :{" "}
//             <span className="font-bold">{dataStudent.idStudent}</span>
//           </li>
//           <li>
//             Nama :{" "}
//             <span className="font-bold">{dataStudent.fullName}</span>
//           </li>
//           <li>
//             Kelas :{" "}
//             <span className="font-bold">{dataStudent.classes}</span>
//           </li>
//         </ul>
//       </div>
//       <div className="overflow-auto p-5 mb-5">
//         <h1>
//           Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit
//           beatae error quisquam temporibus itaque illum quibusdam
//           consequatur sapiente quia praesentium expedita dolore delectus
//           accusamus, quod aperiam reprehenderit fugit quo quidem?
//         </h1>
//       </div>
//       <Link
//         className="bg-[#71C9CE] px-10 py-1.5 rounded-md ml-5 text-lg font-bold hover:bg-[#A6E3E9]"
//         href="/Student"
//       >
//         Kembali
//       </Link>
//     </div>
//   )}
// </div>
