import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';


const addToCartAsync = createAsyncThunk('cart/addToCart', async (payload:any) => {
  try {
    const res = await axios.post("https://localhost:7275/api/Cart", {
      ItemId: payload.id,
      UserId: 1,
    }).catch(error=>{
      return error
    })
    toast.success('Added to Cart')
    return res.data?payload:res.data;
  } catch (error) {
    console.error('Error adding to cart:', error);
    toast.error('Error adding to cart:', error)
    throw error;
  }
});
const removeFromCartAsync = createAsyncThunk('cart/removeFromCart',async(payload:any)=>{
  try{
    const res = await axios.delete(`https://localhost:7275/api/Cart?ItemId=${payload.id}&UserId=1`).catch(error=>{
      return error
    })
    toast.success('Removed from Cart')
    return res.status==200?payload:null;

  }catch(error){
    console.error('Error removing product from cart',error);
    toast.error('Error removing product from cart', error)
    throw error;
  }
})
const cartState = createSlice({
  name: 'cart',
  initialState: {
    cart: new Array()
  },
  reducers: {}
  ,extraReducers:(builder)=>{
    builder.addCase(addToCartAsync.fulfilled,(state,action)=>{
      const existingItem = state.cart.find(item => item.name === action.payload.name);
    console.log(action);
      if (existingItem) {
        existingItem.quantity++;
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }
    });
    builder.addCase(removeFromCartAsync.fulfilled,(state,action:any)=>{
      state.cart = state.cart.filter((item:any)=>item.id!=action.payload.id);
    });
  }
})
export {addToCartAsync,removeFromCartAsync}
export default cartState.reducer;
