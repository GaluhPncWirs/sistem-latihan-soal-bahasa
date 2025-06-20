export default function LayoutModalBox({ children }: any) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-30">
      <div className="bg-blue-400 absolute w-1/4 h-40 rounded-xl max-h-[80vh] pt-2 top-1/2 left-1/2 z-40 -translate-x-1/2 -translate-y-1/2 max-[640px]:w-9/12 sm:w-3/5 md:w-1/2 lg:w-1/3 flex justify-evenly items-center flex-col ">
        {children}
      </div>
    </div>
  );
}
