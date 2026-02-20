import { Input } from "../ui/input";
import ListSidebar from "./listSidebar/content";
import { useHandleClickedHamburgerMenu } from "@/app/hooks/getHandleHamMenu";

export default function HamburgerMenuBar() {
  const {
    isCheked,
    clickOutsideHamburgerMenu,
    clickOutsidePath,
    setIsCheked,
    setIsTrue,
  } = useHandleClickedHamburgerMenu();

  return (
    <div className="md:hidden">
      <div className="menu flex flex-col items-center gap-y-1">
        <Input
          type="checkbox"
          className="absolute size-6 cursor-pointer z-20 opacity-0"
          ref={clickOutsideHamburgerMenu}
          checked={isCheked}
          onChange={() => {
            setIsCheked((prev) => !prev);
            setIsTrue(false);
          }}
        />
        <span className="block w-6 h-1 bg-black rounded-md transition-all"></span>
        <span className="block w-6 h-1 bg-black rounded-md transition-all"></span>
        <span className="block w-6 h-1 bg-black rounded-md transition-all"></span>
      </div>

      <div
        className={`flex fixed shadow-xl shadow-slate-700 left-0 top-0 flex-col bg-[#476EAE] items-center w-64 transition-all duration-300 text-xl font-semibold h-screen z-50 pt-14
      ${isCheked ? `translate-x-0` : `-translate-x-full`}`}
        ref={clickOutsidePath}
      >
        <ListSidebar />
      </div>
    </div>
  );
}
