"use client";
import { useGetDataTeacher } from "@/app/hooks/getDataTeacher";
import { useLocationPage } from "@/store/locationPage/state";
import HamburgerMenuBar from "@/components/sidebar/compSidebar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import LayoutBodyContent from "@/layout/bodyContent";
import LayoutProfileUser from "@/layout/layoutProfile";
import { supabase } from "@/lib/supabase/data";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useGetIdUsers } from "@/store/useGetIdUsers/state";
import { useGetDataUsers } from "@/store/useGetDataUsers/state";

export default function TeacherProfile() {
  const getidTeacher = useGetIdUsers((state) => state.idUsers);
  const [getHistoryExams, setGetHistoryExams] = useState<string[]>([]);
  const getProfileTeacher = useGetDataUsers((state) => state.dataUsers);
  const pathName = usePathname();
  const isLocationPage = useLocationPage((func) => func.setLocationPage);

  useEffect(() => {
    isLocationPage(pathName);
  }, [pathName]);

  useEffect(() => {
    if (!getidTeacher) return;
    async function historyExams() {
      const [
        { data: dataManageExams, error: errorDataManageExams },
        { data: dataHistoryExams, error: errorDataHistoryExams },
      ]: any = await Promise.all([
        supabase
          .from("managed_exams")
          .select("kelas,dibuat_tgl,id_Teacher,idExams")
          .eq("id_Teacher", getidTeacher),
        supabase
          .from("history-exam-student")
          .select(
            "exam_id,hasil_ujian,student_id,kelas,exams(nama_ujian,tipeUjian,idTeacher)",
          )
          .eq("exams.idTeacher", getidTeacher),
      ]);

      if (errorDataManageExams || errorDataHistoryExams) {
        toast("Gagal ❌", {
          description: "Data Error Ditampilkan",
        });
      }

      const fillterNotNull = dataHistoryExams.filter(
        (data: any) => data.exams !== null,
      );

      const result = fillterNotNull?.reduce((acc: any, cur: any) => {
        const found = acc.find(
          (item: any) =>
            item.kelas === cur.kelas && item.exam_id === cur.exam_id,
        );
        if (!found) {
          acc.push({
            kelas: cur.kelas,
            exam_id: cur.exam_id,
            nama_ujian: cur.exams.nama_ujian,
            tipeUjian: cur.exams.tipeUjian,
            hasil_ujian: [cur.hasil_ujian],
            student_id: [cur.student_id],
          });
        } else {
          found.hasil_ujian.push(cur.hasil_ujian);
          found.student_id.push(cur.student_id);
        }
        return acc;
      }, []);

      const mergedData = result?.map((item: any) => {
        const findDetail = dataManageExams.find(
          (f: any) => f.kelas === item.kelas && f.idExams === item.exam_id,
        );
        return {
          ...item,
          ...findDetail,
        };
      });

      setGetHistoryExams(mergedData);
    }
    historyExams();
  }, [getidTeacher]);

  async function handleEditProfileTeacher(event: any) {
    event.preventDefault();
    const fieldNames = [
      "fullName",
      "pengajarMapel",
      "noTlp",
      "email",
      "password",
    ];
    const payloadString = fieldNames.map(
      (id: any) => event.target[id].value || "",
    );
    const payload = fieldNames.reduce((acc: any, key: any, i: number) => {
      const val = payloadString[i];
      if (val !== "") {
        acc[key] = val;
      }
      return acc;
    }, {});

    const { error } = await supabase
      .from("account_teacher")
      .update(payload)
      .eq("id_teacher", getidTeacher);

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

  function resultNilaiRataRata(data: any) {
    const hasilUjian = data.hasil_ujian;

    const nilaiUjian = hasilUjian
      .filter((fil: any) => fil !== "pending" && fil !== "telat")
      .map(Number);
    const nilaiPending = hasilUjian.filter((fil: any) => fil === "pending");
    const nilaiTelat = hasilUjian.filter((fil: any) => fil === "telat");

    const nilaiYangPendingAtauTelat =
      nilaiPending.length > 0 || nilaiTelat.length > 0;

    const nilaiRataRata =
      nilaiUjian.length > 0
        ? Math.round(
            nilaiUjian.reduce((acc: any, cur: any) => acc + cur, 0) /
              nilaiUjian.length,
          )
        : 0;

    function getMessage() {
      if (nilaiPending.length > 0 && nilaiTelat.length > 0) {
        return `Ada ${nilaiTelat.length} siswa telat dan ${nilaiPending.length} belum dinilai`;
      }

      if (nilaiTelat.length > 0) {
        return `Ada ${nilaiTelat.length} Siswa Yang Telat Mengerjakan`;
      }

      return `Ada ${nilaiPending.length} siswa yang belum dinilai`;
    }

    if (nilaiYangPendingAtauTelat) {
      return (
        <Popover>
          <PopoverTrigger asChild>
            <h1>{nilaiRataRata}</h1>
          </PopoverTrigger>
          <PopoverContent className="w-fit p-2">
            <h1 className="font-semibold text-xs">{getMessage()}</h1>
          </PopoverContent>
        </Popover>
      );
    }
    return nilaiRataRata;
  }

  return (
    <LayoutBodyContent>
      {getHistoryExams.length > 0 ? (
        <>
          <div className="flex justify-between items-center mb-3">
            <h1 className="text-4xl font-bold">Profil Guru</h1>
            <HamburgerMenuBar />
          </div>
          <div className="w-full h-1 bg-slate-700 rounded-lg mt-3" />
          <div className="mt-7">
            <LayoutProfileUser dataUser={getProfileTeacher}>
              <div className="basis-3/4 flex flex-col gap-y-1.5">
                <h1 className="capitalize font-semibold text-4xl xl:text-5xl">
                  {getProfileTeacher?.fullName || ""}
                </h1>
                <div className="text-lg">
                  <h2>
                    <span>NISN</span> {getProfileTeacher?.nisn || ""}
                  </h2>
                  <h2>{getProfileTeacher?.pengajarMapel || ""}</h2>
                </div>
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
                    onSubmit={(event) => handleEditProfileTeacher(event)}
                  >
                    <DialogHeader className="text-start">
                      <DialogTitle>Edit Profile</DialogTitle>
                      <DialogDescription className="mt-1 text-base">
                        Edit Seluruh Informasi Profil Anda Disini
                      </DialogDescription>
                      <div>
                        <label htmlFor="fullName" className="mb-2 block">
                          Nama
                        </label>
                        <Input id="fullName" placeholder="Jhon Doe" />
                      </div>
                      <div>
                        <label htmlFor="pengajarMapel" className="mb-2 block">
                          Ubah Pengajar Mata Pelajaran
                        </label>
                        <Input
                          id="pengajarMapel"
                          placeholder="Matematika - Bahasa Indonesia - dst"
                        />
                      </div>
                      <div>
                        <label htmlFor="noTlp" className="mb-2 block">
                          Ubah No Telepon
                        </label>
                        <Input id="noTlp" placeholder="089276361434" />
                      </div>
                      <div>
                        <label htmlFor="email" className="mb-2 block">
                          Email
                        </label>
                        <Input
                          type="email"
                          id="email"
                          placeholder="jhondoe56@gmail.com"
                        />
                      </div>
                      <div>
                        <label htmlFor="password" className="mb-2 block">
                          Ubah Password
                        </label>
                        <Input
                          type="password"
                          id="password"
                          placeholder="**********"
                        />
                      </div>

                      <span className="font-semibold block text-xs text-red-500 text-end">
                        *Jika Ingin Diubah Hanya Salah Satu Maka Sisanya
                        Dikosongkan Saja
                      </span>
                    </DialogHeader>
                    <DialogFooter className="mt-3">
                      <DialogClose asChild>
                        <Button className="cursor-pointer" variant="outline">
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
                  src="/img/global/history.png"
                  alt="History"
                  width={200}
                  height={200}
                  className="size-8"
                />
                <h1 className="text-2xl font-semibold">
                  Riwayat Ujian Yang Dibuat
                </h1>
              </div>

              <Table>
                <TableHeader>
                  <TableRow className="bg-[#3282B8]">
                    <TableHead>No</TableHead>
                    <TableHead>Nama Ujian</TableHead>
                    <TableHead>Jumlah Siswa</TableHead>
                    <TableHead>Nilai Rata-Rata</TableHead>
                    <TableHead>Kelas</TableHead>
                    <TableHead>Tanggal</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {getHistoryExams?.length > 0 ? (
                    getHistoryExams?.map((item: any, i: number) => (
                      <TableRow key={i}>
                        <TableCell className="text-center font-semibold">
                          {i + 1}
                        </TableCell>
                        <TableCell>{item.nama_ujian}</TableCell>
                        <TableCell className="text-center">
                          {item.student_id?.length}
                        </TableCell>
                        <TableCell className="text-center">
                          {resultNilaiRataRata(item)}
                        </TableCell>
                        <TableCell className="text-center">
                          {item.kelas}
                        </TableCell>
                        <TableCell className="text-center">
                          {item.dibuat_tgl}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={6}
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
            <div className="flex justify-center items-center gap-7 mb-10 flex-col sm:flex-row sm:mb-5">
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
                <div className="w-1/4 h-7 rounded-md bg-slate-500 animate-pulse mb-2"></div>
                <div className="w-1/3 h-7 rounded-md bg-slate-500 animate-pulse"></div>
              </div>
            </div>

            <div>
              <div className="flex items-center mb-5 gap-3">
                <div className="w-9 h-7 rounded-md bg-slate-500 animate-pulse"></div>
                <div className="w-1/3 h-7 rounded-md bg-slate-500 animate-pulse"></div>
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
