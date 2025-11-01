export default function CompAlurUjian({ children }: React.PropsWithChildren) {
  return (
    <div className="flex gap-x-5">
      <div className="w-10 flex justify-center">
        <div className="w-1 h-full bg-slate-700 flex flex-col items-center">
          <div className="w-3 h-3 rounded-full bg-[#0F4C75] mt-7"></div>
        </div>
      </div>
      <div className="w-10/12 mt-4">{children}</div>
    </div>
  );
}
