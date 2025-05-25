import { icons } from "../assets/assets";
import { useNavigate } from "react-router-dom";
export default function BackButton() {
  const navigate = useNavigate();
  return (
    <img
      src={icons.arrow}
      alt=""
      className="w-14 cursor-pointer rotate-[-90deg]"
      onClick={() => navigate(-1)}
    />
  );
}
