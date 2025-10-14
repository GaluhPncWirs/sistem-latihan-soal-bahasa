import { useConvertDate } from "@/app/hooks/getConvertDate";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import Image from "next/image";
import { useState } from "react";

export default function LayoutProfileUser({
  children,
  dataUser,
}: {
  children: React.ReactNode;
  dataUser: any;
}) {
  const [previewImgProfil, setPreviewImgProfil] = useState<string | null>(null);

  function handleChangeImgProfile(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setPreviewImgProfil(URL.createObjectURL(file));
    }
  }
  return (
    <div>
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
                src="/img/profileStudent/userProfile.png"
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
        {children}
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
              <TableCell className="text-base font-semibold">Email</TableCell>
              <TableCell className="text-base font-medium">
                {dataUser?.email}
              </TableCell>
            </TableRow>
            <TableRow className="border-black">
              <TableCell className="text-base font-semibold">
                No Telepon
              </TableCell>
              <TableCell className="text-base font-medium">
                {dataUser?.noTlp.match(/.{1,4}/g)?.join("-")}
              </TableCell>
            </TableRow>
            <TableRow className="border-black">
              <TableCell className="text-base font-semibold">
                Bergabung
              </TableCell>
              <TableCell className="text-base font-medium">
                {useConvertDate(dataUser?.created_at, {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </TableCell>
            </TableRow>
            <TableRow className="border-black">
              <TableCell className="text-base font-semibold">Peran</TableCell>
              <TableCell className="text-base font-medium">
                {dataUser?.role}
              </TableCell>
            </TableRow>
            <TableRow className="border-black">
              <TableCell className="text-base font-semibold">
                Status Akun
              </TableCell>
              <TableCell className="text-base font-medium">Aktif</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
