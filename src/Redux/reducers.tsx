import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
const cartState = createSlice({
  name: 'cart',
  initialState: {
    cart: new Array()
  },
  reducers: {
    addToCart: (state,action:any) => {
     
      axios.post("https://localhost:7275/api/Cart",{ItemId:action.payload.id,UserId:1}).then(response=>{
        let isExistingItem = false;
        state.cart.forEach((item:any)=>{
          if(item.name == action.payload.name){
            item.quantity++;
            isExistingItem = true;
          }
        });
        if(!isExistingItem) state.cart.push(action.payload);
  
      }).catch(error=>{
        console.error(error)
      })
    },
    removeFromCart: (state,action) => {
      axios.delete(`https://localhost:7275/api/Cart?ItemId=${action.payload.id}&UserId=1`).then(response=>{
        state.cart = state.cart.filter((item:any)=>item.name!=action.payload.name);
      }).catch(error=>{
        console.log(error);
      })
    }
  }
})
export const { addToCart,removeFromCart } = cartState.actions
export default cartState.reducer;
