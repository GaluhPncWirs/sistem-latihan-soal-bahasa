import Image from "next/image";

export default function CompFiturUnggulan({
  imgSrc,
  imgAlt,
  children,
}: {
  imgSrc: string;
  imgAlt: string;
  children: React.ReactNode;
}) {
  return (
    <div className="max-[640px]:max-w-2/3 sm:max-w-2/5">
      <div className="w-full flex justify-center mb-4">
        <Image
          src={imgSrc}
          alt={imgAlt}
          width={200}
          height={200}
          className="sm:w-1/5 md:w-1/6 max-[640px]:w-1/6"
        />
      </div>
      <div className="shadow-lg shadow-slate-600">{children}</div>
    </div>
  );
}
