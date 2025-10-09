export default function SkeletonResultExams() {
  return (
    <div>
      <div className="h-10 w-1/3 bg-slate-500 rounded-md animate-pulse"></div>
      <div className="h-1 bg-slate-500 rounded-lg my-3 animate-pulse" />
      <div className="w-1/4 bg-slate-500 rounded-md h-8 animate-pulse mb-5"></div>
      {Array.from({ length: 5 }).map((_: any, i: number) => (
        <div
          className="grid lg:grid-cols-2 gap-3 max-[640px]:grid-cols-1 sm:grid-cols-1"
          key={i}
        >
          <div className="bg-slate-500 w-full p-5 h-52 rounded-md mb-5 animate-pulse ">
            <div className="w-10/12 bg-slate-400 animate-pulse h-5 rounded-sm mb-5"></div>
            <div className="w-1/6 bg-slate-400 animate-pulse h-5 rounded-sm mb-3"></div>
            <div className="w-full bg-slate-400 animate-pulse h-24 rounded-md"></div>
          </div>
          <div className="bg-slate-500 w-full p-5 h-52 rounded-md mb-5 animate-pulse ">
            <div className="w-10/12 bg-slate-400 animate-pulse h-5 rounded-sm mb-5"></div>
            <div className="w-1/6 bg-slate-400 animate-pulse h-5 rounded-sm mb-3"></div>
            <div className="w-full bg-slate-400 animate-pulse h-24 rounded-md"></div>
          </div>
        </div>
      ))}
      <div className="h-10 w-1/12 bg-slate-500 rounded-md animate-pulse mt-3"></div>
    </div>
  );
}
