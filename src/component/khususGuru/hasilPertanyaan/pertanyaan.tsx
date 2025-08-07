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
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function ViewQuestions() {
  const [viewQuestions, setViewQuestions] = useState<any>([]);

  useEffect(() => {
    async function handleViewQuestions() {
      const { data: examsCollections, error: examsError } = await supabase
        .from("exams")
        .select("*");
      const { data: classCollections, error: classError } = await supabase
        .from("choose_class")
        .select("*");
      if (examsError || classError) {
        toast("Gagal ❌", {
          description: "data gagal ditampilkan:",
        });
      }

      const mergeDatas = examsCollections?.map((item: any) => {
        const chooseClass = classCollections?.find(
          (f: any) => f.exam_id === item.id
        );
        return {
          ...item,
          kelas: chooseClass?.kelas ?? null,
          status: chooseClass?.status ?? false,
        };
      });
      setViewQuestions(mergeDatas);
    }
    handleViewQuestions();
  }, []);

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
      <Table>
        <TableHeader>
          <TableRow className="bg-[#3282B8]">
            <TableHead className="text-center text-base">No</TableHead>
            <TableHead className="text-center text-base">Nama Ujian</TableHead>
            <TableHead className="text-center text-base">
              Kirimkan Ke Kelas
            </TableHead>
            <TableHead className="text-center text-base">Kelola</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {viewQuestions.length > 0
            ? viewQuestions.map((data: any, i: number) => (
                <TableRow key={i}>
                  <TableCell>{i + 1}</TableCell>
                  <TableCell className="w-1/2">{data.nama_ujian}</TableCell>
                  <TableCell>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih kelas" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value={data.kelas}>{data.kelas}</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell className="flex gap-3">
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
            : Array.from({ length: 5 }).map((_, i) => (
                <tr key={i}>
                  <td className="bg-stone-300 px-4 py-6 animate-pulse w-1/12">
                    <div className="h-4 bg-gray-500 rounded w-full mb-2"></div>
                  </td>
                  <td className="bg-stone-300 px-4 py-6 animate-pulse w-10/12">
                    <div className="h-4 bg-gray-500 rounded w-11/12 mb-2"></div>
                    <div className="h-4 bg-gray-500 rounded w-1/2 mb-2"></div>
                  </td>
                  <td className="bg-stone-300 px-4 py-6 animate-pulse">
                    <div className="h-4 bg-gray-500 rounded w-10/12 mb-2"></div>
                    <div className="h-4 bg-gray-500 rounded w-11/12 mb-2"></div>
                  </td>
                </tr>
              ))}
        </TableBody>
      </Table>
    </div>
  );
}
