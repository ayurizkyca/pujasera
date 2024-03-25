import { createSlice } from "@reduxjs/toolkit";
import { restoData } from "../../public/data/restoData";

const initialMenuState = {
  resto: restoData,
};

const menuSlice = createSlice({
  name: "menu",
  initialState: initialMenuState,
  reducers: {
    addMenu(state, action) {
      const { idResto, menu } = action.payload;
      const restoIndex = state.resto.findIndex(resto => resto.id === idResto);
      if (restoIndex !== -1) {
        state.resto[restoIndex].menus.push(menu);
      }
    },
    deleteMenu(state, action) {
      const { idResto, idMenu } = action.payload;
      const restoIndex = state.resto.findIndex(resto => resto.id === idResto);
      if (restoIndex !== -1) {
        const menuIndex = state.resto[restoIndex].menus.findIndex(menu => menu.id === idMenu);
        if (menuIndex !== -1) {
          state.resto[restoIndex].menus.splice(menuIndex, 1);
        }
      }
    },
    editMenu(state, action) {
      const { idResto, idMenu, menu } = action.payload;
      const restoIndex = state.resto.findIndex(resto => resto.id === idResto);
      if (restoIndex !== -1) {
        const menuIndex = state.resto[restoIndex].menus.findIndex(menu => menu.id === idMenu);
        if (menuIndex !== -1) {
          state.resto[restoIndex].menus[menuIndex] = menu;
        }
      }
    },
    updateStock(state, action) {
      console.log("masuk redux")
      const { idResto, idMenu, stock } = action.payload;
      const restoIndex = state.resto.findIndex(resto => resto.id === idResto);
      console.log("id resto update redux", restoIndex)
      if (restoIndex !== -1) {
        const menuIndex = state.resto[restoIndex].menus.findIndex(menu => menu.id === idMenu);
        if (menuIndex !== -1) {
          state.resto[restoIndex].menus[menuIndex].stock = stock;
        }
      }
    }
  },
});

export const menuActions = menuSlice.actions;
export default menuSlice.reducer;
