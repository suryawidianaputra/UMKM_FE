import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { GATE_WAY } from "../../env";
import { icons } from "../../assets/assets";

import UserData from "../../components/profile/userData";
import Navigation from "../../components/profile/navigation";
import Address from "../../components/profile/address";
import useFetch from "../../hooks/useFetch";
import Navbar from "../../components/navbar/navbar.jsx";

export default function Profile() {
  const { section } = useParams();
  const navigate = useNavigate();

  const [isCondition, setIsCondition] = useState(1);
  const [userData, setUserData] = useState(null);

  const { datas, error, loading } = useFetch(`${GATE_WAY}/users`, true);

  const CheckCondition = () => {
    return isCondition === 2 ? (
      <Address UserData={userData} />
    ) : (
      <UserData UserData={userData} />
    );
  };

  useEffect(() => {
    setUserData(datas?.data);
  }, [datas]);

  useEffect(() => {
    if (section === "address") {
      setIsCondition(2);
    } else {
      setIsCondition(1);
    }
  }, [section]);

  return (
    <>
      <Navbar />
      <div className="w-full bg-gray-100 min-h-screen py-6 px-4 md:flex justify-center gap-6">
        {/* Sidebar */}
        <div className="w-full md:max-w-xs bg-white rounded-xl shadow-md p-4 mb-3">
          {/* Profile Section */}
          <div className="flex items-center gap-3 mb-6 border-b-2 pb-3">
            {UserData?.profilePic ? (
              <img
                src={UserData?.profilePic}
                className="w-12 h-12 rounded-full"
              />
            ) : (
              <div className="w-12 h-12 bg-gray-200 rounded-full  p-[2px]">
                <img src={icons.account} className="w-12 h-12 rounded-full" />
              </div>
            )}
            <div>
              <p className="font-semibold">{userData?.username}</p>
            </div>
          </div>

          {/* Menu Section */}
          <div className="mb-4">
            <h2 className="font-semibold text-gray-700 mb-2">Pembelian</h2>
            <ul className="ml-2 space-y-1 text-sm text-gray-600">
              <li className="py-2 px-2 hover:bg-orange-100 rounded-sm cursor-pointer">
                Daftar Transaksi
              </li>
              <li className="py-2 px-2 hover:bg-orange-100 rounded-sm cursor-pointer">
                Menunggu Pembayaran
              </li>
            </ul>
          </div>

          <div>
            <h2 className="font-semibold text-gray-700 mb-2">Profile Saya</h2>
            <ul className="ml-2 space-y-1 text-sm text-gray-600">
              <li className="py-2 px-2 hover:bg-orange-100 rounded-sm cursor-pointer">
                Wish List
              </li>
              <li className="py-2 px-2 hover:bg-orange-100 rounded-sm cursor-pointer">
                Keranjang
              </li>
              <li className="py-2 px-2 hover:bg-orange-100 rounded-sm cursor-pointer">
                Toko Favorit
              </li>
              <li
                className="py-2 px-2 hover:bg-orange-100 rounded-sm cursor-pointer"
                onClick={() => navigate("/store")}
              >
                Toko Saya
              </li>
            </ul>
          </div>
        </div>

        {/* Main Content */}
        <div className="w-full max-w-4xl bg-white rounded-xl shadow-md p-2 border-2 border-gray-200">
          <div className="mb-2 pt-2 flex border-b-2 border-gray-200 gap-2">
            <Navigation params={isCondition} />
          </div>

          <CheckCondition />
        </div>
      </div>
    </>
  );
}
