import { configureStore } from '@reduxjs/toolkit'
import authReducer from './features/auth/authSlice'
import profileReducer from './features/profile/profileSlice'
import postReducer from './features/posts/postSlice'
import albumReducer from './features/album/albumSlice'

export const store = configureStore({
  reducer: {
    auth : authReducer,
    profile : profileReducer,
    post : postReducer,
    album : albumReducer
  }
})