import { Link, useNavigate } from "react-router-dom";

const nav = (url) => {
  useNavigate(url);
};

export const login = () => {
  return "/auth/login";
};
export const register = () => {
  return "/auth/register";
};
export const verifyOtp = () => {
  return "/auth/verify-otp";
};
export const forgetPassword = () => {
  return "/auth/forget-password";
};

export const navigate = (url) => {
  nav(url);
};
