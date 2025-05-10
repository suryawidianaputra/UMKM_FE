import { Navigate } from "react-router-dom";
import { getCookie } from "../helper/cookie";

export default function RequireAuth({ children }) {
  if (!getCookie("token")) return <Navigate to={"/auth/login"} replace />;
  return children;
}
