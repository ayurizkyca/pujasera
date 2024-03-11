import { createSlice } from "@reduxjs/toolkit"

const initialCartState = {
    customer: "",
    meja: "",
    isCustEmpty: true,
    menuItem: [],
    subtotal: 0,
    total: 0,
    isDrawerOpen : false,
}

const cartSlice = createSlice({
    name: "cart",
    initialState: initialCartState,
    reducers: {
        addCustomer(state, action) {
            // const { customer, meja } = action.payload;
            state.customer = action.payload.customer;
            state.meja = action.payload.meja;
            state.isCustEmpty = false;
            // const findCustomer = state.idCust;
            // if(findCustomer < 0){
            //     state.name = name,
            //     state.meja = meja
            // }else{

            // }
        },
       
        addMenuItem(state, action) {
            const { idResto, namaResto, idMenu, namaMenu, harga, qty } = action.payload;

            const existingRestoIndex = state.menuItem.findIndex(item => item.idResto === idResto);
            if (existingRestoIndex !== -1) {
                const existingResto = state.menuItem[existingRestoIndex];
                const existingMenuIndex = existingResto.menu.findIndex(menu => menu.idMenu === idMenu);

                if (existingMenuIndex !== -1) {
                    existingResto.menu[existingMenuIndex].qty += qty;
                    state.subtotal += harga * qty;
                } else {
                    existingResto.menu.push({ idMenu, namaMenu, harga, qty });
                    state.subtotal += harga * qty;
                }
            } else {
                const newResto = {
                    idResto,
                    namaResto,
                    menu: [{ idMenu, namaMenu, harga, qty }],
                };
                state.menuItem.push(newResto);
                state.subtotal += harga * qty;
            }
            state.total = state.subtotal; // Set total sama dengan subtotal saat menambah item baru
        },
        toggleDrawer(state){
            state.isDrawerOpen = !state.isDrawerOpen;
        },
        clearCart(state) {

        }
    }
});


export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
