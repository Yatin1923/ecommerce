import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { RootState } from './store';



const loadCartAsync = createAsyncThunk('cart/loadCart', async (userId: number) => {
  try {
    const res = await axios.get(`https://localhost:7275/api/Cart?id=${userId}`)
    let result: any[] = [];
    if (res.data) {
      result = res.data;
    }

    return result;
  } catch (error) {
    toast.error('Error loading cart:', error)
    throw error;
  }
});

const addToCartAsync = createAsyncThunk('cart/addToCart', async (payload: any, { getState }) => {
  try {
    const state: RootState = getState() as RootState;
    const existingItem = state?.cart.find(item => item.id === payload.id);
    if (existingItem) {
      const res = await axios.patch("https://localhost:7275/api/Cart", { userId: 1, itemId: existingItem.id, quantity: existingItem.quantity + 1 })
      if (res.data > 0) toast.success('Added to Cart');
      return res.data > 0 ? existingItem : [];
    } else {
      const res = await axios.post("https://localhost:7275/api/Cart", {
        ItemId: payload.id,
        UserId: 1,
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
    const res = await axios.delete(`https://localhost:7275/api/Cart?ItemId=${payload.id}&UserId=1`).catch(error => {
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
const cartState = createSlice({
  name: 'cart',
  initialState: {
    cart: new Array()
  },
  reducers: {}
  , extraReducers: (builder) => {
    builder.addCase(addToCartAsync.fulfilled, (state, action) => {
      const existingItem = state.cart.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity++;
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }
    });
    builder.addCase(removeFromCartAsync.fulfilled, (state, action: any) => {
      state.cart = state.cart.filter((item: any) => item.id != action.payload.id);
    });
    builder.addCase(loadCartAsync.fulfilled, (state, action) => {
      action.payload.forEach(item => {
        if (item) {
          state.cart.push(item);
        }
      })
    })
  }
})
export { addToCartAsync, removeFromCartAsync, loadCartAsync }
export default cartState.reducer;
