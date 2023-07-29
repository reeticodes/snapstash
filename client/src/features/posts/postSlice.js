import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import postService from './postService'

const initialState = {
    post:null,
    posts: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message:''
}
//Create a post
export const createPost = createAsyncThunk('post/create', async(post, thunkAPI)=>{
    try {
        console.log('im creating')

        return await postService.createPost(post);
    } catch (err) {
        
        const message = err.response.data.errors;
        return thunkAPI.rejectWithValue(message)
    }
})
//get all posts
export const getAllPosts = createAsyncThunk('/posts/getAll', async(thunkAPI)=>{
    try {
        const res = await postService.getAllPosts()
        return res
    } catch (err) {
        const message = err.response.data.errors
        console.log(message)
        return thunkAPI.rejectWithValue(message)
    }
})
//get post by id
export const getPostById = createAsyncThunk('/post/id', async(postId,thunkAPI)=>{
    try {
        const res = await postService.getPostById(postId)
        return res;
    } catch (err) {
        const message = err.response.data.errors
        console.log(message)
        return thunkAPI.rejectWithValue(message)
    }
})
//get user posts
export const getUserPosts = createAsyncThunk('/posts/user', async(userId,thunkAPI)=>{
    try {
        const res = await postService.getUserPosts(userId)
        return res;
    } catch (err) {
        const message = err.response.data.errors
        console.log(message)
        return thunkAPI.rejectWithValue(message)
    }
})
//get album posts
export const getAlbumPosts = createAsyncThunk('/posts/album', async(albumId,thunkAPI)=>{
    try {
        const res = await postService.getAlbumPosts(albumId)
        return res;
    } catch (err) {
        const message = err.response.data.errors
        console.log(message)
        return thunkAPI.rejectWithValue(message)
    }
})
export const searchPosts = createAsyncThunk('/posts/search', async(tags,thunkAPI)=>{
    try {
        console.log('tring')
        const res = await postService.searchPosts(tags)
        return res;
    } catch (err) {
        const message = err.response.data.errors
        console.log(message)
        return thunkAPI.rejectWithValue(message)
    }
})
//delete post
export const deletePost = createAsyncThunk('/post/delete', async(postId,thunkAPI)=>{
    try {
        const res = await postService.deletePost(postId)
        return res
    } catch (err) {
        const message = err.response.data.errors
        console.log(message)
        return thunkAPI.rejectWithValue(message)
    }
})


//Like a post
export const likePost = createAsyncThunk('/post/like', async(postId, thunkAPI)=>{
    try {
        const res = await postService.likePost(postId)
        console.log(res)
        return res
    } catch (err) {
        const message = err.response.data.errors
        console.log(message)
        return thunkAPI.rejectWithValue(message)
    }
})
//Unlike a post
export const unlikePost = createAsyncThunk('/post/unlike', async(postId, thunkAPI)=>{
    try {
        const res = await postService.unlikePost(postId)
        return res
    } catch (err) {
        const message = err.response.data.errors
        console.log(message)
        return thunkAPI.rejectWithValue(message)
    }
})
//Comment on a post
export const commentPost = createAsyncThunk('/post/comment', async(formData, thunkAPI)=>{
    try {
        const res = await postService.commentPost(formData)
        return res
    } catch (err) {
        const message = err.response.data.errors
        console.log(message)
        return thunkAPI.rejectWithValue(message)
    }
})



export const postSlice = createSlice({
    name : 'post',
    initialState,
    reducers:{
        reset: (state) =>{
            state.posts = [],
            state.isError = false
            state.isLoading = false
            state.isSuccess = false
            state.message= ''
        },
    },
    extraReducers : (builder) =>{
        builder
        .addCase(createPost.pending, (state)=>{
            state.isLoading = true
        })
        .addCase(createPost.fulfilled,(state,action)=>{
            state.post = action.payload,
            state.isSuccess = true;
            state.isLoading = false;
        })
        .addCase(createPost.rejected, (state,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload
            state.isSuccess = false;
        })

        .addCase(getAllPosts.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(getAllPosts.fulfilled,(state,action)=>{
            state.posts = action.payload,
            state.isLoading = false;
        })
        .addCase(getAllPosts.rejected, (state,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload
            state.posts = []
        })

        .addCase(searchPosts.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(searchPosts.fulfilled,(state,action)=>{
            state.posts = action.payload,
            state.isLoading = false;
        })
        .addCase(searchPosts.rejected, (state,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload
            state.posts = []
        })


        .addCase(getPostById.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(getPostById.fulfilled,(state,action)=>{
            state.post = action.payload,
            state.isLoading = false;
        })
        .addCase(getPostById.rejected, (state,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
            state.post = null;
            state.isSuccess = false;
        })

        .addCase(getUserPosts.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(getUserPosts.fulfilled,(state,action)=>{
            state.posts = action.payload,
            state.isLoading = false;
        })
        .addCase(getUserPosts.rejected, (state,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload
            state.posts = []
        })


        .addCase(getAlbumPosts.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(getAlbumPosts.fulfilled,(state,action)=>{
            state.posts = action.payload,
            state.isLoading = false;
        })
        .addCase(getAlbumPosts.rejected, (state,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload
            state.posts = []
        })

        .addCase(deletePost.pending, (state)=>{
            state.isLoading = true
        })
        .addCase(deletePost.fulfilled,(state,action)=>{
            state.post = null,
            state.isSuccess = true;
            state.isLoading = false;
            message = action.payload
        })
        .addCase(deletePost.rejected, (state,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload
            state.isSuccess = false;
        })

        

        .addCase(likePost.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(likePost.fulfilled,(state,action)=>{
            state.post = action.payload,
            state.isLoading = false;
        })
        .addCase(likePost.rejected, (state,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
            state.isSuccess = false;
        })
        .addCase(unlikePost.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(unlikePost.fulfilled,(state,action)=>{
            state.post = action.payload,
            state.isLoading = false;
        })
        .addCase(unlikePost.rejected, (state,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
            state.isSuccess = false;
        })
        .addCase(commentPost.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(commentPost.fulfilled,(state,action)=>{
            state.post = action.payload,
            state.isLoading = false;
            state.isSuccess = true
        })
        .addCase(commentPost.rejected, (state,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
            state.isSuccess = false;
        })

    }
})


export const {reset} = postSlice.actions
export default postSlice.reducer