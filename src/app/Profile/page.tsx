import NavigasiBar from "@/component/navigasiBar/navbar";
import Image from "next/image";
import Link from "next/link";

export default function Profil() {
  return (
    <div>
      <NavigasiBar />
      <div className="w-9/12 mx-auto flex justify-center mt-16">
        <div className="w-1/2 bg-sky-600 h-3/4 shadow-md shadow-slate-600 pb-5">
          <h1 className="font-semibold text-xl text-center my-1.5">
            Your Profile
          </h1>
          <div className="flex">
            <div className="basis-1/3">
              <Image
                src="/img/profile/userProfile.png"
                alt="Profile"
                width={500}
                height={500}
                className="w-full"
              />
            </div>
            <ul className="tracking-wide font-semibold basis-2/3 flex flex-col bg-slate-200 justify-center pl-7">
              <li>
                id : <span className="font-bold">143</span>
              </li>
              <li>
                Nama : <span className="font-bold">reolem ipsum</span>
              </li>
              <li>
                Kelas : <span className="font-bold">4A</span>
              </li>
            </ul>
          </div>
          <div className="overflow-auto h-40 p-3">
            <h1>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit
              beatae error quisquam temporibus itaque illum quibusdam
              consequatur sapiente quia praesentium expedita dolore delectus
              accusamus, quod aperiam reprehenderit fugit quo quidem?
            </h1>
          </div>
          <Link
            className="bg-slate-300 px-10 py-1.5 rounded-md ml-5"
            href="/Student"
          >
            Back
          </Link>
        </div>
      </div>
    </div>
  );
}
