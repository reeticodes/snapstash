import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import albumService from './albumService'

const initialState = {
    album: null,
    albums: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message:''
}
//Create an album
export const createAlbum = createAsyncThunk('album/create', async(album, thunkAPI)=>{
    try {
        return await albumService.createAlbum(album);
    } catch (err) {
        
        const message = err.response.data.errors;
        return thunkAPI.rejectWithValue(message)
    }
})
//get all albums
export const getAllAlbums = createAsyncThunk('/album/getAll', async(thunkAPI)=>{
    try {
        const res = await albumService.getAllAlbums()
        return res
    } catch (err) {
        const message = err.response.data.errors
        console.log(message)
        return thunkAPI.rejectWithValue(message)
    }
})
//get an album by id
export const getAlbumById = createAsyncThunk('/album/id', async(albumId,thunkAPI)=>{
    try {
        const res = await albumService.getAlbumById(albumId)  
        return res;
    } catch (err) {
        const message = err.response.data.errors
        console.log(message)
        return thunkAPI.rejectWithValue(message)
    }
})
//get an album by name
export const getAlbumByName = createAsyncThunk('/album/name', async(name,thunkAPI)=>{
    try {
        const res = await albumService.getAlbumByName(name)  
        return res;
    } catch (err) {
        const message = err.response.data.errors
        console.log(message)
        return thunkAPI.rejectWithValue(message)
    }
})
//get user albums
export const getUserAlbums = createAsyncThunk('/album/user', async(userId,thunkAPI)=>{
    try {
        const res = await albumService.getUserAlbums()
        return res;
    } catch (err) {
        const message = err.response.data.errors
        console.log(message)
        return thunkAPI.rejectWithValue(message)
    }
})
//delete album
export const deleteAlbum = createAsyncThunk('/albums/delete', async(postId,thunkAPI)=>{
    try {
        const res = await albumService.deleteAlbum(albumId)
        return res
    } catch (err) {
        const message = err.response.data.errors
        console.log(message)
        return thunkAPI.rejectWithValue(message)
    }
})

//move post from album
export const movePost = createAsyncThunk('/album/move', async(postData, thunkAPI)=>{
    try {
        console.log(postData)
        const res = await albumService.movePost(postData)
        return res
    } catch (err) {
        const message = err.response.data.errors
        console.log(message)
        return thunkAPI.rejectWithValue(message)
    }
})

export const albumSlice = createSlice({
    name : 'album',
    initialState,
    reducers:{
        reset: (state) =>{
            state.isError = false
            state.isLoading = false
            state.isSuccess = false
            state.message= ''
        }
    },
    extraReducers : (builder) =>{
        builder
        .addCase(createAlbum.pending, (state)=>{
            state.isLoading = true
        })
        .addCase(createAlbum.fulfilled,(state,action)=>{
            state.album = action.payload,
            state.isSuccess = true;
            state.isLoading = false;
        })
        .addCase(createAlbum.rejected, (state,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload
            state.isSuccess = false;
        })

        .addCase(getAllAlbums.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(getAllAlbums.fulfilled,(state,action)=>{
            state.albums = action.payload,
            state.isLoading = false;
        })
        .addCase(getAllAlbums.rejected, (state,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload
            state.albums = []
        })


        .addCase(getAlbumById.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(getAlbumById.fulfilled,(state,action)=>{
            state.album = action.payload,
            state.isLoading = false;
        })
        .addCase(getAlbumById.rejected, (state,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
            state.album = null;
            state.isSuccess = false;
        })
        .addCase(getAlbumByName.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(getAlbumByName.fulfilled,(state,action)=>{
            state.album = action.payload,
            state.isLoading = false;
        })
        .addCase(getAlbumByName.rejected, (state,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
            state.album = null;
            state.isSuccess = false;
        })

        .addCase(getUserAlbums.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(getUserAlbums.fulfilled,(state,action)=>{
            state.albums = action.payload,
            state.isLoading = false;
        })
        .addCase(getUserAlbums.rejected, (state,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload
            state.albums = []
        })

        .addCase(deleteAlbum.pending, (state)=>{
            state.isLoading = true
        })
        .addCase(deleteAlbum.fulfilled,(state,action)=>{
            state.album = null,
            state.isSuccess = true;
            state.isLoading = false;
            message = action.payload
        })
        .addCase(deleteAlbum.rejected, (state,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload
            state.isSuccess = false;
        })
        .addCase(movePost.pending, (state)=>{
            state.isLoading = true
        })
        .addCase(movePost.fulfilled,(state,action)=>{
            state.isSuccess = true;
            state.isLoading = false;
            state.album = action.payload
        })
        .addCase(movePost.rejected, (state,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload
            state.isSuccess = false;
        })

    }
})


export const {reset} = albumSlice.actions
export default albumSlice.reducer