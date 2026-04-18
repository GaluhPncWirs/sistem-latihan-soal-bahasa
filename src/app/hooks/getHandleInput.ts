import { useState } from "react";

export function useHandleInput(initState: any) {
  const [formMustFilled, setFormMustFilled] = useState(initState);

  function handleValueInput(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = event.target;
    return setFormMustFilled({ ...formMustFilled, [name]: value });
  }

  function isFormFilled() {
    return Object.values(formMustFilled).every((str) => str !== "");
  }

  return { formMustFilled, setFormMustFilled, handleValueInput, isFormFilled };
}
