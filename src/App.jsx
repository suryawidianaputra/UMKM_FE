import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// auth
import LoginPage from "./pages/auth/login";
import RegisterPage from "./pages/auth/register";
import VerifyOtpPage from "./pages/auth/verifyOtp";
import HomePage from "./pages/home";
import Profile from "./pages/account/profile";
import Store from "./pages/account/store";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* home */}
        <Route path="/" element={<HomePage />} />

        {/* profile */}
        <Route path="/account/:section?" element={<Profile />} />
        <Route path="/store" element={<Store />} />

        {/* auth */}
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/auth/register" element={<RegisterPage />} />
        <Route path="/auth/verify-otp" element={<VerifyOtpPage />} />
      </Routes>
    </Router>
  );
}
