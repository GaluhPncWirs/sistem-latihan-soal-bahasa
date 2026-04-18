export default function SkeletonExam() {
  return (
    <>
      {/* nav skeleton */}
      <div className="hidden md:block md:static md:w-1/3">
        {/* background panel */}
        <div className="bg-[#476EAE] fixed h-screen shadow-xl shadow-slate-700 flex flex-col items-center text-slate-200 font-medium text-xl md:w-1/3">
          <div className="mt-3 p-5 w-full">
            {/* title */}
            <div className="h-8 bg-slate-300 rounded-md animate-pulse mb-3 w-3/4" />

            {/* exam type & timer */}
            <div className="flex items-center justify-around mt-3">
              <div className="h-6 bg-slate-300 rounded-md animate-pulse w-1/3" />
              <div className="h-6 bg-slate-300 rounded-md animate-pulse w-1/4" />
            </div>

            {/* question grid */}
            <div className="mt-7 flex flex-wrap gap-2 rounded-md">
              {Array.from({ length: 20 }).map((_, i) => (
                <div
                  className="size-10 rounded-md bg-slate-300 animate-pulse"
                  key={i}
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* content skeleton */}
      <div className="bg-slate-50 rounded-md p-7 mx-auto w-11/12 md:w-3/5 my-7">
        {/* title placeholder */}
        <div className="h-8 bg-slate-400 rounded w-1/2 mb-3 animate-pulse" />
        <div className="h-1 bg-slate-400 rounded-lg mt-3 mb-7 animate-pulse" />

        <div className="flex justify-between items-center flex-col md:items-start md:flex-row-reverse md:gap-x-5">
          <div className="w-full">
            {Array.from({ length: 3 }).map((_, i) => (
              <div className="mb-5" key={i}>
                <div className="h-6 bg-slate-400 rounded mb-2 animate-pulse" />
                <ul className="mt-3 space-y-2">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <li className="flex items-center gap-3" key={j}>
                      <div className="h-5 w-5 bg-slate-400 rounded animate-pulse" />
                      <div className="h-5 bg-slate-400 rounded w-3/4 animate-pulse" />
                    </li>
                  ))}
                </ul>
                <div className="h-8 w-20 bg-slate-400 rounded mt-3 animate-pulse" />
              </div>
            ))}
          </div>
        </div>

        {/* finish button placeholder */}
        <div className="mt-5">
          <div className="h-10 w-32 bg-slate-400 rounded animate-pulse" />
        </div>
      </div>
    </>
  );
}
