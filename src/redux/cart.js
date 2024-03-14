import { createSlice } from "@reduxjs/toolkit";

const initialCartState = {
    customer: "",
    meja: "",
    isCustEmpty: true,
    menuItem: [],
    subtotal: 0,
    total: 0,
    isDrawerOpen: false,
    purchaseHistory: [],
    pendingAddToCart: null,
};

const cartSlice = createSlice({
    name: "cart",
    initialState: initialCartState,
    reducers: {
        addCustomer(state, action) {
            state.customer = action.payload.customer;
            state.meja = action.payload.meja;
            state.isCustEmpty = false;
            if (state.pendingAddToCart) {
                const { idResto, namaResto, idMenu, namaMenu, harga, qty } = state.pendingAddToCart;
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
            }
            state.pendingAddToCart = null;
        },
        deleteCustomer(state) {
            state.customer = "";
            state.meja = "";
            state.isCustEmpty = true;
            state.pendingAddToCart = null;
            state.menuItem = [];
            state.total = 0;
            state.subtotal = 0;
        },
        deleteMenu(state, action) {
            const { idResto, idMenu } = action.payload;
            const resto = state.menuItem.find(resto => resto.idResto === idResto);
            if (resto) {
                const menuItemIndex = resto.menu.findIndex(item => item.idMenu === idMenu);
                if (menuItemIndex !== -1) {
                    const deletedItem = resto.menu.splice(menuItemIndex, 1)[0];
                    state.subtotal -= deletedItem.harga * deletedItem.qty;
                    state.total -= deletedItem.harga * deletedItem.qty;
                }
            }
        },
        addMenuItem(state, action) {
            if (state.isCustEmpty) {
                state.pendingAddToCart = action.payload;
            } else {
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
            }
        },
        toggleDrawer(state) {
            state.isDrawerOpen = !state.isDrawerOpen;
        },

        // incrementQuantity(state, action) {
        //     const { idResto, idMenu } = action.payload;

        //     const restoIndex = state.menuItem.findIndex(resto => resto.idResto === idResto);
        //     if (restoIndex !== -1) {
        //       const itemIndex = state.menuItem[restoIndex].menu.findIndex(item => item.idMenu === idMenu);
        //       if (itemIndex !== -1) {
        //         state.menuItem[restoIndex].menu[itemIndex].qty += 1;
        //         state.menuItem[restoIndex].menu[itemIndex].subtotal += state.menuItem[restoIndex].menu[itemIndex].harga;
        //         state.menuItem[restoIndex].total += state.menuItem[restoIndex].menu[itemIndex].harga;
        //       }
        //     }
        //   },

        incrementQuantity(state, action) {
            const { idResto, idMenu } = action.payload;
            const resto = state.menuItem.find(resto => resto.idResto === idResto);
            if (resto) {
                const menuItem = resto.menu.find(item => item.idMenu === idMenu);
                if (menuItem) {
                    menuItem.qty += 1;
                    menuItem.subtotal += menuItem.harga;
                    resto.total += menuItem.harga;
                    state.subtotal += menuItem.harga;
                    state.total += menuItem.harga;
                }
            }
        },

        decrementQuantity(state, action) {
            const { idResto, idMenu } = action.payload;
            const resto = state.menuItem.find(resto => resto.idResto === idResto);
            if (resto) {
                const menuItem = resto.menu.find(item => item.idMenu === idMenu);
                if (menuItem.qty > 1) {
                    menuItem.qty -= 1;
                    menuItem.subtotal -= menuItem.harga;
                    resto.total -= menuItem.harga;
                    state.subtotal -= menuItem.harga;
                    state.total -= menuItem.harga;
                }
            }
        },

        clearCart(state) {
            const currentDate = new Date(Date.now());
            const formattedDate = currentDate.toLocaleDateString('en-GB');
            if (state.menuItem.length > 0) {
                state.purchaseHistory.push({
                    date: formattedDate,
                    customer: state.customer,
                    meja: state.meja,
                    menuItem: state.menuItem,
                    subtotal: state.subtotal,
                    total: state.total,
                });
            }
            state.customer = "";
            state.meja = "";
            state.isCustEmpty = true;
            state.menuItem = [];
            state.subtotal = 0;
            state.total = 0;
        },
        removePurchase(state, action) {
            const { index } = action.payload;
            state.purchaseHistory.splice(index, 1);
        },
    }
});


export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
