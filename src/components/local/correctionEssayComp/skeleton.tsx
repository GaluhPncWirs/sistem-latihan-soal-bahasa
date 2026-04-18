export default function SkeletonCorrectionEssay() {
  return (
    <div>
      <div className="w-1/3 h-10 bg-slate-500 animate-pulse rounded-md"></div>
      <div className="h-1 bg-slate-500 animate-pulse rounded-md my-3" />
      <div className="w-1/2 h-7 bg-slate-500 animate-pulse rounded-md mb-7"></div>
      <div>
        {Array.from({ length: 5 }).map((_: any, i: any) => (
          <div
            className="mt-5 bg-slate-500 animate-pulse rounded-lg p-5 mr-3 max-[640px]:w-full sm:w-full md:w-auto flex max-[640px]:gap-5 sm:gap-5 md:gap-10 items-center max-[640px]:flex-col sm:flex-col md:flex-row"
            key={i}
          >
            <div className="max-[640px]:w-full sm:w-11/12 md:basis-1/2 lg:basis-2/3">
              <div className="h-16 bg-slate-400 animate-pulse rounded-md"></div>
              <div className="mt-4">
                <div className="mb-2 w-1/6 bg-slate-400 animate-pulse rounded-md h-6"></div>
                <div className="h-20 bg-slate-400 animate-pulse rounded-md"></div>
              </div>
            </div>

            <div className="max-[640px]:w-full sm:w-11/12 md:basis-1/2 lg:basis-2/5">
              <div className="w-1/3 h-5 bg-slate-400 animate-pulse rounded-md"></div>
              <div className="flex justify-evenly items-center my-3 gap-2 bg-slate-400 animate-pulse rounded-md p-1.5">
                <div className="h-7 w-1/6 bg-slate-500 animate-pulse rounded-md"></div>
                <div className="h-7 w-1/6 bg-slate-500 animate-pulse rounded-md"></div>
                <div className="h-7 w-1/6 bg-slate-500 animate-pulse rounded-md"></div>
                <div className="h-7 w-1/6 bg-slate-500 animate-pulse rounded-md"></div>
              </div>
              <div>
                <h1 className="w-1/4 h-5 bg-slate-400 animate-pulse rounded-md"></h1>
                <ul className="flex justify-evenly items-center mt-3">
                  <li className="bg-slate-400 animate-pulse rounded-md w-1/5 h-7"></li>
                  <li className="bg-slate-400 animate-pulse rounded-md w-1/5 h-7"></li>
                  <li className="bg-slate-400 animate-pulse rounded-md w-1/5 h-7"></li>
                  <li className="bg-slate-400 animate-pulse rounded-md w-1/5 h-7"></li>
                </ul>
              </div>
            </div>
          </div>
        ))}
        <div className="flex justify-between mt-7">
          <div className="w-1/6 h-8 bg-slate-500 animate-pulse rounded-md"></div>
          <div className="w-1/6 h-8 bg-slate-500 animate-pulse rounded-md"></div>
        </div>
      </div>
    </div>
  );
}
