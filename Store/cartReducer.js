import { createSlice } from "@reduxjs/toolkit";

const initialState = { cart: [] };

const cartSlice = createSlice({
  name: "cartSlice",
  initialState: initialState,
  reducers: {
    addToCart(state , action) {
        const existItem = state.cart.find(item => item.id === action.payload.id);
        const product = action.payload;
  
        if (existItem) {
          state.cart = state.cart.map(item =>
            item.id === product.id ? { ...item, amount: item.amount + 1 } : item
          );
        } else {
          state.cart.push({ ...product, amount: 1 });
        }
    },
    removeFromCart(state , action) {
        console.log(action.payload?.id)
      const existItemForDelete = state.cart.find(
        (item) => item?.id === action.payload?.id
      );
      console.log(existItemForDelete)
      const Product = action.payload;
      const newCart = state.cart.filter((item) => item.id !== Product.id);
      if (existItemForDelete?.amount === 1) {
        return {...state , cart : newCart};
      } else {
        state.cart = state.cart.map((item) =>
          item.id === Product.id ? { ...item, amount: item.amount - 1 } : item
        );
      }
    },
  },
});

export const cartAction = cartSlice.actions

export default cartSlice.reducer