import { createSlice } from "@reduxjs/toolkit";
import { restoData } from "../../public/data/restoData";

const initialMenuState = {
  resto: restoData,
};

const menuSlice = createSlice({
  name: "menu",
  initialState: initialMenuState,
  reducers: {
    updateMenu: (state, action) => {
      state.resto = action.payload;
    },

    updateStock(state, action) {
      const { idResto, idMenu, stock } = action.payload;
      const restoIndex = state.resto.findIndex(resto => resto.id === idResto);
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
