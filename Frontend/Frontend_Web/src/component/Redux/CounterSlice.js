import { createSlice } from "@reduxjs/toolkit"

const counterSlice = createSlice({
  name: 'cartCount',
  initialState: {
     cart: JSON.parse(localStorage.getItem("cart")) || {}

  },
  reducers : {
    addCart: (state, action) =>{
        const qtyCart = state.cart[action.payload] || 0
        state.cart[action.payload] = qtyCart + 1
        localStorage.setItem("cart", JSON.stringify(state.cart))

    }
  }
})

export const { addCart ,increamentCart, decreaseCart} = counterSlice.actions
export default counterSlice.reducer