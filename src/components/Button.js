const Button = ({ btnClasses = "", btnText = "Click Me", onBtnClick, disabled = false }) => {
  const handleOnClick = () => {
    onBtnClick();
  };

  return (
    <>
      {!disabled ? (
        <button
          className={
            `bg-[rgba(62,88,121,0.9)] hover:bg-[#3E5879] text-white text-base rounded px-5 py-2 font-semibold outline-none ` +
            btnClasses +
            (disabled ? " cursor-not-allowed bg-neutral-400 hover:bg-neutral-400" : "")
          }
          onClick={handleOnClick}
        >
          {btnText}
        </button>
      ) : (
        <button
          disabled={disabled}
          className={
            `cursor-not-allowed bg-neutral-400 hover:bg-neutral-400 text-white text-base rounded px-5 py-2 font-semibold outline-none ` + btnClasses
          }
        >
          {btnText}
        </button>
      )}
    </>
  );
};

export default Button;
