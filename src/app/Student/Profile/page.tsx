"use client";
import Image from "next/image";
import { useGetDataStudent } from "../../hooks/getDataStudent";
import { useGetIdStudent } from "../../hooks/getIdStudent";
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
import { useConvertDate } from "../../hooks/getConvertDate";
import { Dialog } from "@radix-ui/react-dialog";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import HamburgerMenuBar from "@/components/sidebar/compSidebar";
import LayoutProfileUser from "@/layout/layoutProfile";

export default function Profil() {
  const idSiswa = useGetIdStudent();
  const dataStudent = useGetDataStudent(idSiswa);
  const [historyStudent, setHistoryStudent] = useState<any>([]);
  const [rankingClass, setRankingClass] = useState<any>([]);
  const filterExams = historyStudent.filter(
    (fil: any) => fil.hasil_ujian !== "telat" && fil.hasil_ujian !== "pending"
  );

  const forRankingClasses = rankingClass.map((fil: any) => {
    return {
      ...fil,
      hasil_ujian:
        fil.hasil_ujian !== "telat" && fil.hasil_ujian !== "pending"
          ? fil.hasil_ujian
          : "0",
    };
  });

  const rankingPerKelas = forRankingClasses.reduce((acc: any, cur: any) => {
    const kelasItem = acc.find((d: any) => d.kelas === cur.kelas);
    const toNum = Number(cur.hasil_ujian);
    if (!kelasItem) {
      acc.push({
        kelas: cur.kelas,
        resultExam: [
          {
            student_id: cur.student_id,
            pointExams: [toNum],
          },
        ],
      });
    } else {
      const studentItem = kelasItem.resultExam.find(
        (item: any) => item.student_id === cur.student_id
      );
      if (!studentItem) {
        kelasItem.resultExam.push({
          student_id: cur.student_id,
          pointExams: [toNum],
        });
      } else {
        studentItem.pointExams.push(toNum);
      }
    }
    return acc;
  }, []);

  const calculateTotalEveryScoreExams =
    rankingPerKelas
      .filter((fil: any) => fil.kelas === dataStudent?.classes)[0]
      ?.resultExam?.map((item: any) => {
        return {
          ...item,
          pointExams: item.pointExams.reduce(
            (acc: any, cur: any) => acc + cur,
            0
          ),
        };
      }) ?? [];

  const sortRanking = calculateTotalEveryScoreExams?.sort(
    (low: any, high: any) => high.pointExams - low.pointExams
  );

  let lastScore: number | null = null;
  let lastRank: number = 0;
  let index: number = 0;

  const addRanking = sortRanking?.map((siswa: any) => {
    index++;
    if (siswa.pointExams !== lastScore) {
      lastRank = index;
      lastScore = siswa.pointExams;
    }

    return { ...siswa, ranking: lastRank };
  });

  const resultChooseRanking = addRanking?.filter(
    (fil: any) => fil.student_id === idSiswa
  );

  useEffect(() => {
    if (!idSiswa) return;
    async function getHistoryStudent() {
      const { data, error }: any = await supabase
        .from("history-exam-student")
        .select("*, exams(nama_ujian)")
        .eq("student_id", idSiswa);
      if (error) {
        console.log("gagal di tampilkan");
      }
      setHistoryStudent(data);
    }

    getHistoryStudent();
  }, [idSiswa]);

  useEffect(() => {
    async function getRankings() {
      const { data, error }: any = await supabase
        .from("history-exam-student")
        .select("student_id,exam_id,hasil_ujian,kelas");

      if (error) {
        console.log("gagal memuat data");
      }
      setRankingClass(data);
    }

    getRankings();
  }, []);

  async function handleEditProfileStudent(event: any) {
    event.preventDefault();
    const idInputPayload = ["email", "password"];
    const payloadUser = idInputPayload.map(
      (id: any) => event.target[id].value || ""
    );

    const resultPayload = idInputPayload.reduce(
      (acc: any, id: string, i: number) => {
        const isPayload = payloadUser[i];
        if (isPayload !== "") {
          acc[id] = isPayload;
        }
        return acc;
      },
      {}
    );

    const { error } = await supabase
      .from("account-student")
      .update(resultPayload)
      .eq("idStudent", idSiswa);

    if (error) {
      toast("Gagal ❌", {
        description: "Edit Profil Gagal",
      });
    } else {
      toast("Berhasil ✅", {
        description: "Edit Profil Berhasil Di Update",
      });
    }
  }

  return (
    <LayoutBodyContent>
      {historyStudent.length > 0 ? (
        <>
          <div className="flex justify-between items-center mb-3">
            <h1 className="text-4xl font-bold">Profil Siswa</h1>
            <HamburgerMenuBar />
          </div>
          <div className="w-full h-1 bg-slate-700 rounded-lg mt-3" />
          <div className="mt-7">
            <LayoutProfileUser dataUser={dataStudent}>
              <div className="basis-3/4">
                <h1 className="capitalize font-semibold max-[640px]:text-4xl sm:text-3xl md:text-4xl xl:text-5xl">
                  {dataStudent?.fullName || ""}
                </h1>
                <h1 className="my-1.5">NIS : {dataStudent?.nis || ""}</h1>
                <h1>Kelas : {dataStudent?.classes || ""}</h1>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-blue-500 hover:bg-blue-600 cursor-pointer text-lg p-5">
                    Edit Profil
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <form
                    className="grid gap-5"
                    onSubmit={(event) => handleEditProfileStudent(event)}
                  >
                    <DialogHeader className="text-start">
                      <DialogTitle className="text-xl">Edit Profil</DialogTitle>
                      <DialogDescription className="mt-1">
                        Edit Seluruh Informasi Profil Kamu Disini
                      </DialogDescription>
                      <div>
                        <label htmlFor="email" className="mb-2 block">
                          Email
                        </label>
                        <Input type="email" id="email" />
                      </div>
                      <div>
                        <label htmlFor="password" className="mb-2 block">
                          Ubah Password
                        </label>
                        <Input type="password" id="password" />
                      </div>
                      <span className="font-semibold block text-xs text-red-500 text-end">
                        *Jika Ingin Diubah Hanya Salah Satu Maka Sisanya
                        Dikosongkan Saja
                      </span>
                    </DialogHeader>
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button variant="outline" className="cursor-pointer">
                          Cancel
                        </Button>
                      </DialogClose>
                      <DialogClose asChild>
                        <Button type="submit" className="cursor-pointer">
                          Confirm
                        </Button>
                      </DialogClose>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </LayoutProfileUser>

            <div>
              <div className="mb-5 flex items-center gap-3">
                <Image
                  src="/img/profileTeacher/history.png"
                  alt="History"
                  width={200}
                  height={200}
                  className="max-[640px]:w-[7%] sm:w-[6%] md:w-[5%] lg:w-[4%]"
                />
                <h1 className="text-2xl font-semibold">Riwayat Ujian</h1>
              </div>

              <div className="flex justify-evenly items-center my-10 max-[640px]:gap-x-3">
                <div className="bg-[#3396D3] p-4 rounded-lg flex flex-col items-center gap-y-1 shadow-md shadow-slate-700">
                  <Image
                    src="/img/profileStudent/done.png"
                    alt="Selesai"
                    width={200}
                    height={200}
                    className="w-1/3"
                  />
                  <h1 className="font-semibold mb-1 text-center">
                    Ujian Selesai
                  </h1>
                  <p className="text-2xl font-bold">
                    {historyStudent.length || "0"}
                  </p>
                </div>
                <div className="bg-[#3396D3] p-4 rounded-lg flex flex-col items-center gap-y-1 shadow-md shadow-slate-700">
                  <Image
                    src="/img/profileStudent/average.png"
                    alt="Nilai Rata-Rata"
                    width={200}
                    height={200}
                    className="w-1/3"
                  />
                  <h1 className="font-semibold mb-1 text-center">
                    Rata-Rata Nilai
                  </h1>
                  <p className="text-2xl font-bold">
                    {Math.round(
                      resultChooseRanking[0]?.pointExams / filterExams.length
                    ) || "0"}
                  </p>
                </div>
                <div className="bg-[#3396D3] p-4 rounded-lg flex flex-col items-center gap-y-1 shadow-md shadow-slate-700">
                  <Image
                    src="/img/profileStudent/rank.png"
                    alt="Rank"
                    width={200}
                    height={200}
                    className="w-1/3"
                  />
                  <h1 className="font-semibold mb-1 text-center">
                    Peringkat Kelas
                  </h1>
                  <p className="text-2xl font-bold">
                    {`${resultChooseRanking[0]?.ranking || "0"} / ${
                      calculateTotalEveryScoreExams.length
                    }` || "0"}
                  </p>
                </div>
              </div>
              <Table>
                <TableHeader>
                  <TableRow className="bg-[#3282B8]">
                    <TableHead className="text-base font-semibold">
                      No
                    </TableHead>
                    <TableHead className="text-base font-semibold">
                      Nama Ujian
                    </TableHead>
                    <TableHead className="text-base font-semibold">
                      Tanggal
                    </TableHead>
                    <TableHead className="text-base font-semibold">
                      Nilai
                    </TableHead>
                    <TableHead className="text-base font-semibold">
                      Status
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {historyStudent.length > 0 ? (
                    historyStudent.map((item: any, i: number) => (
                      <TableRow key={i}>
                        <TableCell>{i + 1}</TableCell>
                        <TableCell>{item.exams?.nama_ujian}</TableCell>
                        <TableCell>
                          {useConvertDate(item.created_at, {
                            minute: "numeric",
                            hour: "numeric",
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })}
                        </TableCell>
                        <TableCell>{item.hasil_ujian}</TableCell>
                        <TableCell>
                          {item.status_exam === true
                            ? "Selesai"
                            : "Belum Selesai"}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={5}
                        className="text-center text-lg font-semibold"
                      >
                        Belum Ada History
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="w-1/3 h-10 bg-slate-500 animate-pulse rounded-md"></div>
          <div className="h-1 bg-slate-500 animate-pulse rounded-md my-3" />
          <div className="mt-7">
            <div className="flex justify-center items-center gap-7 mb-5 max-[640px]:flex-col max-[640px]:mb-10">
              <div className="w-28 h-28 rounded-full bg-slate-500 animate-pulse"></div>

              <div className="w-2/3">
                <h1 className="mb-2 bg-slate-500 animate-pulse rounded-md w-2/3 h-7"></h1>
                <p className="bg-slate-500 animate-pulse rounded-md w-1/3 h-5"></p>
              </div>
              <div className="w-20 h-8 bg-slate-500 animate-pulse rounded-md"></div>
            </div>

            <div className="mb-5">
              <div className="flex items-center mb-5 gap-3">
                <div className="w-9 h-7 rounded-md bg-slate-500 animate-pulse"></div>
                <div className="w-1/5 h-7 rounded-md bg-slate-500 animate-pulse"></div>
              </div>
              <div>
                <div className="w-11/12 h-7 rounded-md bg-slate-500 animate-pulse mb-2"></div>
                <div className="w-3/4 h-7 rounded-md bg-slate-500 animate-pulse mb-2"></div>
                <div className="w-10/12 h-7 rounded-md bg-slate-500 animate-pulse mb-2"></div>
                <div className="w-1/2 h-7 rounded-md bg-slate-500 animate-pulse mb-2"></div>
                <div className="w-1/4 h-7 rounded-md bg-slate-500 animate-pulse"></div>
              </div>
            </div>

            <div>
              <div className="flex items-center mb-5 gap-3">
                <div className="w-9 h-7 rounded-md bg-slate-500 animate-pulse"></div>
                <div className="w-1/3 h-7 rounded-md bg-slate-500 animate-pulse"></div>
              </div>
              <div className="flex justify-evenly items-center my-10 max-[640px]:gap-x-3">
                <div className="h-28 w-28 rounded-md bg-slate-500 animate-pulse"></div>
                <div className="h-28 w-28 rounded-md bg-slate-500 animate-pulse"></div>
                <div className="h-28 w-28 rounded-md bg-slate-500 animate-pulse"></div>
              </div>

              <div className="w-full h-7 rounded-md bg-slate-500 animate-pulse mb-3"></div>
              <div className="w-full h-7 rounded-md bg-slate-500 animate-pulse mb-3"></div>
              <div className="w-full h-7 rounded-md bg-slate-500 animate-pulse mb-3"></div>
            </div>
          </div>
        </>
      )}
    </LayoutBodyContent>
  );
}
