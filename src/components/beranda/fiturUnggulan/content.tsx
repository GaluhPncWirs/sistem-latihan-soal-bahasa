import Image from "next/image";

type propsFeature = {
  imgSrc: string;
  imgAlt: string;
  titleFeature: string;
  descFeature: string;
};

export default function CompFiturUnggulan(props: propsFeature) {
  const { imgSrc, imgAlt, titleFeature, descFeature } = props;

  return (
    <div className="max-w-2/3">
      <div className="w-full flex justify-center mb-4">
        <Image
          src={imgSrc}
          alt={imgAlt}
          width={200}
          height={200}
          className="size-12"
        />
      </div>
      <div className="shadow-lg shadow-slate-600">
        <h1 className="bg-blue-500 text-slate-200 px-5 py-3 rounded-t-lg text-center font-semibold text-lg">
          {titleFeature}
        </h1>
        <p className="py-4 px-5 bg-white rounded-b-lg">{descFeature}</p>
      </div>
    </div>
  );
}
