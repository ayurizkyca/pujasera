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
            console.log("masuk actions")
            const { idResto, idMenu } = action.payload;
            console.log("inisialisasi payload")
            const restoIndex = state.resto.findIndex(resto => resto.id === idResto);
            console.log("inisialisasi index resto", restoIndex)
            if (restoIndex !== -1) {
                console.log("masuk if")
                const menuIndex = state.resto[restoIndex].menus.findIndex(menu => menu.id === idMenu);
                console.log("cari menu index", menuIndex)
                if (menuIndex !== -1) {
                    console.log("delete menu")
                    state.resto[restoIndex].menus.splice(menuIndex, 1);
                }
            }
        },
        editMenu(state, action) {
            console.log("masuk actions")
            const { idResto, idMenu, menu } = action.payload;
            console.log("initialisasi payload")
            console.log("id Resto", idResto)
            console.log("idMenu", idMenu)
            console.log("isi menu", menu)
            const restoIndex = state.resto.findIndex(resto => resto.id === idResto);
            console.log("id resto index", restoIndex)
            if (restoIndex !== -1) {
                const menuIndex = state.resto[restoIndex].menus.findIndex(menu => menu.id === idMenu);
                console.log("cari  menu index", menuIndex)
                if (menuIndex !== -1) {
                    state.resto[restoIndex].menus[menuIndex] = menu;
                }
            }
        }
    },
});

export const menuActions = menuSlice.actions;
export default menuSlice.reducer;
