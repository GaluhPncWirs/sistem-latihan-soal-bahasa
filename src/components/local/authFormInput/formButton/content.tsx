import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

type PropsFormButton = {
  buttonName: string;
  isFormFilled: any;
  isLoading: boolean;
};

export default function FormButton(props: PropsFormButton) {
  const { buttonName, isFormFilled, isLoading } = props;
  return (
    <Button
      className="bg-blue-400 rounded-md font-medium w-full py-1.5 mt-3 hover:bg-blue-500 text-black cursor-pointer text-lg"
      type="submit"
      disabled={!isFormFilled()}
    >
      {isLoading ? <Loader2 className="animate-spin size-7" /> : buttonName}
    </Button>
  );
}
