import { Input } from "@/components/ui/input";
import ButtonAutentications from "../buttonAuth/content";
import ListContent from "../listContent/content";
import { useHandleClickedHamburgerMenu } from "@/app/hooks/getHandleHamMenu";

export default function HamburgerMenu() {
  const { isCheked, clickOutsidePath, setIsCheked } =
    useHandleClickedHamburgerMenu();

  return (
    <div className="md:hidden" ref={clickOutsidePath}>
      <div className="menu flex flex-col h-5 justify-between absolute right-7 top-7">
        <Input
          type="checkbox"
          className="size-5 absolute z-20 cursor-pointer opacity-0"
          checked={isCheked}
          onChange={() => setIsCheked((prev) => !prev)}
        />
        <span className="block w-6 h-1 bg-black rounded-md transition-all"></span>
        <span className="block w-6 h-1 bg-black rounded-md transition-all"></span>
        <span className="block w-6 h-1 bg-black rounded-md transition-all"></span>
      </div>
      <div
        className={`flex pt-24 gap-y-12 absolute right-0 top-16 h-screen flex-col bg-[#A6E3E9] bg-gradient-to-b to-sky-300 items-center w-60 transition-all duration-300 text-xl font-semibold rounded-bl-lg
      ${isCheked ? `translate-x-0` : `translate-x-full`}`}
      >
        <ListContent />
        <ButtonAutentications />
      </div>
    </div>
  );
}
