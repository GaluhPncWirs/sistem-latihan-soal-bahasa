export default function SkeletonManageExams() {
  return (
    <div>
      <div className="bg-slate-500 animate-pulse h-10 w-1/3 rounded-md"></div>
      <div className="h-1 bg-slate-500 animate-pulse rounded-lg mt-3" />
      <div className="w-1/2 h-10 bg-slate-500 animate-pulse rounded-md mt-5 mb-7"></div>
      <div>
        {Array.from({ length: 10 }).map((_: any, i: number) => (
          <div
            className="w-full h-8 bg-slate-500 animate-pulse rounded-md mb-3"
            key={i}
          ></div>
        ))}
      </div>
      <div className="mt-8 w-1/6 h-10 bg-slate-500 animate-pulse rounded-md"></div>
    </div>
  );
}
