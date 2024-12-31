const Button = ({ btnClasses = "", btnText = "Click Me", onBtnClick }) => {
  const handleOnClick = () => {
    onBtnClick();
  };

  return (
    <button
      className={`bg-[rgba(62,88,121,0.9)] hover:bg-[#3E5879] text-white text-base rounded px-5 py-2 font-semibold outline-none ` + btnClasses}
      onClick={handleOnClick}
    >
      {btnText}
    </button>
  );
};

export default Button;
