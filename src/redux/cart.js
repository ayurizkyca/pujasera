import { createSlice } from "@reduxjs/toolkit"

const initialCartState = {
    customer: "",
    meja: "",
    isUserEmpty: true,
    menuItem: [],
    subtotal: 0,
    total: 0,
}

const cartSlice = createSlice({
    name: "cart",
    initialState: initialCartState,
    reducers: {
        addCustomer(state, action) {
            // const { customer, meja } = action.payload;
            state.customer = action.payload.customer
            state.meja = action.payload.meja
            isUserEmpty = false
            // const findCustomer = state.idCust;
            // if(findCustomer < 0){
            //     state.name = name,
            //     state.meja = meja
            // }else{

            // }
        },
       
        // addMenuItem(state, action) {
        //     const { idResto, namaResto, idMenu, namaMenu, harga, qty } = action.payload;
        
        //     // Cari restoran dalam array menuItem berdasarkan idResto
        //     const existingRestoIndex = state.menuItem.findIndex(item => item.idResto === idResto);
        
        //     if (existingRestoIndex !== -1) {
        //         // Restoran sudah ada, tambahkan menu ke dalam restoran yang sudah ada
        //         const existingResto = state.menuItem[existingRestoIndex];
        //         const existingMenuIndex = existingResto.menu.findIndex(menu => menu.idMenu === idMenu);
        
        //         if (existingMenuIndex !== -1) {
        //             // Menu sudah ada, update jumlah qty
        //             existingResto.menu[existingMenuIndex].qty += qty;
        //             console.log("tambah qty")
        //         } else {
        //             // Menu belum ada, tambahkan menu baru
        //             existingResto.menu.push({ idMenu, namaMenu, harga, qty });
        //             console.log("tambah menu")
        //         }
        //     } else {
        //         // Restoran belum ada, tambahkan restoran baru beserta menu
        //         const newResto = {
        //             idResto,
        //             namaResto,
        //             menu: [{ idMenu, namaMenu, harga, qty }],
        //         };
        //         state.menuItem.push(newResto);
        //         console.log("tambah resto dan menu")
        //     }
        // },

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
        
        
        
        clearCart(state) {

        }
    }
});


export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
