import {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate,useParams,Link} from 'react-router-dom'

import Spinner from '../../Components/Layout/Spinner'
import {getAlbumById} from '../../features/album/albumSlice'
import {getAlbumPosts} from '../../features/posts/postSlice'

import {Grid, Button,Typography} from '@mui/material'
import {toast, ToastContainer} from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'


function Album() {
    const {id} = useParams();
    const {user} = useSelector((state)=>state.auth)
    const {album,isLoading, isError} = useSelector((state)=>state.album)
    const {posts,isLoading : postLoading, isError : postError} = useSelector((state)=>state.post)
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);

    useEffect(() => {
      dispatch(getAlbumById(id))
      dispatch(getAlbumPosts(id))
    }, [getAlbumById,getAlbumPosts])

 
    
  return (
    album===null || isLoading? <Spinner/> :
    <div style={{margin:'10px'}}>
      <Typography variant='h5'>
        {album.name}
      </Typography>
     
      <Grid container spacing={1} sx={{maxWidth:'100%', padding:'10%'}}>
        {posts.map((post)=>
        
          <Grid item xs = {3} key = {post._id}>
             <Link to={`/post/${post._id}`}>
          <img style={{width:'200px'}} src={post.myfile}/>
          </Link>
          </Grid>
        
        )}
      </Grid>
      <ToastContainer/>
    
    </div>
  )
}

export default Album