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
    },
});

export const menuActions = menuSlice.actions;
export default menuSlice.reducer;
