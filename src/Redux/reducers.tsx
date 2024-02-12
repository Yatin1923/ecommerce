import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import toast, { Toaster } from 'react-hot-toast';
import axios from '../Interceptor/interceptor';
import { RootState } from './store';

let userId:number = 0;
const loadCartAsync = createAsyncThunk('cart/loadCart', async (authenticateResponse: any) => {
  try {
    
    const res = await axios.get(`Cart?id=${authenticateResponse.userId}`)
    let result: any[] = [];
    if (res.data) {
      authenticateResponse.cart = res.data
    }

    return authenticateResponse;
  } catch (error) {
    toast.error('Error loading cart:', error)
    throw error;
  }
});

const addToCartAsync = createAsyncThunk('cart/addToCart', async (payload: any, { getState }) => {
  try {
    const state: RootState = getState() as RootState;
    const existingItem = state?.user.cart.find(item => item.id === payload.id);
    if (existingItem) {
      const res = await axios.patch("Cart", { userId: userId, itemId: existingItem.id, quantity: existingItem.quantity + 1 })
      if (res.data > 0) toast.success('Added to Cart');
      return res.data > 0 ? existingItem : [];
    } else {
      const res = await axios.post("Cart", {
        ItemId: payload.id,
        UserId: userId,
      }).catch(error => {
        return error
      })
      toast.success('Added to Cart')
      return res.data ? payload : res.data;
    }
  } catch (error) {
    toast.error('Error adding to cart:', error)
    throw error;
  }
});

const removeFromCartAsync = createAsyncThunk('cart/removeFromCart', async (payload: any) => {
  try {
    const res = await axios.delete(`Cart?ItemId=${payload.id}&UserId=${userId}`).catch(error => {
      return error
    })
    toast.success('Removed from Cart')
    return res.status == 200 ? payload : null;

  } catch (error) {
    console.error('Error removing product from cart', error);
    toast.error('Error removing product from cart', error)
    throw error;
  }
})
type User = {
  id:Number,
  name:string,
  cart:any[]
}
let initialState:User = {
  cart :new Array(),
  id:0,
  name:''
}
const userState = createSlice({
  name: 'user',
  initialState: {
    user: initialState
  },
  reducers: {}
  , extraReducers: (builder) => {
    builder.addCase(addToCartAsync.fulfilled, (state, action) => {
      const existingItem = state.user.cart.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity++;
      } else {
        state.user.cart.push({ ...action.payload, quantity: 1 });
      }
    });
    builder.addCase(removeFromCartAsync.fulfilled, (state, action: any) => {
      state.user.cart = state.user.cart.filter((item: any) => item.id != action.payload.id);
    });
    builder.addCase(loadCartAsync.fulfilled, (state, action) => {
      state.user.cart = action.payload.cart.filter((item: any) => item !=null)
    })
  }
})
export { addToCartAsync, removeFromCartAsync, loadCartAsync }
export default userState.reducer;
