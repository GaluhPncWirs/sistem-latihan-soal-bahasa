import Image from "next/image";

export default function LayoutDasboard(props: any) {
  const { user, fullName } = props;
  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Dashboard {user}</h1>
        <div className="flex items-center justify-end gap-x-3">
          <Image
            src="/img/dashboardStudent/bell.png"
            alt="Notification"
            width={200}
            height={200}
            className="w-1/12"
          />
          <Image
            src="/img/profileStudent/userProfile.png"
            alt="Img Profile"
            width={200}
            height={200}
            className="w-1/6 rounded-full"
          />
        </div>
      </div>
      <div className="w-full h-1 bg-slate-700 rounded-lg mt-3" />
      <div className="mt-7 flex items-center gap-x-10">
        <Image
          src="/img/profileStudent/userProfile.png"
          alt="Img Profile"
          height={500}
          width={500}
          className="w-1/5 rounded-full"
        />
        <h1 className="text-3xl max-[640px]:text-2xl font-bold">
          Halo Selamat Datang,{" "}
          <span className="block capitalize mt-2">{fullName}</span>
        </h1>
      </div>
    </>
  );
}
