import Image from "next/image";

export default function Loading() {
  return (
    <div>
      <Image
        src="/img/footer/logo.png"
        alt="Loading"
        width={500}
        height={500}
      />
    </div>
  );
}
