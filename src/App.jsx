import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// auth
import LoginPage from "./pages/auth/login";
import RegisterPage from "./pages/auth/register";
import VerifyOtpPage from "./pages/auth/verifyOtp";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* auth */}
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/auth/register" element={<RegisterPage />} />
        <Route path="/auth/verify-otp" element={<VerifyOtpPage />} />
      </Routes>
    </Router>
  );
}
