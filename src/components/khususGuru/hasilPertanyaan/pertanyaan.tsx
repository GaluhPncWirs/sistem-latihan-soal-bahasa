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
  const [chooseTimeExam, setChooseTimeExam] = useState<any>([]);
  const [dates, setDates] = useState<(Date | undefined)[]>([]);
  const [fromTimes, setFromTimes] = useState<string[]>([]);
  const [toTimes, setToTimes] = useState<string[]>([]);
  const idTeacher = useGetIdTeacher();
  const viewManageQuestionsExam = useManageExamsData(idTeacher);
  const tenggatWaktu = fromTimes.map(
    (time: any, i: any) => `${time} - ${toTimes[i]}`
  );

  const manipulateDate = dates.map((localDate: any) => {
    return new Date(localDate).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  });

  async function managedExams() {
    const idExam = viewManageQuestionsExam.map((item: any) => item.id);
    const dataPayload = idExam
      .map((item: any, i: number) => ({
        created_at: new Date().toISOString(),
        idExams: item,
        kelas: chooseClass[i],
        dibuat_tgl: manipulateDate[i],
        id_Teacher: idTeacher,
        tenggat_waktu: tenggatWaktu[i],
        exam_duration: Number(chooseTimeExam[i]),
        isManageExam: true,
        tipe_ujian: item.tipeUjian === "pg" ? "pg" : "essay",
      }))
      .filter(
        (item: any) =>
          item.kelas &&
          item.dibuat_tgl &&
          item.tenggat_waktu &&
          item.exam_duration
      );

    if (dataPayload.length > 0) {
      const { error }: any = await supabase
        .from("managed_exams")
        .insert(dataPayload);
      if (error) {
        console.log("tidak bisa ditambahkan");
      } else {
        toast("Berhasil ✅", {
          description: "Soal Berhasil Dikirimkan",
        });
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
    <div>
      <h1 className="mb-7 text-2xl font-semibold">Daftar Soal Ujian</h1>
      <Table>
        <TableHeader>
          <TableRow className="bg-[#3282B8]">
            <TableHead className="text-center text-base">No</TableHead>
            <TableHead className="text-center text-base">Nama Ujian</TableHead>
            <TableHead className="text-center text-base">
              Kirim Ke Kelas
            </TableHead>
            <TableHead className="text-center text-base">Batas Ujian</TableHead>
            <TableHead className="text-center text-base">Waktu Ujian</TableHead>
            <TableHead className="text-center text-base">Kelola</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {viewManageQuestionsExam.length > 0 ? (
            viewManageQuestionsExam.map((data: any, i: number) => (
              <TableRow key={i}>
                <TableCell>{i + 1}</TableCell>
                <TableCell>{data.nama_ujian}</TableCell>
                <TableCell>
                  <Select
                    onValueChange={(val) =>
                      setChooseClass((prev: any) => {
                        const updateClass = [...prev];
                        updateClass[i] = val;
                        return updateClass;
                      })
                    }
                  >
                    <SelectTrigger>
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
                      className="p-2 w-1/3 flex justify-center"
                    />
                    <Input
                      type="time"
                      defaultValue={toTimes[i] || "00:00"}
                      onChange={(e) => {
                        const newTime = [...toTimes];
                        newTime[i] = e.currentTarget.value;
                        setToTimes(newTime);
                      }}
                      className="p-2 w-1/3 flex justify-center"
                    />
                  </div>
                </TableCell>
                <TableCell>
                  <Select
                    onValueChange={(val) =>
                      setChooseTimeExam((prev: any) => {
                        const updateTime = [...prev];
                        updateTime[i] = val;
                        return updateTime;
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Tentukan" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="600">10 Menit</SelectItem>
                      <SelectItem value="900">15 Menit</SelectItem>
                      <SelectItem value="1200">20 Menit</SelectItem>
                      <SelectItem value="1500">25 Menit</SelectItem>
                      <SelectItem value="1800">30 Menit</SelectItem>
                      <SelectItem value="2400">40 Menit</SelectItem>
                      <SelectItem value="2700">45 Menit</SelectItem>
                      <SelectItem value="3000">50 Menit</SelectItem>
                      <SelectItem value="3600">60 Menit</SelectItem>
                    </SelectContent>
                  </Select>
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
                      <Button
                        variant="destructive"
                        className="cursor-pointer hover:bg-red-500"
                      >
                        Hapus
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Hapus Soal</DialogTitle>
                        <DialogDescription>
                          Apakah Anda Benar - Benar Ingin Menghapus Soal{" "}
                          <span className="font-bold">{data.nama_ujian}</span>{" "}
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
              <TableCell
                colSpan={6}
                className="text-center text-lg font-semibold"
              >
                Belum Ada Soal Ujian Yang Dibuat
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="mt-7">
        <Dialog>
          <DialogTrigger asChild>
            <Button className="text-base px-7 bg-[#3282B8] hover:bg-blue-500 cursor-pointer">
              Kirim
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle>Konfirmasi Soal</DialogTitle>
            <DialogDescription className="my-2 text-base max-w-11/12 mx-auto">
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
