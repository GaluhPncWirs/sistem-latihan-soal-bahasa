"use client";

import { useConvertDate } from "@/app/hooks/getConvertDate";
import { useGetDataTeacher } from "@/app/hooks/getDataTeacher";
import { useGetIdTeacher } from "@/app/hooks/getIdTeacher";
import CreateNewQuestions from "@/components/khususGuru/buatSoal/createQuestions";
import ViewQuestions from "@/components/khususGuru/hasilPertanyaan/pertanyaan";
import ManageStudent from "@/components/khususGuru/kelolaSiswa/manageStudent";
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
import HeaderDasboard from "@/components/forDasboard/headerDashboard";
import FloatingBarDashboardTeacher from "@/components/khususGuru/navigasi/floatingBar";

export default function Teacher() {
  const [dashboardButton, setDashboardButton] = useState({
    createQusetions: false,
    viewResult: false,
    manageStudent: false,
  });
  const idTeacher = useGetIdTeacher();
  const dataUserTeacher = useGetDataTeacher(idTeacher);
  const [dataManageExams, setDataManageExams] = useState<any>([]);
  // const getProfileTeacher = useGetDataTeacher(idTeacher);
  const jumlahSiswa = new Set(
    dataManageExams.flatMap((a: any) => a.lengthStudent)
  );
  const [dataStudents, setDataStudents] = useState<any>([]);

  const averageValueExam = dataManageExams
    ?.flatMap((item: any) => item.hasil_ujian)
    .filter((a: any) => a !== "pending" && a !== "telat")
    .map(Number)
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

  // untuk bagian nilai siswa atau kelola siswa
  useEffect(() => {
    if (!idTeacher) return;
    async function getDataStudent() {
      const { data: student, error: errorStudent } = await supabase
        .from("account-student")
        .select("fullName,classes,idStudent,email");
      const { data: historyStudent, error: errorHistoryStudent } =
        await supabase
          .from("history-exam-student")
          .select("*,exams(id,nama_ujian,tipeUjian,idTeacher)")
          .eq("exams.idTeacher", idTeacher);

      if (errorStudent || errorHistoryStudent) {
        console.log("data gagal diambil");
      } else {
        const dataIsNotNull = historyStudent?.filter(
          (a: any) => a.exams !== null
        );

        const idSiswa = dataIsNotNull.reduce((acc: any, cur: any) => {
          const findId = acc.find((f: any) => f.student_id === cur.student_id);
          if (!findId) {
            acc.push({
              student_id: cur.student_id,
              resultUjian: [
                {
                  namaUjian:
                    cur.exam_id === cur.exams.id ? cur.exams.nama_ujian : null,
                  idUjian: cur.exam_id,
                  tipe_ujian: cur.exams.tipeUjian,
                  hasil_ujian: cur.hasil_ujian,
                  status_exam: cur.status_exam,
                },
              ],
              created_at: [cur.created_at],
            });
          } else {
            findId.resultUjian.push({
              namaUjian:
                cur.exam_id === cur.exams.id ? cur.exams.nama_ujian : null,
              idUjian: cur.exam_id,
              tipe_ujian: cur.exams.tipeUjian,
              hasil_ujian: cur.hasil_ujian,
              status_exam: cur.status_exam,
            });
            findId.created_at.push(cur.created_at);
          }
          return acc;
        }, []);

        const mergedDatas = idSiswa.map((item: any) => {
          const historyExam = student.find(
            (f: any) => f.idStudent === item.student_id
          );
          return {
            ...item,
            fullName: historyExam?.fullName ?? null,
            classes: historyExam?.classes ?? null,
          };
        });

        setDataStudents(mergedDatas);
      }
    }
    getDataStudent();
  }, [idTeacher]);

  return (
    <LayoutBodyContent>
      {dataManageExams.length > 0 ? (
        <>
          <HeaderDasboard
            user="Pengajar"
            fullName={dataUserTeacher.fullName}
            totalExams={dataStudents}
          />
          <div className="mt-5">
            <h1 className="max-[640px]:text-xl sm:text-2xl font-semibold">
              Ringkasan Aktifitas Ujian
            </h1>
            <div className="flex justify-evenly items-center my-7 text-slate-800 gap-x-1">
              <div className="bg-[#48B3AF] rounded-md max-[640px]:p-4 sm:basis-[30%] sm:p-4 lg:basis-1/4 lg:p-5">
                <Image
                  src="/img/dashboardTeacher/complete.png"
                  alt="Complete"
                  width={200}
                  height={200}
                  className="mx-auto max-[640px]:w-[30%] sm:w-1/4"
                />
                <span className="text-4xl font-bold block py-2 max-[640px]:text-3xl">
                  {dataManageExams.length || "0"}
                </span>
                <h1 className="font-medium">Ujian Dibuat</h1>
              </div>
              <div className="bg-[#48B3AF] rounded-md max-[640px]:p-4 sm:basis-[30%] sm:p-4 lg:basis-1/4 lg:p-5">
                <Image
                  src="/img/dashboardTeacher/count.png"
                  alt="Jumlah"
                  width={200}
                  height={200}
                  className="mx-auto max-[640px]:w-[30%] sm:w-1/4"
                />
                <span className="text-4xl font-bold block my-1.5 max-[640px]:text-3xl">
                  {jumlahSiswa.size || "0"}
                </span>
                <h1 className="font-medium">Jumlah Siswa</h1>
              </div>
              <div className="bg-[#48B3AF] rounded-md max-[640px]:p-4 sm:basis-[30%] sm:p-4 lg:basis-1/4 lg:p-5">
                <Image
                  src="/img/dashboardTeacher/average.png"
                  alt="Rata-Rata"
                  width={200}
                  height={200}
                  className="mx-auto max-[640px]:w-1/4 sm:w-1/4"
                />
                <span className="text-4xl font-bold block my-2 max-[640px]:text-3xl">
                  {Math.round(averageValueExam / jumlahSiswa.size) || "0"}
                </span>
                <h1 className="font-medium">Nilai Rata-Rata</h1>
              </div>
            </div>
            <FloatingBarDashboardTeacher handleClickItem={handleClickItem} />
            <div className="mt-5">
              {dashboardButton.viewResult === true ? (
                <ViewQuestions />
              ) : dashboardButton.manageStudent === true ? (
                <ManageStudent dataStudents={dataStudents} />
              ) : dashboardButton.createQusetions === true ? (
                <CreateNewQuestions />
              ) : (
                <div>
                  <h1 className="mb-5 text-2xl font-semibold">
                    Jadwal Ujian Hari ini
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
                            <TableCell className="text-center">
                              {i + 1}
                            </TableCell>
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
        </>
      ) : (
        <>
          <div className="flex justify-between items-center">
            <div className="w-1/3 h-10 max-[640px]:w-1/2 bg-slate-500 animate-pulse rounded-md"></div>
            <div className="w-7 h-7 bg-slate-500 animate-pulse rounded-md"></div>
          </div>
          <div className="h-1 bg-slate-500 animate-pulse rounded-lg mt-3" />
          <div className="mt-5 flex items-center gap-x-7">
            <div className="h-36 sm:w-1/4 md:w-1/6 max-[640px]:w-1/3 max-[640px]:h-28 rounded-full bg-slate-500 animate-pulse"></div>
            <div className="w-2/3 h-28 flex flex-col justify-center">
              <div className="w-2/3 h-7 rounded-md bg-slate-500 animate-pulse"></div>
              <div className="mt-2 h-5 rounded-md bg-slate-500 animate-pulse w-1/3"></div>
            </div>
          </div>
          <div className="mt-5">
            <div className="w-1/2 max-[640px]:w-3/4 h-7 bg-slate-500 animate-pulse rounded-md"></div>

            <div className="flex justify-evenly items-center my-7 text-slate-800 gap-x-1">
              <div className="bg-slate-500 animate-pulse rounded-md max-[640px]:p-4 max-[640px]:w-1/3 sm:basis-[30%] sm:p-4 lg:basis-1/4 lg:p-5">
                <div className="w-3/4 h-7 bg-slate-400 animate-pulse rounded-md mb-2"></div>
                <div className="w-1/2 h-6 bg-slate-400 animate-pulse rounded-md mb-2"></div>
                <div className="w-2/3 h-6 bg-slate-400 animate-pulse rounded-md"></div>
              </div>
              <div className="bg-slate-500 animate-pulse rounded-md max-[640px]:p-4 max-[640px]:w-1/3 sm:basis-[30%] sm:p-4 lg:basis-1/4 lg:p-5">
                <div className="w-3/4 h-7 bg-slate-400 animate-pulse rounded-md mb-2"></div>
                <div className="w-1/2 h-6 bg-slate-400 animate-pulse rounded-md mb-2"></div>
                <div className="w-2/3 h-6 bg-slate-400 animate-pulse rounded-md"></div>
              </div>
              <div className="bg-slate-500 animate-pulse rounded-md max-[640px]:p-4 max-[640px]:w-1/3 sm:basis-[30%] sm:p-4 lg:basis-1/4 lg:p-5">
                <div className="w-3/4 h-7 bg-slate-400 animate-pulse rounded-md mb-2"></div>
                <div className="w-1/2 h-6 bg-slate-400 animate-pulse rounded-md mb-2"></div>
                <div className="w-2/3 h-6 bg-slate-400 animate-pulse rounded-md"></div>
              </div>
            </div>
            <div className="flex justify-evenly mx-auto items-center h-20 bg-slate-500 animate-pulse rounded-md max-[640px]:w-full sm:w-full lg:w-11/12">
              <div className="bg-slate-400 animate-pulse rounded-md w-1/6 h-10"></div>
              <div className="bg-slate-400 animate-pulse rounded-md w-1/6 h-10"></div>
              <div className="bg-slate-400 animate-pulse rounded-md w-1/6 h-10"></div>
              <div className="bg-slate-400 animate-pulse rounded-md w-1/6 h-10"></div>
            </div>
            <div className="mt-5">
              <div className="mb-5 bg-slate-500 animate-pulse rounded-md w-1/2 h-10"></div>
              <div>
                {Array.from({ length: 5 }).map((_: any, i: number) => (
                  <div
                    key={i}
                    className="bg-slate-500 animate-pulse rounded-md w-full h-7 mb-3"
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </LayoutBodyContent>
  );
}
