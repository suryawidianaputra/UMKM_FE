import SideBar from "../../components/admin/sidebar";

import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { closeSidebar, openSidebar } from "../../store/sidebar";
import { Outlet } from "react-router-dom";

export default function AdminDashboard() {
  const params = useParams();

  const isShowSidebar = useSelector((state) => state.sideBar.isShow);
  const dispatch = useDispatch();

  return (
    <div className="flex">
      <div
        className={`h-screen ${
          isShowSidebar ? "translate-x-0" : "-translate-x-full overflow-hidden"
        } bg-orange-500 w-64 p-4 text-white flex flex-col absolute transition-all duration-700`}
      >
        <h2
          className="text-2xl font-bold mb-6"
          onClick={() => dispatch(closeSidebar())}
        >
          Batik Kita
        </h2>

        <nav className="flex flex-col gap-4">
          <a
            href={`/dashboard/orders`}
            className="flex items-center gap-3 hover:bg-orange-700 p-2 rounded"
          >
            <span>Orders</span>
          </a>
          {/* <a
            href={`/dashboard/users`}
            className="flex items-center gap-3 hover:bg-orange-700 p-2 rounded"
          >
            <span>Users</span>
          </a> */}
          <a
            href={`/dashboard/new-product`}
            className="flex items-center gap-3 hover:bg-orange-700 p-2 rounded"
          >
            <span>New Product</span>
          </a>
        </nav>
        <div></div>
      </div>
      {/* <h1 onClick={() => dispatch(openSidebar())}>HLlao, worjlskdj</h1> */}
      <div className="w-full mt-4">
        <Outlet />
      </div>
    </div>
  );
}
