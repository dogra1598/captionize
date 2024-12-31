import * as logoUrl from "../assets/logo.svg";

const Logo = () => {
  return (
    <div className="w-full flex justify-center mt-5">
      <div className="w-14">
        <img src={logoUrl} atl="logo" className="w-full" />
      </div>
      <h1 className=" ml-2 self-center text-4xl font-extrabold text-[#3E5879]">Captionize</h1>
    </div>
  );
};

export default Logo;
