"use client";

import { useGetIdTeacher } from "@/app/hooks/getIdTeacher";
import ResultExam from "@/app/Student/Dashboard/ResultExam/page";
import CreateNewQuestions from "@/component/khususGuru/buatSoal/createQuestions";
import ViewQuestions from "@/component/khususGuru/hasilPertanyaan/pertanyaan";
import ManageStudent from "@/component/khususGuru/kelolaSiswa/manageStudent";
import NavigasiBar from "@/component/navigasiBar/navbar";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import LayoutBodyContent from "@/layout/bodyContent";
import { supabase } from "@/lib/supabase/data";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Teacher() {
  const [dashboardButton, setDashboardButton] = useState({
    createQusetions: false,
    viewResult: false,
    manageStudent: false,
  });
  const idTeacher = useGetIdTeacher();
  const [dataManageExams, setDataManageExams] = useState<any>([]);
  const options: any = { day: "numeric", month: "long", year: "numeric" };

  function handleClickItem(event: any) {
    if (event === "viewResult") {
      setDashboardButton({
        createQusetions: false,
        viewResult: true,
        manageStudent: false,
      });
    } else if (event === "manageStudent") {
      setDashboardButton({
        createQusetions: false,
        viewResult: false,
        manageStudent: true,
      });
    } else if (event === "createQusetions") {
      setDashboardButton({
        createQusetions: true,
        viewResult: false,
        manageStudent: false,
      });
    }
  }

  useEffect(() => {
    if (!idTeacher) return;
    async function getDataManageExams() {
      const { data: datasManageExams, error: errorDatasManageExams }: any =
        await supabase
          .from("managed_exams")
          .select("*, account_teacher(fullName), exams(nama_ujian)")
          .eq("id_Teacher", idTeacher);

      const { data: isCompleteExam, error: errorIsCompleteExam }: any =
        await supabase
          .from("history-exam-student")
          .select("exam_id,student_id,kelas,status_exam");
      const { data: lengthStudent, error: errorLengthStudent }: any =
        await supabase.from("account-student").select("classes,idStudent");

      if (errorDatasManageExams || errorIsCompleteExam || errorLengthStudent) {
        console.log("data error ditampilkan");
      } else {
        const completeExams = isCompleteExam.reduce((acc: any, cur: any) => {
          if (!cur.status_exam) return acc;
          const found = acc.find((item: any) => item.kelas === cur.kelas);
          if (!found) {
            acc.push({
              kelas: cur.kelas,
              exam_id: cur.exam_id,
              student_id: [cur.student_id],
            });
          } else {
            found.student_id.push(cur.student_id);
          }
          return acc;
        }, []);

        console.log(completeExams);

        const totalStudent = lengthStudent.reduce((acc: any, cur: any) => {
          const foundClass = acc.find(
            (item: any) => item.classes === cur.classes
          );
          if (!foundClass) {
            acc.push({
              classes: cur.classes,
              idStudent: [cur.idStudent],
            });
          } else {
            foundClass.idStudent.push(cur.idStudent);
          }
          return acc;
        }, []);

        const mergedData = datasManageExams?.map((item: any) => {
          const findsExams = completeExams.find(
            (f: any) => f.kelas === item.kelas && f.exam_id === item.idExams
          );
          const findStudent = totalStudent.find(
            (f: any) => f.classes === item.kelas
          );
          return {
            ...item,
            lengthStudent: findStudent?.idStudent ?? [],
            lengthStudentCompleteExams: findsExams?.student_id ?? [],
          };
        });
        setDataManageExams(mergedData);
      }
    }
    getDataManageExams();
  }, [idTeacher]);

  return (
    <LayoutBodyContent>
      <div className="pt-28 mx-auto max-[640px]:w-11/12 sm:w-10/12 md:w-3/4">
        <h1 className="text-4xl font-bold text-center">Dashboard Pengajar</h1>
        <h1 className="text-2xl font-bold my-5 max-[640px]:text-center">
          Halo, Selamat Datang {dataManageExams[0]?.account_teacher.fullName}
        </h1>

        <ul className="mx-auto mt-10 flex justify-around font-semibold text-lg max-[640px]:text-base max-[640px]:w-full max-[640px]:gap-x-3 sm:w-full md:w-11/12">
          <li
            className="bg-blue-400 px-5 py-2 rounded-lg hover:bg-blue-500 cursor-pointer text-center"
            id="createQusetions"
            onClick={(e) => handleClickItem(e.currentTarget.id)}
          >
            Buat Soal
          </li>
          <li
            className="bg-blue-400 px-5 py-2 rounded-lg hover:bg-blue-500 cursor-pointer text-center"
            id="viewResult"
            onClick={(e) => handleClickItem(e.currentTarget.id)}
          >
            Kelola Soal
          </li>
          <li
            className="bg-blue-400 px-5 py-2 rounded-lg hover:bg-blue-500 cursor-pointer text-center"
            id="manageStudent"
            onClick={(e) => handleClickItem(e.currentTarget.id)}
          >
            Kelola Siswa
          </li>
          <li className="bg-blue-400 px-5 py-2 rounded-lg hover:bg-blue-500 cursor-pointer text-center">
            <button onClick={() => window.location.reload()}>Kembali</button>
          </li>
        </ul>
        <div className="border border-slate-800 mt-10 mb-7 rounded-xl" />

        <div className="mt-5">
          {dashboardButton.viewResult === true ? (
            <ViewQuestions />
          ) : dashboardButton.manageStudent === true ? (
            <ManageStudent />
          ) : dashboardButton.createQusetions === true ? (
            <CreateNewQuestions />
          ) : (
            <div>
              <h1 className="mb-7 text-2xl text-center font-semibold">
                Jadwal Ujian Hari ini
              </h1>
              <Table>
                <TableHeader>
                  <TableRow className="bg-[#3282B8]">
                    <TableHead className="text-base">No</TableHead>
                    <TableHead className="text-base">Nama Ujian</TableHead>
                    <TableHead className="text-base">Kelas</TableHead>
                    <TableHead className="text-base">Dibuat Tanggal</TableHead>
                    <TableHead className="text-base">Tenggat Waktu</TableHead>
                    <TableHead className="text-base">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {dataManageExams.length > 0 ? (
                    dataManageExams.map((item: any, i: number) => (
                      <TableRow key={i}>
                        <TableCell>{i + 1}</TableCell>
                        <TableCell>{item.exams?.nama_ujian}</TableCell>
                        <TableCell>{item.kelas}</TableCell>
                        <TableCell>
                          {new Date(item.dibuat_tgl).toLocaleDateString(
                            "id-ID",
                            options
                          )}
                        </TableCell>
                        <TableCell>{item.tenggat_waktu}</TableCell>
                        <TableCell>
                          {item.lengthStudent.length ===
                          item.lengthStudentCompleteExams.length
                            ? "Selesai"
                            : "Belum Selesai"}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        className="text-center text-lg font-bold"
                        colSpan={6}
                      >
                        Belum Ada Tugas Yang Dibuat
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      </div>
    </LayoutBodyContent>
  );
}
