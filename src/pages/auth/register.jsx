import axios from "axios";

import { useEffect, useState } from "react";
import { login, verifyOtp } from "../../helper/link";
import { Link, useNavigate } from "react-router-dom";
import { setCookie } from "../../helper/cookie";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!email || !username || !password)
      return setErrorMsg("Form tidak boleh kosong");

    setIsLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_GATE_WAY}/users/register`,
        {
          username,
          email,
          password,
        },
        { withCredentials: true }
      );

      console.log(response);

      if (response.status !== 409) {
        setErrorMsg(response.data.msg);
      }

      if (response.status === 200) {
        setIsLoading(false);
        setCookie("email", email);
        setCookie("username", username);
        navigate("/auth/verify-otp");
      }
    } catch (err) {
      if (err.status !== 200) {
        setIsLoading(false);
        setUsername("");
        setEmail("");
        setPassword("");
        setErrorMsg(err.response.data.error);
        return;
      }
    }
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <div id="register-form" className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-700 mb-1 text-center">
            Register
          </h2>
          {errorMsg && <p className="text-red-500 text-center">*{errorMsg}</p>}

          <div>
            {/* username */}
            <label className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              placeholder="Enter username"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
            />
          </div>
          {/* email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>
          {/* password */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>

          <button
            type="submit"
            className={`w-full ${
              isLoading ? "bg-orange-300" : `bg-orange-500 hover:bg-orange-600`
            }  text-white py-2 rounded-lg  transition`}
            onClick={handleRegister}
            disabled={isLoading}
          >
            {isLoading ? "Waiting..." : "Register"}
          </button>

          <p className="text-sm text-center mt-4">
            Have an account?
            <a href={login()} className="text-blue-600 hover:underline">
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
