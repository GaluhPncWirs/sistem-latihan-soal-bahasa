import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { supabase } from "@/lib/supabase/data";
import { useEffect, useState } from "react";

export default function ManageStudent() {
  const [dataStudents, setDataStudents] = useState<any>([]);

  useEffect(() => {
    async function getDataStudent() {
      const { data, error } = await supabase
        .from("account-student")
        .select("fullName,classes,idStudent,email");
      setDataStudents(data);
      if (error) {
        console.log("data gagal diambil");
      }
    }
    getDataStudent();
  }, []);

  return (
    <Table>
      <TableHeader>
        <TableRow className="bg-[#3282B8]">
          <TableHead className="text-center text-base">No</TableHead>
          <TableHead className="text-center text-base">Nama Siswa</TableHead>
          <TableHead className="text-center text-base">Email</TableHead>
          <TableHead className="text-center text-base">Kelas</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {dataStudents.length > 0 ? (
          dataStudents.map((data: any, i: number) => (
            <TableRow key={i}>
              <TableCell>{i + 1}</TableCell>
              <TableCell>{data.fullName}</TableCell>
              <TableCell>{data.email}</TableCell>
              <TableCell>{data.classes}</TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell className="text-center text-lg font-bold" colSpan={4}>
              Belum Ada Tugas Yang Dibuat
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
