import { useEffect, useState } from "react";
import { icons } from "../../assets/assets";

export default function Store() {
  return (
    <div className="w-full min-h-screen flex justify-center bg-gray-100 py-4">
      <div className="w-[95%] max-w-4xl bg-white rounded-xl shadow-md flex flex-col sm:flex-row items-center sm:items-start gap-6 overflow-hidden">
        <div className="bg-orange-500 w-full flex items-center px-4 h-[20vh] gap-2">
          {/* Foto Toko */}
          <div className="flex-shrink-0">
            <img
              src={icons.account}
              alt="Foto Toko"
              className="w-28 h-28 rounded-full border-4 border-white shadow-md object-cover"
            />
          </div>

          {/* Info Toko */}
          <div className="flex flex-col justify-center sm:justify-start">
            <div className="flex">
              <h1 className="text-2xl font-semibold text-white">Batik Store</h1>
              <img
                src={icons.pen}
                alt=""
                className="w-[25px] ml-2 cursor-pointer"
              />
            </div>

            {/* Rating */}
            <div className="flex items-center mt-2">
              <span className="text-yellow-400 text-xl mr-1">★</span>
              <span className="text-yellow-400 text-xl mr-1">★</span>
              <span className="text-yellow-400 text-xl mr-1">★</span>
              <span className="text-yellow-400 text-xl mr-1">★</span>
              <span className="text-gray-300 text-xl mr-1">★</span>
              <span className="text-sm text-black ml-2">
                (4.0 dari 253 penilaian)
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
