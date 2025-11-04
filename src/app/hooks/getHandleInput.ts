import { useState } from "react";

export function useHandleInput(initState: any) {
  const [formMustFilled, setFormMustFilled] = useState(initState);

  function handleValueInput(event: any) {
    const { id, value } = event.target;
    return setFormMustFilled({ ...formMustFilled, [id]: value });
  }

  function isFormFilled() {
    return Object.values(formMustFilled).every((str: any) => str !== "");
  }

  return { formMustFilled, setFormMustFilled, handleValueInput, isFormFilled };
}
