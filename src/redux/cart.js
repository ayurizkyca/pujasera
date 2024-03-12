import { createSlice } from "@reduxjs/toolkit";

const initialCartState = {
    customer: "",
    meja: "",
    isCustEmpty: true,
    menuItem: [],
    subtotal: 0,
    total: 0,
    isDrawerOpen : false,
    purchaseHistory: [],
};

const cartSlice = createSlice({
    name: "cart",
    initialState: initialCartState,
    reducers: {
        addCustomer(state, action) {
            state.customer = action.payload.customer;
            state.meja = action.payload.meja;
            state.isCustEmpty = false;
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
            state.total = state.subtotal;
        },
        toggleDrawer(state){
            state.isDrawerOpen = !state.isDrawerOpen;
        },
        incrementQuantity(state, action) {
            const { idResto, idMenu } = action.payload;
            const restoIndex = state.menuItem.findIndex(item => item.idResto === idResto);
        
            if (restoIndex !== -1) {
                const menuIndex = state.menuItem[restoIndex].menu.findIndex(menu => menu.idMenu === idMenu);
                if (menuIndex !== -1) {
                    state.menuItem[restoIndex].menu[menuIndex].qty += 1; // Perbaikan operator +=
                    state.subtotal += state.menuItem[restoIndex].menu[menuIndex].harga;
                    state.total += state.menuItem[restoIndex].menu[menuIndex].harga;
                }
            }
        },
        
        decrementQuantity(state, action) {
            const { idResto, idMenu } = action.payload;
            const restoIndex = state.menuItem.findIndex(item => item.idResto === idResto);
        
            if (restoIndex !== -1) {
                const menuIndex = state.menuItem[restoIndex].menu.findIndex(menu => menu.idMenu === idMenu);
                if (menuIndex !== -1 && state.menuItem[restoIndex].menu[menuIndex].qty > 1) {
                    state.menuItem[restoIndex].menu[menuIndex].qty--;
                    state.subtotal -= state.menuItem[restoIndex].menu[menuIndex].harga;
                    state.total -= state.menuItem[restoIndex].menu[menuIndex].harga;
                }
            }
        },
        clearCart(state) {
            // Simpan riwayat pembelian sebelum clear cart
            if (state.menuItem.length > 0) {
                state.purchaseHistory.push({
                    customer: state.customer,
                    meja: state.meja,
                    menuItem: state.menuItem,
                    subtotal: state.subtotal,
                    total: state.total,
                });
            }
            // Reset cart
            state.customer = "";
            state.meja = "";
            state.isCustEmpty = true;
            state.menuItem = [];
            state.subtotal = 0;
            state.total = 0;
        },
        
        // Tambahan action jika Anda ingin menghapus riwayat pembelian tertentu dari history
        removePurchase(state, action) {
            const { index } = action.payload;
            state.purchaseHistory.splice(index, 1);
        },
    }
});


export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
