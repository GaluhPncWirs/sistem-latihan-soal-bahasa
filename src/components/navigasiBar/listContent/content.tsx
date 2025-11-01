import Link from "next/link";

export default function ListContent() {
  return (
    <>
      <Link href="/" className="cursor-pointer font-semibold">
        <span className="text-xl">Beranda</span>
      </Link>
      <Link href="/HowToUse" className="cursor-pointer font-semibold">
        <span className="text-xl">Cara Pakai</span>
      </Link>
    </>
  );
}
