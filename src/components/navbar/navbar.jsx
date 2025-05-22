import { useState } from "react";
import { navbarData } from "./navbar";
import { useNavigate } from "react-router-dom";
import { icons } from "../../assets/assets";

export default function Navbar() {
  const navigate = useNavigate();
  const [isShow, setIsShow] = useState(false);

  return (
    <div className="">
      <div className="bg-orange-500 w-full h-[60px] flex justify-between items-center px-[5%]">
        <div>
          <h1 className="text-white text-2xl font-bold">UMKM-Ku</h1>
        </div>

        {/*  */}
        <ul className="sm:flex gap-3 hidden">
          {navbarData.map((data, i) => (
            <li
              key={i}
              className="cursor-pointer text-white hover:underline text-sm"
              onClick={() => navigate(data.path)}
            >
              {data.name.toUpperCase()}
            </li>
          ))}
        </ul>

        <div className="sm:hidden">
          <img
            src={isShow ? icons.close : icons.menu}
            alt="aaaaaaaa"
            className="w-[30px]"
            onClick={() => setIsShow(!isShow)}
          />
        </div>
      </div>
      {/* mobile version */}
      <ul
        className={`bg-orange-500 absolute sm:hidden top-[59px] flex w-full justify-between items-center flex-col overflow-hidden transition-all duration-700 ${
          isShow ? "h-[33vh] p-4" : "h-[0px] "
        }`}
      >
        {navbarData.map((data, i) => (
          <li
            key={i}
            className="cursor-pointer text-white text-bold hover:bg-orange-600 w-[98%] p-2 rounded-[5px] flex justify-between items-center px-4"
            onClick={() => navigate(data.path)}
          >
            <p className="text-sm">{data.name.toUpperCase()}</p>
            <img src={data.icon} alt="" className="w-[30px] " />
          </li>
        ))}
      </ul>
    </div>
  );
}
