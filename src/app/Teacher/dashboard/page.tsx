"use client";

import { useConvertDate } from "@/app/hooks/getConvertDate";
import { useGetDataTeacher } from "@/app/hooks/getDataTeacher";
import { useGetIdTeacher } from "@/app/hooks/getIdTeacher";
import CreateNewQuestions from "@/component/khususGuru/buatSoal/createQuestions";
import ViewQuestions from "@/component/khususGuru/hasilPertanyaan/pertanyaan";
import ManageStudent from "@/component/khususGuru/kelolaSiswa/manageStudent";
import SideBarDashboardTeacher from "@/component/khususGuru/navigasi/floatingBar";
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
import Image from "next/image";
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
  // const getProfileTeacher = useGetDataTeacher(idTeacher);
  const jumlahSiswa = new Set(
    dataManageExams.flatMap((a: any) => a.lengthStudent)
  );
  const averageValueExam = dataManageExams
    ?.flatMap((item: any) => item.hasil_ujian)
    .filter((a: any) => a !== "pending" && a !== "telat")
    .map((toNum: any) => Number(toNum))
    .reduce((acc: any, cur: any) => acc + cur, 0);

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
          .select("*, exams(nama_ujian)")
          .eq("id_Teacher", idTeacher);

      const { data: isCompleteExam, error: errorIsCompleteExam }: any =
        await supabase
          .from("history-exam-student")
          .select(
            "exam_id,student_id,kelas,hasil_ujian,status_exam,exams(idTeacher)"
          )
          .eq("exams.idTeacher", idTeacher);
      const { data: lengthStudent, error: errorLengthStudent }: any =
        await supabase.from("account-student").select("classes,idStudent");

      if (errorDatasManageExams || errorIsCompleteExam || errorLengthStudent) {
        console.log("data error ditampilkan");
      } else {
        const filterNull = isCompleteExam?.filter(
          (isNull: any) => isNull.exams !== null
        );
        const completeExams = filterNull.reduce((acc: any, cur: any) => {
          const found = acc.find((item: any) => item.kelas === cur.kelas);
          if (!found) {
            acc.push({
              kelas: cur.kelas,
              exam_id: [cur.exam_id],
              student_id: [cur.student_id],
              hasil_ujian: [cur.hasil_ujian],
            });
          } else {
            found.student_id.push(cur.student_id);
            found.exam_id.push(cur.exam_id);
            found.hasil_ujian.push(cur.hasil_ujian);
          }
          return acc;
        }, []);

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
            (f: any) =>
              f.kelas === item.kelas && f.exam_id.includes(item.idExams)
          );

          const studentCompleteExams = findsExams?.student_id.filter(
            (_: any, i: number) => findsExams.exam_id[i] === item.idExams
          );

          const findStudent = totalStudent.find(
            (f: any) => f.classes === item.kelas
          );
          return {
            ...item,
            lengthStudent: findStudent?.idStudent ?? [],
            lengthStudentCompleteExams: studentCompleteExams,
            hasil_ujian: findsExams?.hasil_ujian ?? [],
          };
        });
        setDataManageExams(mergedData);
      }
    }
    getDataManageExams();
  }, [idTeacher]);

  return (
    <LayoutBodyContent>
      <div className="pt-24 mx-auto max-[640px]:w-11/12 sm:w-11/12 md:w-2/3">
        <h1 className="text-4xl font-bold">Dashboard Pengajar</h1>
        <div>
          <h1 className="text-3xl font-semibold mt-10">Ringkasan</h1>
          <div className="flex justify-evenly items-center mt-8 text-slate-800">
            <div className="bg-[#48B3AF] rounded-md max-[640px]:basis-[30%] max-[640px]:p-4 sm:basis-[30%] sm:p-4 lg:basis-1/4 lg:p-5">
              <Image
                src="/img/dashboardTeacher/complete.png"
                alt="Complete"
                width={200}
                height={200}
                className="w-1/4 mx-auto"
              />
              <span className="text-4xl font-bold block py-2 max-[640px]:text-3xl">
                {dataManageExams.length || "0"}
              </span>
              <h1 className="font-medium">Ujian Dibuat</h1>
            </div>
            <div className="bg-[#48B3AF] rounded-md max-[640px]:basis-[30%] max-[640px]:p-4 sm:p-3.5 sm:basis-[30%] lg:basis-1/4 lg:p-5">
              <Image
                src="/img/dashboardTeacher/count.png"
                alt="Jumlah"
                width={200}
                height={200}
                className="w-[30%] mx-auto"
              />
              <span className="text-4xl font-bold block my-1.5 max-[640px]:text-3xl">
                {jumlahSiswa.size || "0"}
              </span>
              <h1 className="font-medium">Jumlah Siswa</h1>
            </div>
            <div className="bg-[#48B3AF] basis-1/5 rounded-md p-4 max-[640px]:basis-[34%] sm:basis-[30%] lg:basis-1/4 lg:p-5">
              <Image
                src="/img/dashboardTeacher/average.png"
                alt="Rata-Rata"
                width={200}
                height={200}
                className="w-1/4 mx-auto"
              />
              <span className="text-4xl font-bold block my-2 max-[640px]:text-3xl">
                {Math.round(averageValueExam / jumlahSiswa.size) || "0"}
              </span>
              <h1 className="font-medium">Nilai Rata-Rata</h1>
            </div>
          </div>
          <SideBarDashboardTeacher handleClickItem={handleClickItem} />
          <div className="mt-10">
            {dashboardButton.viewResult === true ? (
              <ViewQuestions />
            ) : dashboardButton.manageStudent === true ? (
              <ManageStudent />
            ) : dashboardButton.createQusetions === true ? (
              <CreateNewQuestions />
            ) : (
              <div>
                <h1 className="mb-7 text-2xl font-semibold">
                  Jadwal Ujian Aktif Hari ini
                </h1>
                <Table>
                  <TableHeader>
                    <TableRow className="bg-[#3282B8]">
                      <TableHead className="text-base text-center">
                        No
                      </TableHead>
                      <TableHead className="text-base text-center">
                        Nama Ujian
                      </TableHead>
                      <TableHead className="text-base text-center">
                        Kelas
                      </TableHead>
                      <TableHead className="text-base text-center">
                        Tenggat Waktu
                      </TableHead>
                      <TableHead className="text-base text-center">
                        Status
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {dataManageExams.length > 0 ? (
                      dataManageExams.map((item: any, i: number) => (
                        <TableRow key={i}>
                          <TableCell className="text-center">{i + 1}</TableCell>
                          <TableCell>{item.exams?.nama_ujian}</TableCell>
                          <TableCell className="text-center">
                            {item.kelas}
                          </TableCell>
                          <TableCell className="text-center">
                            {item.dibuat_tgl} {item.tenggat_waktu}
                          </TableCell>

                          <TableCell className="text-center">
                            {item.lengthStudent.length ===
                            item.lengthStudentCompleteExams?.length
                              ? "Selesai"
                              : "Belum Selesai"}
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell
                          colSpan={6}
                          className="text-center text-lg font-semibold"
                        >
                          Belum Ada Soal Ujian Yang Dikelola
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            )}
          </div>
        </div>
      </div>
    </LayoutBodyContent>
  );
}
