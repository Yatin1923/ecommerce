import { createSlice } from '@reduxjs/toolkit'

const cartState = createSlice({
  name: 'cart',
  initialState: {
    cart: new Array()
  },
  reducers: {
    addToCart: (state,action:any) => {
      let isExistingItem = false;
      state.cart.forEach((item:any)=>{
        if(item.name == action.payload.name){
          item.quantity++;
          isExistingItem = true;
        }
      });
      if(!isExistingItem) state.cart.push(action.payload);
    },
    removeFromCart: (state,action) => {
      state.cart = state.cart.filter((item:any)=>item.name!=action.payload.name);
    }
  }
})
export const { addToCart,removeFromCart } = cartState.actions
export default cartState.reducer;
