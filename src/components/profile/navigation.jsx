import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Navigation({ params }) {
  const navigate = useNavigate();

  return (
    <>
      <button
        className={`${
          params === 1 && "border-b-orange-500 border-b-2 text-orange-500"
        } py-2 px-4 `}
        onClick={() => navigate("/account")}
      >
        Biodata Diri
      </button>
      <button
        className={`${
          params === 2 && "border-b-orange-500 border-b-2 text-orange-500"
        } py-2 px-4`}
        onClick={() => navigate("/account/address")}
      >
        Daftar Alamat
      </button>
    </>
  );
}
