import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        showCart: false,
        cart: [],
        subTotal: 0
    },
    reducers: {
        toggleCart: (state, action) => {
            state.showCart = !state.showCart
        },

        addProduct: (state, action) => {
            if(!state.cart.some((product) => {
                if(product.slug === action.payload.slug) {
                    product.qty += action.payload.qty
                    return true
                }
            })) {
                state.cart.push(action.payload)
            }
            state.subTotal += action.payload.qty*action.payload.price
        },

        removeProduct: (state, action) => {
            const newCart = state.cart.filter((product) => {
                if(product.slug !== action.payload.slug) {
                    return true
                } else if(product.qty > action.payload.qty) {
                    product.qty -= action.payload.qty
                    state.subTotal -= action.payload.qty*action.payload.price
                    return true
                } else if (product.qty === action.payload.qty) {
                    state.subTotal -= action.payload.qty*action.payload.price
                    return false
                }
            })
            state.cart = newCart
        },
        clearCart: (state, action) => {
            state.cart = []
            state.subTotal = 0
        }
    }
})

export const cartActions = cartSlice.actions
export default cartSlice