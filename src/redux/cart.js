import { createSlice } from "@reduxjs/toolkit"

const initialCartState  = {
    idCust : "",
    customer : "",
    meja : "",
    cart : []
}

const cartSlice = createSlice({
    name : "cart",
    initialState : initialCartState,
    reducers : {
        addCustomer(state, action){
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
        addMenuToCart(state, action) {
            const newItem = action.payload;
            const existingItem = state.cart.find((item) => item.id === newItem.id);
            if (!existingItem) {
              state.cart.push({
                id: newItem.id,
                name: newItem.name,
                price: newItem.price,
                idResto: newItem.idResto,
                namaResto: newItem.namaResto,
                quantity: 1,
              });
            } else {
              existingItem.quantity++;
            }
          },
        clearCart(state){
            
        }
    }
});


export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
