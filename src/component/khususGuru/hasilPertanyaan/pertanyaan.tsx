import Link from "next/link";

export default function ViewQuestions() {
  return (
    <table className="border-collapse w-full">
      <thead>
        <tr className="bg-slate-500 border-2 border-black">
          <th className="text-slate-100 p-2">Pertanyaan</th>
          <th className="text-slate-100 p-2">Kelola</th>
        </tr>
      </thead>
      <tbody>
        <tr className="border-2 border-black">
          <td className="px-3 bg-stone-100">
            <h1>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. In magni
              harum, molestiae fuga enim odio culpa tempore alias
            </h1>
            <ul className="flex justify-around flex-wrap items-center my-2">
              <li>A. lorem</li>
              <li className="bg-blue-400 px-3 py-1 rounded-lg">B. Ipsum</li>
              <li>C. Dolor</li>
              <li>D. Amet</li>
            </ul>
          </td>
          <td className="bg-stone-300">
            <ul className="flex gap-3 flex-col justify-center items-center">
              <li className="text-blue-500 font-semibold hover:text-blue-600 hover:underline">
                <Link href="">Edit</Link>
              </li>
              <li className="text-blue-500 font-semibold hover:text-blue-600 hover:underline">
                <Link href="">Hapus</Link>
              </li>
            </ul>
          </td>
        </tr>
        <tr className="border-2 border-black">
          <td className="px-3 bg-stone-100">
            <h1>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. In magni
              harum, molestiae fuga enim odio culpa tempore alias Lorem ipsum
              dolor sit amet consectetur adipisicing elit.
            </h1>
            <ul className="flex justify-around flex-wrap items-center my-2">
              <li>A. lorem</li>
              <li>B. Ipsum</li>
              <li className="bg-blue-400 px-3 py-1 rounded-lg">C. Dolor</li>
              <li>D. Amet</li>
            </ul>
          </td>
          <td className="bg-stone-300">
            <ul className="flex gap-3 flex-col justify-center items-center">
              <li className="text-blue-500 font-semibold hover:text-blue-600 hover:underline">
                <Link href="">Edit</Link>
              </li>
              <li className="text-blue-500 font-semibold hover:text-blue-600 hover:underline">
                <Link href="">Hapus</Link>
              </li>
            </ul>
          </td>
        </tr>
        <tr className="border-2 border-black">
          <td className="px-3 bg-stone-100">
            <h1>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. In magni
              harum, molestiae fuga enim odio culpa tempore alias Lorem ipsum
              dolor sit amet consectetur adipisicing elit.
            </h1>
            <ul className="flex justify-around flex-wrap items-center my-2">
              <li>A. lorem</li>
              <li>B. Ipsum</li>
              <li className="bg-blue-400 px-3 py-1 rounded-lg">C. Dolor</li>
              <li>D. Amet</li>
            </ul>
          </td>
          <td className="bg-stone-300">
            <ul className="flex gap-3 flex-col justify-center items-center">
              <li className="text-blue-500 font-semibold hover:text-blue-600 hover:underline">
                <Link href="">Edit</Link>
              </li>
              <li className="text-blue-500 font-semibold hover:text-blue-600 hover:underline">
                <Link href="">Hapus</Link>
              </li>
            </ul>
          </td>
        </tr>
        <tr className="border-2 border-black">
          <td className="px-3 bg-stone-100">
            <h1>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. In magni
              harum, molestiae fuga enim odio culpa tempore alias Lorem ipsum
              dolor sit amet consectetur adipisicing elit.
            </h1>
            <ul className="flex justify-around flex-wrap items-center my-2">
              <li>A. lorem</li>
              <li>B. Ipsum</li>
              <li className="bg-blue-400 px-3 py-1 rounded-lg">C. Dolor</li>
              <li>D. Amet</li>
            </ul>
          </td>
          <td className="bg-stone-300">
            <ul className="flex gap-3 flex-col justify-center items-center">
              <li className="text-blue-500 font-semibold hover:text-blue-600 hover:underline">
                <Link href="">Edit</Link>
              </li>
              <li className="text-blue-500 font-semibold hover:text-blue-600 hover:underline">
                <Link href="">Hapus</Link>
              </li>
            </ul>
          </td>
        </tr>
      </tbody>
    </table>
  );
}
