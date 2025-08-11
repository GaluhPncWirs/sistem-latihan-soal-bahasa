import { useConvertDate } from "@/app/hooks/getConvertDate";
import { useManageExamsData } from "@/app/hooks/getDataManageExams";
import { useGetIdTeacher } from "@/app/hooks/getIdTeacher";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { supabase } from "@/lib/supabase/data";
import { ChevronDownIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function ViewQuestions() {
  const [chooseClass, setChooseClass] = useState<any>([]);
  const [dates, setDates] = useState<(Date | undefined)[]>([]);
  const [fromTimes, setFromTimes] = useState<string[]>([]);
  const [toTimes, setToTimes] = useState<string[]>([]);
  const idTeacher = useGetIdTeacher();
  const viewQuestions = useManageExamsData(idTeacher);

  const tenggatWaktu = fromTimes.map(
    (time: any, i: any) => `${time} - ${toTimes[i]}`
  );

  const manipulateDate = dates.map((localDate: any) =>
    localDate?.toDateString()
  );
  async function managedExams() {
    const idExam = viewQuestions.map((item: any) => item.id);
    const dataPayload = idExam
      .map((item: any, i: number) => ({
        created_at: new Date().toISOString(),
        idExams: item,
        kelas: chooseClass[i],
        dibuat_tgl: manipulateDate[i],
        id_Teacher: idTeacher,
        tenggat_waktu: tenggatWaktu[i],
        isManageExam: true,
      }))
      .filter(
        (item: any) => item.kelas && item.dibuat_tgl && item.tenggat_waktu
      );

    if (dataPayload.length > 0) {
      const { error }: any = await supabase
        .from("managed_exams")
        .insert(dataPayload);
      if (error) {
        console.log("tidak bisa ditambahkan");
      } else {
        console.log("data berhasil di tambahkan");
      }
    }
  }

  async function handleDeleteExam(idExams: number) {
    const { error } = await supabase
      .from("exams")
      .delete()
      .eq("id", Number(idExams));

    if (error) {
      toast("Gagal ❌", {
        description: "Soal Gagal Dihapus",
      });
    } else {
      toast("Berhasil ✅", {
        description: "Soal Telah Berhasil Dihapus",
      });
    }
  }

  return (
    <div className="w-11/12 mx-auto">
      <h1 className="mb-7 text-2xl text-center font-semibold">
        Kelola Soal Ujian
      </h1>
      <Table>
        <TableHeader>
          <TableRow className="bg-[#3282B8]">
            <TableHead className="text-center text-base">No</TableHead>
            <TableHead className="text-center text-base">Nama Ujian</TableHead>
            <TableHead className="text-center text-base">
              Kirimkan Ke Kelas
            </TableHead>
            <TableHead className="text-center text-base">Waktu Ujian</TableHead>
            <TableHead className="text-center text-base">Kelola</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {viewQuestions.length > 0 ? (
            viewQuestions.map((data: any, i: number) => (
              <TableRow key={i}>
                <TableCell>{i + 1}</TableCell>
                <TableCell>{data.nama_ujian}</TableCell>
                <TableCell>
                  <Select
                    onValueChange={(val) =>
                      setChooseClass((prev: any) => {
                        const update = [...prev];
                        update[i] = val;
                        return update;
                      })
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Pilih kelas" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1A">1A</SelectItem>
                      <SelectItem value="2B">2B</SelectItem>
                      <SelectItem value="3A">3A</SelectItem>
                      <SelectItem value="4E">4E</SelectItem>
                      <SelectItem value="5A">5A</SelectItem>
                      <SelectItem value="2C">2C</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell>
                  <div className="flex gap-3 items-center">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline">
                          {dates[i] ? dates[i]?.toDateString() : "Pilih Tgl"}
                          <ChevronDownIcon />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto overflow-hidden p-0">
                        <Calendar
                          mode="single"
                          selected={dates[i]}
                          captionLayout="dropdown"
                          onSelect={(date) => {
                            const newDate = [...dates];
                            newDate[i] = date;
                            setDates(newDate);
                          }}
                        />
                      </PopoverContent>
                    </Popover>
                    <Input
                      type="time"
                      defaultValue={fromTimes[i] || "00:00"}
                      onChange={(e) => {
                        const newTime = [...fromTimes];
                        newTime[i] = e.currentTarget.value;
                        setFromTimes(newTime);
                      }}
                      className="p-2"
                    />
                    <Input
                      type="time"
                      defaultValue={toTimes[i] || "00:00"}
                      onChange={(e) => {
                        const newTime = [...toTimes];
                        newTime[i] = e.currentTarget.value;
                        setToTimes(newTime);
                      }}
                      className="p-2"
                    />
                  </div>
                </TableCell>
                <TableCell className="flex gap-3 justify-center">
                  <Link
                    href={`/Teacher/dashboard/manageExams?id=${data.id}`}
                    className="hover:bg-blue-500 bg-blue-400 px-5 py-2 rounded-md text-white"
                  >
                    Edit
                  </Link>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="destructive">Hapus</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Hapus Soal</DialogTitle>
                        <DialogDescription>
                          Apakah Anda Benar - Benar Ingin Menghapus Soal{" "}
                          <span className="font-bold">{`${data.nama_ujian}`}</span>{" "}
                          ini ?
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter>
                        <DialogClose asChild>
                          <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <DialogClose asChild>
                          <Button
                            variant="destructive"
                            className="cursor-pointer hover:bg-red-700"
                            onClick={() => handleDeleteExam(data.id)}
                          >
                            Hapus
                          </Button>
                        </DialogClose>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell className="text-center text-lg font-bold" colSpan={5}>
                Belum Ada Tugas Yang Dibuat
              </TableCell>
            </TableRow>
            // Array.from({ length: 5 }).map((_, i) => (
            //   <tr key={i}>
            //     <td className="bg-stone-300 px-4 py-6 animate-pulse w-1/12">
            //       <div className="h-4 bg-gray-500 rounded w-full mb-2"></div>
            //     </td>
            //     <td className="bg-stone-300 px-4 py-6 animate-pulse w-10/12">
            //       <div className="h-4 bg-gray-500 rounded w-11/12 mb-2"></div>
            //       <div className="h-4 bg-gray-500 rounded w-1/2 mb-2"></div>
            //     </td>
            //     <td className="bg-stone-300 px-4 py-6 animate-pulse w-10/12">
            //       <div className="h-4 bg-gray-500 rounded w-11/12 mb-2"></div>
            //       <div className="h-4 bg-gray-500 rounded w-1/2 mb-2"></div>
            //     </td>
            //     <td className="bg-stone-300 px-4 py-6 animate-pulse">
            //       <div className="h-4 bg-gray-500 rounded w-10/12 mb-2"></div>
            //       <div className="h-4 bg-gray-500 rounded w-11/12 mb-2"></div>
            //     </td>
            //     <td className="bg-stone-300 px-4 py-6 animate-pulse">
            //       <div className="h-4 bg-gray-500 rounded w-10/12 mb-2"></div>
            //       <div className="h-4 bg-gray-500 rounded w-11/12 mb-2"></div>
            //     </td>
            //   </tr>
            // ))
          )}
        </TableBody>
      </Table>
      <div className="mt-7">
        <Dialog>
          <DialogTrigger asChild>
            <Button className="text-base px-7 bg-[#3282B8] hover:bg-blue-800 cursor-pointer">
              Kirim
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle>Konfirmasi Soal</DialogTitle>
            <DialogDescription className="my-2 text-base max-w-10/12 mx-auto">
              Apakah Anda Sudah Benar - Benar Ingin Mengirimkan Soalnya Ke Siswa
              ?
            </DialogDescription>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Batal</Button>
              </DialogClose>
              <DialogClose asChild>
                <Button variant="default" onClick={managedExams}>
                  Ya Tentu
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
