import {useState,useEffect} from 'react'
import {Stack,Button,Modal,Input, Container, Avatar} from '@mui/material'
import TagInput from './TagInput'
import {useSelector, useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {toast, ToastContainer} from 'react-toastify'

import {getAllPosts} from '../../features/posts/postSlice'
import Spinner from '../Layout/Spinner'
import PostItem from './PostItem'

function Posts() {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {
    posts,
    isError,
    isLoading,
    isSuccess,
    message,
    
  } = useSelector((state) => state.post)

  const [Posts, setposts] = useState([])

  useEffect(() => {
    dispatch(getAllPosts())

    if(isError){
      if(message)
      message.forEach(error => toast.error(error.msg));
    }

   }, [message, isSuccess, getAllPosts, isError])
  

  return isLoading ? <Spinner/> : (
    <Stack spacing={4}>
      {posts.map((post)=>
      <PostItem key={post._id} post = {post}/>
      )}
     

      </Stack>
  )
}

export default Posts