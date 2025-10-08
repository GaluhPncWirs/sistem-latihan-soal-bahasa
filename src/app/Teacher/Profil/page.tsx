"use client";
import { useConvertDate } from "@/app/hooks/getConvertDate";
import { useGetDataTeacher } from "@/app/hooks/getDataTeacher";
import { useGetIdTeacher } from "@/app/hooks/getIdTeacher";
import HamburgerMenuBar from "@/components/sidebar/compSidebar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
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
import { supabase } from "@/lib/supabase/data";
import { DialogClose } from "@radix-ui/react-dialog";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function TeacherProfile() {
  const idTeacher = useGetIdTeacher();
  const [getHistoryExams, setGetHistoryExams] = useState<any>([]);
  const getProfileTeacher = useGetDataTeacher(idTeacher);
  const [previewImgProfil, setPreviewImgProfil] = useState<string | null>(null);

  useEffect(() => {
    if (!idTeacher) return;
    async function historyExams() {
      const { data: dataManageExams, error: errorDataManageExams }: any =
        await supabase
          .from("managed_exams")
          .select("kelas,dibuat_tgl,id_Teacher,idExams")
          .eq("id_Teacher", idTeacher);
      const { data: dataHistoryExams, error: errorDataHistoryExams }: any =
        await supabase
          .from("history-exam-student")
          .select(
            "exam_id,hasil_ujian,student_id,kelas,exams(nama_ujian,tipeUjian,idTeacher)"
          )
          .eq("exams.idTeacher", idTeacher);

      if (errorDataManageExams || errorDataHistoryExams) {
        toast("Gagal ❌", {
          description: "Data Error Ditampilkan",
        });
      }

      const fillterNotNull = dataHistoryExams.filter(
        (data: any) => data.exams !== null
      );

      const result = fillterNotNull?.reduce((acc: any, cur: any) => {
        const found = acc.find(
          (item: any) =>
            item.kelas === cur.kelas && item.exam_id === cur.exam_id
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
          (f: any) => f.kelas === item.kelas && f.idExams === item.exam_id
        );
        return {
          ...item,
          ...findDetail,
        };
      });

      setGetHistoryExams(mergedData);
    }
    historyExams();
  }, [idTeacher]);

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
      (id: any) => event.target[id].value || ""
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
      .eq("id_teacher", idTeacher);

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

  function nilaiRataRata(data: any) {
    const filterResultExamScore = data.hasil_ujian.filter(
      (fil: any) => fil !== "pending" && fil !== "telat"
    );
    const filterResultExamPendingAndLate = data.hasil_ujian.filter(
      (fil: any) => fil === "pending" || fil === "telat"
    );
    const filterResultExamPending = data.hasil_ujian.filter(
      (fil: any) => fil === "pending"
    );
    const filterResultExamTelat = data.hasil_ujian.filter(
      (fil: any) => fil === "telat"
    );

    const resultExams =
      filterResultExamScore
        .map(Number)
        .reduce((acc: any, cur: any) => acc + cur, 0) /
      filterResultExamScore.length;

    if (filterResultExamPendingAndLate.length > 0) {
      return (
        <Popover>
          <PopoverTrigger asChild>
            <h1>{Math.round(resultExams) || "0"}</h1>
          </PopoverTrigger>
          <PopoverContent className="w-fit p-2">
            <h1 className="font-semibold text-xs">
              {filterResultExamTelat[0] === "telat" &&
              filterResultExamPending[0] === "pending"
                ? `Ada ${filterResultExamTelat.length} Siswa Telat Dan ${filterResultExamPending.length} Belum Dinilai`
                : filterResultExamTelat[0] === "telat"
                ? `Ada ${filterResultExamTelat.length} Siswa Yang Telat Mengerjakan`
                : `Ada ${filterResultExamPending.length} Siswa Yang Belum Dinilai`}
            </h1>
          </PopoverContent>
        </Popover>
      );
    } else {
      return Math.round(resultExams);
    }
  }

  function handleChangeImgProfile(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setPreviewImgProfil(URL.createObjectURL(file));
    }
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
            <div className="flex justify-center items-center gap-7 mb-5 max-[640px]:flex-col max-[640px]:mb-10">
              <Dialog>
                <DialogTrigger asChild className="cursor-pointer">
                  {previewImgProfil !== null ? (
                    <Image
                      src={previewImgProfil}
                      alt="Profile User"
                      width={300}
                      height={300}
                      className="rounded-full w-1/6 max-[640px]:w-1/3"
                    />
                  ) : (
                    <Image
                      src="/img/profile/userProfile.png"
                      alt="Profile User"
                      width={300}
                      height={300}
                      className="rounded-full w-1/6 max-[640px]:w-1/3"
                    />
                  )}
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Ubah Foto Profil</DialogTitle>
                    <div className="mt-3">
                      <Input
                        type="file"
                        accept="image/*"
                        id="imgProfil"
                        onChange={handleChangeImgProfile}
                      />
                    </div>
                  </DialogHeader>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <DialogClose asChild>
                      <Button>Oke</Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              <div className="basis-3/4">
                <h1 className="capitalize mb-2 font-semibold max-[640px]:text-4xl sm:text-3xl md:text-4xl xl:text-5xl">
                  {getProfileTeacher?.fullName || ""}
                </h1>
                <p className="font-medium">
                  {getProfileTeacher?.pengajarMapel || ""}
                </p>
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
                        Edit Seluruh Informasi Profil Kamu Disini
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
            </div>
            <div className="mb-5">
              <div className="flex items-center mb-5 gap-3">
                <Image
                  src="/img/profileTeacher/account.png"
                  alt="Informasi Akun"
                  width={200}
                  height={200}
                  className="max-[640px]:w-[7%] sm:w-[6%] md:w-[5%] lg:w-[4%]"
                />
                <h1 className="text-2xl font-semibold">Informasi Akun</h1>
              </div>
              <Table>
                <TableBody>
                  <TableRow className="border-black">
                    <TableCell className="text-base font-semibold">
                      Email
                    </TableCell>
                    <TableCell className="text-base font-medium">
                      {getProfileTeacher?.email || ""}
                    </TableCell>
                  </TableRow>
                  <TableRow className="border-black">
                    <TableCell className="text-base font-semibold">
                      NISN
                    </TableCell>
                    <TableCell className="text-base font-medium">
                      {getProfileTeacher?.nisn}
                    </TableCell>
                  </TableRow>
                  <TableRow className="border-black">
                    <TableCell className="text-base font-semibold">
                      No Telepon
                    </TableCell>
                    <TableCell className="text-base font-medium">
                      {getProfileTeacher?.noTlp.match(/.{1,4}/g).join("-") ||
                        ""}
                    </TableCell>
                  </TableRow>
                  <TableRow className="border-black">
                    <TableCell className="text-base font-semibold">
                      Bergabung
                    </TableCell>
                    <TableCell className="text-base font-medium">
                      {useConvertDate(getProfileTeacher?.created_at, {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      }) || ""}
                    </TableCell>
                  </TableRow>
                  <TableRow className="border-black">
                    <TableCell className="text-base font-semibold">
                      Peran
                    </TableCell>
                    <TableCell className="text-base font-medium">
                      {getProfileTeacher?.role || ""}
                    </TableCell>
                  </TableRow>
                  <TableRow className="border-black">
                    <TableCell className="text-base font-semibold">
                      Status Akun
                    </TableCell>
                    <TableCell className="text-base font-medium">
                      Aktif
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
            <div>
              <div className="mb-5 flex items-center gap-3">
                <Image
                  src="/img/profileTeacher/history.png"
                  alt="History"
                  width={200}
                  height={200}
                  className="max-[640px]:w-[7%] sm:w-[6%] md:w-[5%] lg:w-[4%]"
                />
                <h1 className="text-2xl font-semibold">
                  Riwayat Ujian Yang Dibuat
                </h1>
              </div>

              <Table>
                <TableHeader>
                  <TableRow className="bg-[#3282B8]">
                    <TableHead className="text-center text-base font-semibold">
                      No
                    </TableHead>
                    <TableHead className="text-center text-base font-semibold">
                      Nama Ujian
                    </TableHead>
                    <TableHead className="text-center text-base font-semibold">
                      Jumlah Siswa
                    </TableHead>
                    <TableHead className="text-center text-base font-semibold">
                      Nilai Rata-Rata
                    </TableHead>
                    <TableHead className="text-center text-base font-semibold">
                      Kelas
                    </TableHead>
                    <TableHead className="text-center text-base font-semibold">
                      Tanggal
                    </TableHead>
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
                          {nilaiRataRata(item)}
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
