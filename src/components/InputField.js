const InputField = ({
  inputType = "input",
  label = "label",
  value = "",
  type = "text",
  name = "",
  placeholder = "Enter text...",
  min = 0,
  inputClasses = "",
  labelClasses = "",
  containerClasses = "",
  textareaClasses = "",
  onChange,
}) => {
  const handleOnChnage = (event) => {
    onChange(event);
  };

  return (
    <div className={`grid mx-5 ` + containerClasses}>
      <label className={`mb-1 text-stone-600 font-semibold` + labelClasses}>{label}</label>
      {inputType === "input" && (
        <input
          type={type}
          value={value}
          name={name}
          placeholder={placeholder}
          {...(type === "number" ? (min = { min }) : null)}
          className={
            `px-2 py-1 border border-neutral-300 focus:border-2 focus:border-neutral-400 outline-none rounded-sm text-stone-700 ` + inputClasses
          }
          onChange={handleOnChnage}
        />
      )}
      {inputType === "textarea" && (
        <textarea
          placeholder={placeholder}
          value={value}
          className={
            `px-2 py-1 border border-neutral-300 focus:border-2 focus:border-neutral-400 outline-none rounded-sm text-stone-700 ` + textareaClasses
          }
          onChange={handleOnChnage}
        />
      )}
    </div>
  );
};

export default InputField;
