import Link from "next/link";

export default function ListContent() {
  return (
    <>
      <Link
        href="/Introduction"
        className="cursor-pointer font-semibold hover:text-slate-600"
      >
        <span className="text-xl">Beranda</span>
      </Link>
      <Link
        href="/HowToUse"
        className="cursor-pointer font-semibold hover:text-slate-600"
      >
        <span className="text-xl">Cara Pakai</span>
      </Link>
    </>
  );
}
