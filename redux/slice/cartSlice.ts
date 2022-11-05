import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        products: [],
    },
    reducers: {
        addCart: (state: any, action: any) => {
            state.products = [...state.products, action.payload];
        },
        removeCart: (state: any, action: any) => {
            state.products = state.products.filter(
                (product: any) => product.id !== action.payload
            );
        },
        removeAll: (state: any, action: any) => {
            state.products = action.payload;
        },
    },
});

export const { addCart, removeCart, removeAll } = cartSlice.actions;

export default cartSlice.reducer;
