import axios from "axios";

import { useState, useEffect } from "react";
import { forgetPassword, login, register } from "../../helper/link";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) return setErrorMsg("Form tidak boleh kosong");
    setIsLoading(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_GATE_WAY}/users/login`,
        {
          email,
          password,
        },
        { withCredentials: true }
      );

      if (response.status === 200) {
        setIsLoading(false);
        setCookie("email", email);
        setCookie("username", username);
        navigate("/auth/verify-otp");
      }
    } catch (err) {
      setIsLoading(false);
      setEmail("");
      setPassword("");
      setErrorMsg(err.response.data.error);
      return;
    }
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Login
        </h2>

        {errorMsg && (
          <div className="bg-red-300 rounded-[5px] p-1 mb-3">
            <p className="text-center text-white">*{errorMsg}</p>
          </div>
        )}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition duration-200"
            onClick={handleLogin}
          >
            Login
          </button>
          <p className="text-sm text-center mt-3">
            <a
              href={forgetPassword()}
              className=" text-blue-600 hover:underline"
            >
              forget password
            </a>
          </p>

          <p className="text-sm text-center">
            Don't have an account?
            <a href={register()} className="text-blue-600 hover:underline">
              Register
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
