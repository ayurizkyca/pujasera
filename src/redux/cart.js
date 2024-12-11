import { createSlice } from "@reduxjs/toolkit";

const initialCartState = {
  customer: "",
  meja: "",
  isCustEmpty: true,
  menuItem: [],
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
        const { idResto, namaResto, idMenu, namaMenu, harga, qty, stock } = state.pendingAddToCart;
        const existingRestoIndex = state.menuItem.findIndex(item => item.idResto === idResto);
        if (existingRestoIndex !== -1) {
          const existingResto = state.menuItem[existingRestoIndex];
          const existingMenuIndex = existingResto.menu.findIndex(menu => menu.idMenu === idMenu);
          if (existingMenuIndex !== -1) {
            existingResto.menu[existingMenuIndex].qty += qty;
            existingResto.menu[existingMenuIndex].stock -= qty;
          } else {
            existingResto.menu.push({ idMenu, namaMenu, harga, qty, stock: stock - qty });
          }
          existingResto.subtotal = existingResto.menu.reduce((acc, item) => acc + (item.harga * item.qty), 0);
        } else {
          const newResto = {
            idResto,
            namaResto,
            menu: [{ idMenu, namaMenu, harga, qty, stock: stock - 1 }],
            subtotal: harga * qty
          };
          state.menuItem.push(newResto);
        }
        state.total = state.menuItem.reduce((acc, resto) => acc + resto.subtotal, 0);
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
    },
    deleteMenu(state, action) {
      const { idResto, idMenu } = action.payload;
      const resto = state.menuItem.find(resto => resto.idResto === idResto);
      const restoIndex = state.menuItem.findIndex(resto => resto.idResto === idResto);
      if (resto) {
        const menuItemIndex = resto.menu.findIndex(item => item.idMenu === idMenu);
        if (menuItemIndex !== -1) {
          const deletedItem = resto.menu.splice(menuItemIndex, 1)[0];
          resto.subtotal -= deletedItem.harga * deletedItem.qty;
          state.total -= deletedItem.harga * deletedItem.qty;
          if (resto.menu.length === 0) {
            state.menuItem.splice(restoIndex, 1);
          }
        }
      }
    },
    
    addMenuItem(state, action) {
      if (state.isCustEmpty) {
        state.pendingAddToCart = action.payload;
      } else {
        const { idResto, namaResto, idMenu, namaMenu, harga, qty, stock } = action.payload;
        const existingRestoIndex = state.menuItem.findIndex(item => item.idResto === idResto);
        if (existingRestoIndex !== -1) {
          const existingResto = state.menuItem[existingRestoIndex];
          const existingMenuIndex = existingResto.menu.findIndex(menu => menu.idMenu === idMenu);

          if (existingMenuIndex !== -1) {
            existingResto.menu[existingMenuIndex].qty += qty;
            existingResto.menu[existingMenuIndex].stock -= qty;
          } else {
            existingResto.menu.push({ idMenu, namaMenu, harga, qty, stock: stock - qty });
          }
          // Hitung ulang subtotal untuk restoran yang berubah
          existingResto.subtotal = existingResto.menu.reduce((acc, item) => acc + (item.harga * item.qty), 0);
        } else {
          const newResto = {
            idResto,
            namaResto,
            menu: [{ idMenu, namaMenu, harga, qty, stock }],
            subtotal: harga * qty
          };
          state.menuItem.push(newResto);
        }
        // Hitung ulang total keseluruhan
        state.total = state.menuItem.reduce((acc, resto) => acc + resto.subtotal, 0);
      }
    },

    toggleDrawer(state) {
      state.isDrawerOpen = !state.isDrawerOpen;
    },

    incrementQuantity(state, action) {
      const { idResto, idMenu } = action.payload;
      console.log("masuk redux")
      const resto = state.menuItem.find(resto => resto.idResto === idResto);
      if (resto) {
        const menuItem = resto.menu.find(item => item.idMenu === idMenu);
        if (menuItem) {
          menuItem.qty += 1;
          menuItem.stock -= 1;
          menuItem.subtotal += menuItem.harga;
          resto.subtotal += menuItem.harga;
          state.total += menuItem.harga;
        }

      }
    },

    decrementQuantity(state, action) {
      const { idResto, idMenu } = action.payload;
      const restoIndex = state.menuItem.findIndex(resto => resto.idResto === idResto);

      if (restoIndex !== -1) {
        const resto = state.menuItem[restoIndex];
        const menuItemIndex = resto.menu.findIndex(item => item.idMenu === idMenu);

        if (menuItemIndex !== -1) {
          const menuItem = resto.menu[menuItemIndex];
          console.log("redux menu stock", menuItem.stock)

          if (menuItem.qty > 1) {
            menuItem.qty -= 1;
            menuItem.stock += 1;
            menuItem.subtotal -= menuItem.harga;
            resto.subtotal -= menuItem.harga;
            state.total -= menuItem.harga;
          } else {
            resto.menu.splice(menuItemIndex, 1);
            resto.subtotal -= menuItem.harga;
            state.total -= menuItem.harga * menuItem.qty;

            if (resto.menu.length === 0) {
              state.menuItem.splice(restoIndex, 1);
            }
          }
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
          total: state.total,
        });
      }
      state.customer = "";
      state.meja = "";
      state.isCustEmpty = true;
      state.menuItem = [];
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
