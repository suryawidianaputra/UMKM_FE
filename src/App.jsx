import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/auth/login";
import RegisterPage from "./pages/auth/register";
import VerifyOtpPage from "./pages/auth/verifyOtp";
import HomePage from "./pages/home";
import Profile from "./pages/account/profile";
import Store from "./pages/account/store";
import AdminDashboard from "./pages/admin/dashboardLayout";
import Orders from "./pages/admin/orders";
import Product from "./pages/admin/product";
import ProductForm from "./pages/admin/formNewProduct";
import EditProduct from "./pages/admin/updateProduct";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* home */}
        <Route path="/" element={<HomePage />} />

        {/* profile */}
        <Route path="/account/:section?" element={<Profile />} />

        {/* store */}
        <Route path="/store" element={<Store />} />
        <Route path="/store/product/add" element={<ProductForm />} />
        <Route
          path="/store/product/:productId/edit"
          element={<EditProduct />}
        />

        {/* auth */}
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/auth/register" element={<RegisterPage />} />
        <Route path="/auth/verify-otp" element={<VerifyOtpPage />} />
      </Routes>
    </Router>
  );
}
