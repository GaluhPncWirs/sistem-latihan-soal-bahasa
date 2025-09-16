"use client";
import Image from "next/image";
import Link from "next/link";
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
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function Profil() {
  const idSiswa = useGetIdStudent();
  const dataStudent = useGetDataStudent(idSiswa);
  const [historyStudent, setHistoryStudent] = useState([]);

  useEffect(() => {
    if (!idSiswa) return;
    async function getHistoryStudent() {
      const { data, error }: any = await supabase
        .from("history-exam-student")
        .select("*, exams (nama_ujian)")
        .eq("student_id", idSiswa);
      if (error) {
        console.log("gagal di tampilkan");
      }
      setHistoryStudent(data);
    }

    getHistoryStudent();
  }, [idSiswa]);

  async function handleEditProfileStudent(event: any) {
    event.preventDefault();
    const idInputPayload = ["nama", "email", "changePassword"];
    const payloadUser = idInputPayload.map(
      (id: any) => event.target[id].value || ""
    );
    const resultPayload = payloadUser.reduce(
      (acc: any, cur: any, i: number) => {
        const isPayload = payloadUser[i];
        if (!isPayload) {
          acc[cur] = isPayload;
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
      <div className="pt-16 flex max-[640px]:flex-col max-[640px]:gap-0 sm:flex-col sm:gap-0 lg:gap-10 md:flex-row">
        <div className="md:bg-[#71C9CE] md:bg-gradient-to-t md:to-[#08D9D6] px-7 pt-10 pb-7 md:basis-[28%] lg:basis-1/4 flex flex-col items-center justify-center">
          <Dialog>
            <DialogTrigger asChild className="cursor-pointer">
              <Image
                src="/img/profile/userProfile.png"
                alt="Profile User"
                width={300}
                height={300}
                className="rounded-full max-[640px]:w-1/3 sm:w-1/4 md:w-1/3 lg:w-1/2 mb-3"
              />
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Ubah Foto Profil</DialogTitle>
                <div className="mt-3">
                  <Input type="file" accept="image/*" id="imgProfil" />
                </div>
              </DialogHeader>
            </DialogContent>
          </Dialog>
          <Table>
            <TableBody>
              <TableRow className="border-black">
                <TableCell className="text-base font-medium">Nama</TableCell>
                <TableCell className="text-base font-medium">
                  {dataStudent?.fullName || ""}
                </TableCell>
              </TableRow>
              <TableRow className="border-black">
                <TableCell className="text-base font-medium">NIS</TableCell>
                <TableCell className="text-base font-medium">
                  {" "}
                  {dataStudent?.nis || ""}
                </TableCell>
              </TableRow>
              <TableRow className="border-black">
                <TableCell className="text-base font-medium">Kelas</TableCell>
                <TableCell className="text-base font-medium">
                  {dataStudent?.classes || ""}
                </TableCell>
              </TableRow>
              <TableRow className="border-black">
                <TableCell className="text-base font-medium">Email</TableCell>
                <TableCell className="text-base font-medium">
                  {dataStudent?.email || ""}
                </TableCell>
              </TableRow>
              <TableRow className="border-black">
                <TableCell className="text-base font-medium">
                  Bergabung
                </TableCell>
                <TableCell className="text-base font-medium">
                  {useConvertDate(dataStudent?.created_at, {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <Dialog>
            <div className="max-[640px]:w-full sm:w-full md:w-fit">
              <DialogTrigger asChild>
                <Button className="cursor-pointer mt-7">Edit Profile</Button>
              </DialogTrigger>
              <DialogContent>
                <form
                  className="grid gap-5"
                  onSubmit={(event) => handleEditProfileStudent(event)}
                >
                  <DialogHeader className="text-start">
                    <DialogTitle className="text-xl">Edit Profile</DialogTitle>
                    <DialogDescription className="mt-1">
                      Edit Seluruh Informasi Profil Kamu Disini
                    </DialogDescription>
                    <div>
                      <label htmlFor="nama" className="mb-2 block">
                        Nama
                      </label>
                      <Input id="nama" />
                    </div>
                    <div>
                      <label htmlFor="email" className="mb-2 block">
                        Email
                      </label>
                      <Input type="email" id="email" />
                    </div>
                    <div>
                      <label htmlFor="changePassword" className="mb-2 block">
                        Ubah Password
                      </label>
                      <Input type="password" id="changePassword" />
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
            </div>
          </Dialog>
        </div>
        <div className="max-[640px]:mt-10 sm:mt-10 md:mt-16 md:basis-2/3">
          <div className="max-[640px]:w-11/12 sm:w-10/12 mx-auto md:w-11/12 lg:w-full max-[640px]:mb-7">
            <h1 className="text-3xl font-bold">Profil Siswa</h1>
            <div className="flex justify-evenly items-center my-10">
              <div className="bg-red-300 p-5 rounded-lg">
                <h1 className="font-semibold mb-1">Ujian Diselesaikan</h1>
                <p className="text-2xl font-bold">3</p>
              </div>
              <div className="bg-red-300 p-5 rounded-lg">
                <h1 className="font-semibold mb-1">Rata-Rata Nilai</h1>
                <p className="text-2xl font-bold">88.5</p>
              </div>
              <div className="bg-red-300 p-5 rounded-lg">
                <h1 className="font-semibold mb-1">Peringkat</h1>
                <p className="text-2xl font-bold">3 / 20</p>
              </div>
            </div>
            <div>
              <h1 className="mb-7 text-center text-2xl font-semibold">
                Riwayat Ujian
              </h1>
              <Table>
                <TableHeader>
                  <TableRow className="bg-[#3282B8]">
                    <TableHead>No</TableHead>
                    <TableHead>Nama Ujian</TableHead>
                    <TableHead>Tanggal</TableHead>
                    <TableHead>Nilai</TableHead>
                    <TableHead>Status</TableHead>
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
        </div>
      </div>
    </LayoutBodyContent>
  );
}
