import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-slate-300 h-screen flex justify-center items-center">
      <div className="bg-slate-200 w-2/5 h-3/5 rounded-xl shadow-lg shadow-slate-400">
        <h1 className="text-3xl font-bold text-blue-500 text-center mt-6 mb-4">
          Login Akun
        </h1>
        <form className="flex justify-center h-2/3">
          <div className="flex flex-col w-3/4 justify-around">
            <label
              htmlFor="email"
              className="text-xl font-semibold text-blue-500"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="adamJobs@gmail.com"
              className="w-full rounded-md p-3"
            />
            <label
              htmlFor="password"
              className="text-xl font-semibold text-blue-500"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="**********"
              className="w-full rounded-md p-3"
            />
            <button
              className="bg-amber-400 rounded-md w-full mt-3 hover:bg-amber-500 h-10 disabled:cursor-not-allowed"
              type="submit"
            >
              Login
            </button>
          </div>
        </form>
        <div className="ml-10 mt-2.5 text-slate-700">
          <button>
            Masuk Dengan Akun{" "}
            <span className="font-semibold hover:underline text-blue-700 cursor-pointer">
              Google
            </span>
          </button>
        </div>
        <div className="mt-10 text-center">
          <p>
            Belum Punya Akun ?{" "}
            <Link
              href="#"
              className="font-semibold text-blue-700 hover:underline"
            >
              Register
            </Link>{" "}
          </p>
        </div>
      </div>
    </div>
  );
}
