import LayoutFormAccount from "@/layout/formAccount";

export default function LoginAccount() {
  return (
    <LayoutFormAccount formTitle={"Login Akun"}>
      <form className="flex justify-center h-2/3">
        <div className="flex flex-col w-3/4 justify-around gap-3">
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
            className="w-full rounded-md p-3 bg-blue-200"
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
            className="w-full rounded-md p-3 bg-blue-200"
          />
          <button
            className="bg-blue-300 rounded-md w-full py-1.5 mt-3 hover:bg-blue-400 disabled:cursor-not-allowed cursor-pointer"
            type="submit"
          >
            Login
          </button>
        </div>
      </form>
      <div className="ml-10 mt-7 text-slate-700">
        <button>
          Masuk Dengan Akun{" "}
          <span className="font-semibold hover:underline text-blue-700 cursor-pointer">
            Google
          </span>
        </button>
      </div>
    </LayoutFormAccount>
  );
}
