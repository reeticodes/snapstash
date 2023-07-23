import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import authService from './authService'
import setAuthToken from '../../Utils/setAuthToken'

//Get user from localStorage
const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
    user : null,
    authToken: null,
    isAuthenticated: null,
    isError: false,
    isSuccess : false,
    isLoading: false,
    message: ''
}

//Register user
export const register = createAsyncThunk('auth/register', async(user, thunkAPI)=>{
    try {
        return await authService.register(user);
    } catch (err) {
        
        const message = err.response.data.errors;
        return thunkAPI.rejectWithValue(message)
    }
})

//Login user
export const login = createAsyncThunk('auth/login',async(user, thunkAPI)=>{
    try {
        return await authService.login(user)
    } catch (err) {
        const message = err.response.data.errors;
        return thunkAPI.rejectWithValue(message)
    }
})

//Logout
export const logout = createAsyncThunk('/auth/logout/', async(user, thunkAPI)=>{
    try {
        return await authService.logout(user)
    } catch (err) {
        const message = err.response.data.errors;
        return thunkAPI.rejectWithValue(message)
    }
})

//loadUser
export const loadUser = createAsyncThunk('/auth/loadUser', async()=>{


    if(localStorage.token){
        setAuthToken(localStorage.token)
    }
    try {
        return await authService.getUser()
    } catch (err) {
        const message = err.response.data.errors;
        return thunkAPI.rejectWithValue(message)
    }
})


export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{
        reset : (state) =>{
          state.isError = false
          state.isLoading = false
          state.isSuccess =  false
          state.message = ''  
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(register.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(register.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.authToken = action.payload
        })
        .addCase(register.rejected, (state,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.authToken = null;
            state.message = action.payload
        })
        .addCase(login.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(login.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.authToken = action.payload
        })
        .addCase(login.rejected, (state,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.authToken = null;
            state.message = action.payload
        })
        .addCase(logout.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(logout.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.user = null
            state.authToken = null
            state.isAuthenticated = false;
        })
        .addCase(logout.rejected, (state,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload
        })
        .addCase(loadUser.fulfilled, (state, action)=>{
            state.isSuccess = true;
            state.user = action.payload;
            state.isAuthenticated = true;
            state.isLoading = false;
        })
        .addCase(loadUser.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(loadUser.rejected, (state,action)=>{
            state.isLoading = false;
            state.message = action.payload;
            state.user = null;
            state.isAuthenticated = false;
        })
    }
})

export const {reset} = authSlice.actions
export default authSlice.reducer