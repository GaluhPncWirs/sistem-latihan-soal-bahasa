import Image from "next/image";
import Link from "next/link";

export default function FooterComponent() {
  return (
    <div className="bg-[#00ADB5]">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="absolute"
        viewBox="0 0 1440 320"
      >
        <path
          fill="#71C9CE"
          fillOpacity="1"
          d="M0,256L34.3,224C68.6,192,137,128,206,133.3C274.3,139,343,213,411,234.7C480,256,549,224,617,224C685.7,224,754,256,823,250.7C891.4,245,960,203,1029,170.7C1097.1,139,1166,117,1234,122.7C1302.9,128,1371,160,1406,176L1440,192L1440,0L1405.7,0C1371.4,0,1303,0,1234,0C1165.7,0,1097,0,1029,0C960,0,891,0,823,0C754.3,0,686,0,617,0C548.6,0,480,0,411,0C342.9,0,274,0,206,0C137.1,0,69,0,34,0L0,0Z"
        ></path>
      </svg>

      <div className="max-[640px]:pt-36 sm:pt-44 md:pt-52 lg:pt-64 grid pb-10 w-10/12 gap-10 mx-auto max-[640px]:grid-cols-1 sm:grid-cols-1 md:grid-cols-2">
        <div>
          <Image
            src="/img/global/logo.png"
            alt="Logo"
            width={500}
            height={500}
            className="w-72"
          />
          <p className="mt-2 font-semibold text-xl">
            Ujian Tanpa Ribet, Hasil Lebih Akurat
          </p>
        </div>

        <div>
          <div className="flex items-center gap-x-2">
            <Image
              className="size-10"
              src="/img/footer/support.png"
              alt="Jam Kerja"
              width={300}
              height={300}
            />
            <span className="font-bold text-2xl xl:text-3xl">
              Kontak & Dukungan
            </span>
          </div>
          <ul className="mt-3 text-lg">
            <li>
              Email :{" "}
              <Link
                href="mailto:loremipsum@gmail.com"
                className="hover:underline"
              >
                loremipsum@gmail.com
              </Link>
            </li>
            <li>No Telepon : 0898-2364-8262</li>
            <Link href="#">Help / FAQ</Link>
          </ul>
        </div>

        <div>
          <div className="flex items-center gap-x-2">
            <Image
              className="size-10"
              src="/img/footer/location.png"
              alt="Alamat"
              width={300}
              height={300}
            />
            <span className="font-bold text-2xl xl:text-3xl">Alamat</span>
          </div>
          <p className="mt-3 text-lg text-justify">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Saepe
            consectetur dolorum, magni dolores placeat
          </p>
        </div>

        <div>
          <div className="flex items-center gap-x-2">
            <Image
              className="size-10"
              src="/img/footer/follow.png"
              alt="Follow"
              width={300}
              height={300}
            />
            <span className="font-bold text-2xl xl:text-3xl">Follow Us</span>
          </div>
          <div className="flex flex-wrap mt-3 gap-5 text-lg">
            <Link
              href="#"
              className="flex items-center gap-3 grayscale-100 hover:grayscale-0 cursor-pointer transition-all"
            >
              <Image
                src="/img/footer/instagram.png"
                alt="instagram"
                width={200}
                height={200}
                className="size-10"
              />
              <span>Instagram</span>
            </Link>
            <Link
              href="#"
              className="flex items-center gap-3 grayscale-100 hover:grayscale-0 cursor-pointer transition-all"
            >
              <Image
                src="/img/footer/linkedin.png"
                alt="linkedin"
                width={200}
                height={200}
                className="size-10"
              />
              <span>Linkedin</span>
            </Link>
            <Link
              href="#"
              className="flex items-center gap-3 grayscale-100 hover:grayscale-0 cursor-pointer transition-all"
            >
              <Image
                src="/img/footer/facebook.png"
                alt="facebook"
                width={200}
                height={200}
                className="size-10"
              />
              <span>Facebook</span>
            </Link>
            <Link
              href="#"
              className="flex items-center gap-3 grayscale-100 hover:grayscale-0 cursor-pointer transition-all"
            >
              <Image
                src="/img/footer/tiktok.png"
                alt="tiktok"
                width={200}
                height={200}
                className="size-10"
              />
              <span>Tiktok</span>
            </Link>
          </div>
        </div>
      </div>

      <div>
        <hr className="rounded-full border border-white mx-10" />
        <h1 className="py-5 w-10/12 mx-auto font-semibold">
          <span>&copy;</span> Copyright{" "}
          <span className="text-[#E3FDFD] font-medium">
            {new Date(Date.now()).getFullYear()}
          </span>{" "}
          Galuh panca wirasa rights reserved.
        </h1>
      </div>
    </div>
  );
}
