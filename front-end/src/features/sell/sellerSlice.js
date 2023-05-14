import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import sellerService from './sellerService'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Get seller from localStorage
const seller = JSON.parse(localStorage.getItem('seller'))


const initialState = {
  seller: seller ? seller : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// Register user
export const register = createAsyncThunk(
  'sellers/register',
  async (seller, thunkAPI) => {
    try {
      return await sellerService.register(seller)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// forgot password
export const forgotpassword = createAsyncThunk(
  'sellers/forgot-password',
  async (user, thunkAPI) => {
    try {
      console.log(`check point ....... ${user}`)
      return await sellerService.forgotpassword(user)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Login user
export const login = createAsyncThunk('sellers/login', async (user, thunkAPI) => {
  try {
    const loged =  await sellerService.login(user)
    toast.success("Login succesfully!", {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    })
    return loged
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const logout = createAsyncThunk('sellers/logout', async () => {
  await sellerService.logout()
})

export const sellerSlice = createSlice({
  name: 'sell',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
      state.message = ''
      
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.seller = action.payload
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.seller = null
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.seller = action.payload
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.seller = null
      })
      .addCase(logout.fulfilled, (state) => {
        state.seller = null
      })
      .addCase(forgotpassword.fulfilled, (state) => {
        state.seller = null
      })
  },
})

export const { reset } = sellerSlice.actions
export default sellerSlice.reducer