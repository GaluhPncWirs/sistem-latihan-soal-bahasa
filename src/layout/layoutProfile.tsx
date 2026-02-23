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
import { useGetDataUsers } from "@/store/useGetDataUsers/state";
import Image from "next/image";
import { useState } from "react";

export default function LayoutProfileUser({
  children,
}: {
  children: React.ReactNode;
}) {
  const dataUser = useGetDataUsers((state) => state.dataUsers);
  const [previewImgProfil, setPreviewImgProfil] = useState<string | null>(null);

  function handleChangeImgProfile(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setPreviewImgProfil(URL.createObjectURL(file));
    }
  }
  return (
    <div>
      <div className="flex justify-center items-center gap-7 mb-10 flex-col sm:mb-5 sm:flex-row">
        <Dialog>
          <DialogTrigger asChild className="cursor-pointer">
            {previewImgProfil !== null ? (
              <Image
                src={previewImgProfil}
                alt="Profile User"
                width={300}
                height={300}
                className="rounded-full size-48"
              />
            ) : (
              <Image
                src="/img/global/userProfile.png"
                alt="Profile User"
                width={300}
                height={300}
                className="rounded-full size-48"
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
            src="/img/global/account.png"
            alt="Informasi Akun"
            width={200}
            height={200}
            className="size-8"
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
                {useConvertDate(dataUser!.created_at, {
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
