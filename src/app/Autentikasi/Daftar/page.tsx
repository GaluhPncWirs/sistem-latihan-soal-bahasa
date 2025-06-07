import LayoutFormAccount from "@/layout/formAccount";

export default function RegisterAccount() {
  return (
    <LayoutFormAccount formTitle={"Buat Akun"}>
      <form className="flex justify-center h-2/3">
        <div className="flex flex-col w-3/4 justify-around gap-3">
          <label
            htmlFor="fullname"
            className="text-xl font-semibold text-blue-500"
          >
            Fullname
          </label>
          <input
            type="text"
            id="fullname"
            placeholder="adamJobs@gmail.com"
            className="w-full rounded-md p-3 bg-blue-200"
          />
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
            className="bg-blue-300 rounded-md w-full py-1.5 my-3 hover:bg-blue-400 disabled:cursor-not-allowed cursor-pointer"
            type="submit"
          >
            Register
          </button>
        </div>
      </form>
    </LayoutFormAccount>
  );
}
