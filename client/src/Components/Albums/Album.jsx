import {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate,useParams} from 'react-router-dom'

import Spinner from '../../Components/Layout/Spinner'
import {getAlbumById} from '../../features/album/albumSlice'
import {getAlbumPosts} from '../../features/posts/postSlice'

import {Grid} from '@mui/material'


function Album() {
    const {id} = useParams();
    const {album,isLoading, isError} = useSelector((state)=>state.album)
    const {posts,isLoading : postLoading, isError : postError} = useSelector((state)=>state.post)
    const dispatch = useDispatch()

    useEffect(() => {
      dispatch(getAlbumById(id))
      dispatch(getAlbumPosts(id))
    }, [getAlbumById,getAlbumPosts])
    
  return (
    album===null || isLoading? <Spinner/> :
    <div>
      {album.name}
      <Grid container spacing={1} sx={{maxWidth:'100%', padding:'10%'}}>
        {posts.map((post)=>
        
          <Grid item xs = {3} key = {post._id}>
          <img style={{width:'200px'}} src={post.myfile}/>
          </Grid>
        
        )}
      </Grid>
    
    </div>
  )
}

export default Album