export default function SkeletonExam() {
  return (
    <div>
      <div>
        <div className="w-11/12 mx-auto mb-3">
          <div className="h-10 w-1/3 bg-slate-500 animate-pulse rounded-md"></div>
        </div>
        <div className="w-11/12 h-1 bg-slate-500 animate-pulse rounded-md my-3 mx-auto" />
      </div>

      <div className="flex items-center justify-center md:gap-x-3 max-[640px]:flex-col sm:flex-col md:flex-row-reverse">
        <div className="max-[640px]:w-11/12 sm:w-10/12 md:basis-2/5 lg:basis-[30%] flex justify-center">
          <div className="h-fit bg-slate-500 animate-pulse rounded-md fixed p-5 max-[640px]:w-full sm:w-11/12 max-[640px]:top-0 sm:top-0 md:top-1/4 md:w-2/5 lg:w-[30%]">
            <div className="flex items-center max-[640px]:justify-around sm:justify-around">
              <div className="h-8 w-1/3 bg-slate-400 rounded-md"></div>
              <div className="bg-slate-400 rounded-md w-1/5 h-8"></div>
            </div>

            <div className="bg-slate-400 rounded-md mt-5 flex flex-wrap gap-2.5 justify-center items-center py-5 px-3">
              {Array.from({ length: 20 }).map((_: any, i: number) => (
                <div
                  className="bg-slate-500 animate-pulse rounded-md h-10 w-10"
                  key={i}
                ></div>
              ))}
            </div>
          </div>
        </div>

        <div className="max-[640px]:w-11/12 sm:w-10/12 md:basis-1/2 lg:basis-[60%]">
          {Array.from({ length: 3 }).map((_: any, i: number) => (
            <div
              className="mt-4 bg-slate-500 animate-pulse rounded-md p-5 mr-3 max-[640px]:w-full sm:w-full md:w-auto"
              key={i}
            >
              <div className="bg-slate-400 rounded-md h-6 w-3/4"></div>
              <ul className="mt-5">
                <li className="flex gap-4 flex-col">
                  <div className="bg-slate-400 rounded-md h-5 w-1/4"></div>
                  <div className="bg-slate-400 rounded-md h-5 w-1/3"></div>
                  <div className="bg-slate-400 rounded-md h-5 w-1/6"></div>
                  <div className="bg-slate-400 rounded-md h-5 w-1/2"></div>
                  <div className="bg-slate-400 rounded-md h-5 w-1/5"></div>
                </li>
                <div className="bg-slate-400 rounded-md mt-5 h-8 w-1/6"></div>
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-7 max-[640px]:mx-5 sm:mx-7 md:mx-10">
        <div className="bg-slate-500 animate-pulse rounded-md w-1/12 h-10"></div>
      </div>

      <div className="bg-slate-400 h-12 w-12 rounded-full fixed bottom-7 right-7 md:hidden flex justify-center items-center">
        <div className="bg-slate-500 animate-pulse rounded-md w-5 h-5 "></div>
      </div>
    </div>
  );
}
