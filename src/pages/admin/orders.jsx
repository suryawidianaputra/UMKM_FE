import { useSelector, useDispatch } from "react-redux";
import { openSidebar } from "../../store/sidebar";

export default function Orders() {
  const dispatch = useDispatch();
  const isShowSidebar = useSelector((state) => state.sideBar.isShow);
  return (
    <div>
      <h1 onClick={() => dispatch(openSidebar())}>Hallo, World!</h1>
    </div>
  );
}
