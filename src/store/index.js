import { configureStore } from "@reduxjs/toolkit";
import showSideBarReducer from "./sidebar";

export default configureStore({
  reducer: {
    sideBar: showSideBarReducer,
  },
});
