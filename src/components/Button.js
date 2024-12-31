const Button = ({ btnClasses = "", btnText = "Click Me", onBtnClick }) => {
  const handleOnClick = () => {
    onBtnClick();
  };

  return (
    <button
      className={`bg-blue-500 hover:bg-blue-700 text-white text-base rounded-sm px-5 py-2 font-semibold outline-none ` + btnClasses}
      onClick={handleOnClick}
    >
      {btnText}
    </button>
  );
};

export default Button;
