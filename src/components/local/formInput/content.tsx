type PropsFormInput = {
  typeInput: "password" | "text" | "email" | "number";
  placeholder: string | "";
  labelTitle: string;
  nameInput: string;
  handleValueInput: any;
  formMustFilled: any;
};

export default function FormInput(props: PropsFormInput) {
  const {
    typeInput,
    placeholder,
    labelTitle,
    nameInput,
    handleValueInput,
    formMustFilled,
  } = props;
  return (
    <div>
      <label
        htmlFor={labelTitle}
        className="text-lg font-semibold text-blue-500 inline-block mb-3"
      >
        {labelTitle}
      </label>
      <input
        type={typeInput}
        id={labelTitle}
        name={nameInput}
        placeholder={placeholder}
        className="w-full rounded-md p-2.5 bg-white"
        onChange={handleValueInput}
        value={formMustFilled}
      />
    </div>
  );
}
