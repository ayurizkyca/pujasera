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
            if(state.pendingAddToCart){
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
        //     const restoIndex = state.menuItem.findIndex(item => item.idResto === idResto);

        //     if (restoIndex !== -1) {
        //         const existingResto = state.menuItem[restoIndex];
        //         const menuIndex = existingResto.menu.findIndex(menu => menu.idMenu === idMenu);
        //         if (menuIndex !== -1) {
        //             existingResto.menu[menuIndex].qty += 1;
        //             // menuIndex.qty += 1; // Perbaikan operator +=
        //             // state.subtotal += state.menuIndex.harga;
        //             // state.total += state.menuIndex.harga;
        //         }
        //     }
        // },

        // incrementQuantity(state, action){
        //     const { idResto, idMenu } = action.payload;
        //     let restoExists = state.cart.find(resto => resto.id === idResto);
        //     if (restoExists) {
        //         const itemExists = restoExists.menu.find(item => item.id === idMenu);
        //         if (itemExists) {
        //             itemExists.qty += 1;
        //             itemExists.subtotal += itemExists.harga;
        //             restoExists.total += itemExists.harga; // Update the restaurant's totalharga
        //         }
        //     }
        //     // recalculateTotalharga(state);
        // },

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


        // incrementQuantity(state, action) {
        //     const { idResto, idMenu } = action.payload;

        //     // Temukan restoran yang sesuai berdasarkan idResto
        //     const resto = state.cart.menuItem.find(resto => resto.idResto === idResto);

        //     // Jika restoran ditemukan
        //     if (resto) {
        //       // Temukan item menu yang sesuai berdasarkan idMenu
        //       const menuItem = resto.menu.find(item => item.idMenu === idMenu);

        //       // Jika item menu ditemukan
        //       if (menuItem) {
        //         // Tambahkan jumlahnya
        //         menuItem.qty += 1;
        //         // Tambahkan subtotalnya
        //         menuItem.subtotal += menuItem.harga;
        //         // Tambahkan ke total restoran
        //         resto.total += menuItem.harga;
        //         // Perbarui subtotal dan total cart
        //         state.cart.subtotal += menuItem.harga;
        //         state.cart.total += menuItem.harga;
        //       }
        //     }
        //   },

        incrementQuantity(state, action) {
            const { idResto, idMenu } = action.payload;

            // Temukan restoran yang sesuai berdasarkan idResto
            const resto = state.menuItem.find(resto => resto.idResto === idResto);

            // Jika restoran ditemukan
            if (resto) {
                // Temukan item menu yang sesuai berdasarkan idMenu
                const menuItem = resto.menu.find(item => item.idMenu === idMenu);

                // Jika item menu ditemukan
                if (menuItem) {
                    // Tambahkan jumlahnya
                    menuItem.qty += 1;
                    // Tambahkan subtotalnya
                    menuItem.subtotal += menuItem.harga;
                    // Tambahkan ke total restoran
                    resto.total += menuItem.harga;
                    // Perbarui subtotal dan total cart
                    state.subtotal += menuItem.harga;
                    state.total += menuItem.harga;
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
