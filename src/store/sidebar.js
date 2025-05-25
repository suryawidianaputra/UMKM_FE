import { createSlice } from "@reduxjs/toolkit";

const showSideBar = createSlice({
  name: "ShowSidebar",
  initialState: {
    isShow: false,
  },
  reducers: {
    openSidebar: (state) => {
      state.isShow = true;
    },
    closeSidebar: (state) => {
      state.isShow = false;
    },
  },
});

export const { closeSidebar, openSidebar } = showSideBar.actions;
export default showSideBar.reducer;
