import Image from "next/image";

export default function FiturUnggulan({
  imgSrc,
  imgAlt,
  children,
}: {
  imgSrc: string;
  imgAlt: string;
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-3/12 max-[640px]:max-w-2/3 sm:max-w-2/5 lg:max-w-2/6">
      <div className="w-full flex justify-center mb-4">
        <Image
          src={imgSrc}
          alt={imgAlt}
          width={200}
          height={200}
          className="sm:w-1/5 md:w-1/6 max-[640px]:w-1/6"
        />
      </div>
      {children}
    </div>
  );
}
