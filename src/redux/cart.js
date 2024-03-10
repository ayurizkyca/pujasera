import { createSlice } from "@reduxjs/toolkit"

const initialCartState = {
    customer: "",
    meja: "",
    // cart: [],
    menuItem : []
}

const cartSlice = createSlice({
    name: "cart",
    initialState: initialCartState,
    reducers: {
        addCustomer(state, action) {
            // const { customer, meja } = action.payload;
            state.customer = action.payload.customer;
            state.meja = action.payload.meja;
            // const findCustomer = state.idCust;
            // if(findCustomer < 0){
            //     state.name = name,
            //     state.meja = meja
            // }else{

            // }
        },
        // addMenuToCart(state, action) {
        //     const newItem = action.payload;
        //     const existingResto = state.cart.find((resto) => resto.id === newItem.id);
        //     if (!existingResto) {
        //         state.cart.push({
        //             id: newItem.restoId,
        //             name: newItem.namaResto,
        //             menu: [{
        //                 id: newItem.id,
        //                 name: newItem.name,
        //                 price: newItem.price,
        //                 quantity: 1,
        //             }]
        //         })
        //         console.log(existingResto);
        //     } else {
        //         const existingItem = existingResto.cart.find((item) => item.id === newItem.id);
        //         if (!existingItem) {
        //             existingResto.cart.push({
        //                 id: newItem.id,
        //                 name: newItem.name,
        //                 price: newItem.price,
        //                 quantity: 1,
        //             });
        //         } else {
        //             existingItem.quantity++;
        //         }
        //         console.log("ini else yang jalan")
        //     }
        // },
        addMenuItem(state, action) {
            const { idResto, namaResto, idMenu, namaMenu, harga, qty } = action.payload;
            // Cek apakah restoran sudah ada di keranjang belanja
            const existingRestoIndex = state.menuItem.findIndex(item => item.idResto === idResto);
            if (existingRestoIndex !== -1) {
                // Restoran sudah ada, tambahkan menu ke dalam restoran yang sudah ada
                const existingResto = state.menuItem[existingRestoIndex];
                const existingMenuIndex = existingResto.menu.findIndex(menu => menu.idMenu === idMenu);
                if (existingMenuIndex !== -1) {
                    // Menu sudah ada, update jumlah qty
                    existingResto.menu[existingMenuIndex].qty += qty;
                    console.log("tambah qty")
                } else {
                    // Menu belum ada, tambahkan menu baru
                    existingResto.menu.push({ idMenu, namaMenu, harga, qty });
                    console.log("tambah menu")
                }
            } else {
                // Restoran belum ada, tambahkan restoran baru beserta menu
                state.menuItem.push({
                    idResto,
                    namaResto,
                    menu: [{ idMenu, namaMenu, harga, qty }],
                });
                console.log("tambah resto dan menu")
            }
        },
        clearCart(state) {

        }
    }
});


export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
