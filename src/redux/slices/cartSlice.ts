import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PizzaAddToCart, PizzaInCart } from "../../@types/types";

type CartSlice = {
  items: PizzaInCart[];
  totalPrice: number;
  totalQuantity: number;
  storage: boolean;
}

const initialState: CartSlice = {
  items: [],
  totalPrice: 0,
  totalQuantity: 0,
  storage: false,
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<PizzaAddToCart>) => {
      const _id = Number(`${action.payload.id}${action.payload.selectedDough}${action.payload.selectedSize}`);
      const findItem = state.items.find((obj) => obj._id === _id);
      if (findItem) {
        findItem.quantity++;
      } else {
        state.items.push({ ...action.payload, quantity: 1, _id })
      }
      state.totalPrice = state.totalPrice + action.payload.price;
      state.totalQuantity = state.totalQuantity + 1;
    },
    
    addToCartFromStorage: (state, action: PayloadAction<PizzaAddToCart>) => {
      state.storage = true;
      const _id = Number(`${action.payload.id}${action.payload.selectedDough}${action.payload.selectedSize}`);
      const findItem = state.items.find((obj) => obj._id === _id);
      if (findItem) {
        findItem.quantity++;
      } else {
        state.items.push({ ...action.payload, quantity: 1, _id })
      }
      state.totalPrice = state.totalPrice + action.payload.price;
      state.totalQuantity = state.totalQuantity + 1;
    },

    countMinus: (state, action: PayloadAction<PizzaInCart>) => {
      const _id = Number(`${action.payload.id}${action.payload.selectedDough}${action.payload.selectedSize}`);
      const findItem = state.items.find((obj) => {
        return obj._id === _id;
      });
      if (findItem && findItem.quantity === 1) {
        state.items = state.items.filter((obj) => obj._id !== findItem._id)
      } else if (findItem) {
        findItem.quantity--;
      }
      state.totalPrice = state.totalPrice - action.payload.price;
      state.totalQuantity = state.totalQuantity - 1;
    },

    countPlus: (state, action: PayloadAction<PizzaInCart>) => {
      const _id = Number(`${action.payload.id}${action.payload.selectedDough}${action.payload.selectedSize}`);
      const findItem = state.items.find((obj) => {
        return obj._id === _id
      });
      if (findItem) {
        findItem.quantity++;
      }
      state.totalPrice = state.totalPrice + action.payload.price;
      state.totalQuantity = state.totalQuantity + 1;
    },

    removeItem: (state, action: PayloadAction<PizzaInCart>) => {
      const _id = Number(`${action.payload.id}${action.payload.selectedDough}${action.payload.selectedSize}`);
      const findItem = state.items.find((obj) => {
        return obj._id === _id
      });
      if (findItem) {
        state.items = state.items.filter((obj) => obj._id !== findItem._id)
        state.totalPrice = state.totalPrice - findItem.quantity * findItem.price;
        state.totalQuantity = state.totalQuantity - 1 * findItem.quantity;
      }
    },

    clearCart: (state) => {
      state.items = [];
      state.totalPrice = 0;
      state.totalQuantity = 0;
    }
  }
})

export const { addToCart, countMinus, countPlus, removeItem, clearCart, addToCartFromStorage } = cartSlice.actions;


export default cartSlice.reducer;