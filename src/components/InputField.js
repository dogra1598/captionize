const InputField = ({
  inputType = "input",
  label = "label",
  value = "",
  type = "text",
  rows = 5,
  name = "",
  placeholder = "Enter text...",
  min = 0,
  max = 0,
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
    <div className={`grid ` + containerClasses}>
      <label className={`mb-1 text-stone-600 font-semibold` + labelClasses}>{label}</label>
      {inputType === "input" && (
        <input
          type={type}
          value={value}
          name={name}
          placeholder={placeholder}
          {...(type === "number" ? (min = { min }) : null)}
          {...(type === "number" ? (max = { max }) : null)}
          className={
            `px-2 py-1.5 border border-neutral-300 focus:border-2 focus:border-neutral-400 outline-none rounded text-stone-700 bg-transparent ` +
            inputClasses
          }
          onChange={handleOnChnage}
        />
      )}
      {inputType === "textarea" && (
        <textarea
          rows={rows}
          placeholder={placeholder}
          value={value}
          className={
            `px-2 py-1 border border-neutral-300 focus:border-2 focus:border-neutral-400 outline-none rounded text-stone-700 bg-transparent ` +
            textareaClasses
          }
          onChange={handleOnChnage}
        />
      )}
    </div>
  );
};

export default InputField;
