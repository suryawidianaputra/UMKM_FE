import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { setCookie, getCookie, removeCookie } from "../../helper/cookie";

export default function VerifyOtpPage() {
  const [otp, setOtp] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handle = async () => {
    if (otp === null) return setErrorMsg("Masukan Kode");
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_GATE_WAY}/users/verify-otp`,
        {
          otpCode: otp,
        },
        { withCredentials: true }
      );

      if (response.status === 201 || response.status === 2000) {
        setIsLoading(false);
        removeCookie("username");
        removeCookie("email");
        removeCookie("password");
        setCookie("token", response.data.token);
        navigate("/");
      }
    } catch (err) {
      if (err.status !== 200) {
        setErrorMsg(err.response.data.error);
      }
    }
  };

  const handleResendOtp = async () => {
    // const response = await axios.
  };
  return (
    <div className="w-full h-screen flex items-center bg-gray-200">
      <div className="max-w-md mx-auto mt-10 p-8 bg-white rounded-2xl shadow-md space-y-4">
        <h2 className="text-xl font-semibold text-center text-gray-800">
          Konfirmasi OTP
        </h2>
        <p className="text-center">
          Kami telah mengirim kode verifikasi ke email: <br />
          <span className="font-bold">{getCookie("email")}</span>
        </p>

        {errorMsg && <p className="text-red-500 text-sm">*{errorMsg}</p>}
        <input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-600"
          placeholder="Masukkan 6 digit OTP"
          maxLength={6}
        />

        <p className="text-sm text-blue-700 hover:underline cursor-pointer">
          Kirim ulang
        </p>

        <button
          onClick={handle}
          className={`w-full ${
            isLoading ? `bg-orange-300` : `bg-orange-500 hover:bg-orange-600`
          } text-white font-semibold py-2 px-4 rounded-lg transition duration-200`}
          disabled={isLoading}
        >
          {isLoading ? "Wating..." : "Konfirmasi"}
        </button>
      </div>
    </div>
  );
}
