import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import profileService from './profileService'

const initialState = {
    profile : null,
    profiles : [],
    isError: false,
    isSuccess : false,
    isLoading: false,
    message: ''
}

//Create profile
export const createProfile = createAsyncThunk('/profile/create', async(profile,thunkAPI)=>{
    try {
        const res = await profileService.createProfile(profile)
        return res
    } catch (err) {
        const message = err.response.data.errors
        console.log(message)
        return thunkAPI.rejectWithValue(message)
    }
})
//get all profiles
export const getAllProfiles = createAsyncThunk('/profile/getAll', async(thunkAPI)=>{
    try {
        const res = await profileService.getAllProfiles()
        return res
    } catch (err) {
        const message = err.response.data.errors
        console.log(message)
        return thunkAPI.rejectWithValue(message)
    }
})
//get profile of current user
export const getCurrentProfile = createAsyncThunk('/profile/me', async(thunkAPI)=>{
    try {
        const res = await profileService.getCurrentProfile()
        return res;
    } catch (err) {
        const message = err.response.data.errors || err.response.data.msg
        console.log(message)
        return thunkAPI.rejectWithValue(message)
    }
})
//get profile by user id
export const getProfileById = createAsyncThunk('/profile/id', async(userId,thunkAPI)=>{
    try {
        const res = await profileService.getProfileById(userId)
        return res;
    } catch (err) {
        const message = err.response.data.errors
        console.log(message)
        return thunkAPI.rejectWithValue(message)
    }
})


//get profile's albums
// export const getProfileAlbums = createAsyncThunk('/profile/me', async(userId,thunkAPI)=>{
//     try {
//         const res = await profileService.getProfileAlbums(userId)
//         return res;
//     } catch (err) {
//         const message = err.response.data.errors
//         console.log(message)
//         return thunkAPI.rejectWithValue(message)
//     }
// })


export const profileSlice = createSlice({
    name : 'profile',
    initialState,
    reducers:{
        reset : (state) => {
            state.profile = null
            state.profiles = []
            state.isError = false
            state.isLoading = false
            state.isSuccess =  false
            state.message = '' 
        }
    },
    extraReducers : (builder) => {
            
            builder
            .addCase(createProfile.pending, (state)=>{
                state.isLoading = true;
            })
            .addCase(createProfile.fulfilled,(state,action)=>{
                state.profile = action.payload,
                state.isSuccess = true;
                state.isLoading = false;
            })
            .addCase(createProfile.rejected, (state,action)=>{
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload
                state.isSuccess = false;
            })

            .addCase(getAllProfiles.pending, (state)=>{
                state.isLoading = true;
            })
            .addCase(getAllProfiles.fulfilled,(state,action)=>{
                state.profiles = action.payload,
                state.isLoading = false;
            })
            .addCase(getAllProfiles.rejected, (state,action)=>{
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload
                state.profiles = []
            })

            .addCase(getCurrentProfile.pending, (state)=>{
                state.isLoading = true;
            })
            .addCase(getCurrentProfile.fulfilled,(state,action)=>{
                state.profile = action.payload,
                state.isLoading = false;
            })
            .addCase(getCurrentProfile.rejected, (state,action)=>{
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.profile = null;
                state.isSuccess = false;
            })


            .addCase(getProfileById.pending, (state)=>{
                state.isLoading = true;
            })
            .addCase(getProfileById.fulfilled,(state,action)=>{
                state.profile = action.payload,
                state.isLoading = false;
            })
            .addCase(getProfileById.rejected, (state,action)=>{
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.profile = null;
            })
            

            

        }
    
})



export const {reset} = profileSlice.actions
export default profileSlice.reducer