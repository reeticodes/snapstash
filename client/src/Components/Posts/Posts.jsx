import {useState,useEffect} from 'react'
import {Stack,Box,Button,Modal,Input, Container, Avatar} from '@mui/material'
import TagInput from './TagInput'
import {useSelector, useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {toast, ToastContainer} from 'react-toastify'

import PostForm from './PostForm'

import {getAllPosts} from '../../features/posts/postSlice'
import Spinner from '../Layout/Spinner'
import PostItem from './PostItem'

function Posts() {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);


  const {
    posts,
    isError,
    isLoading,
    isSuccess,
    message,
    
  } = useSelector((state) => state.post)


  useEffect(() => {
    dispatch(getAllPosts())

    if(isError){
      if(message)
      message.forEach(error => toast.error(error.msg));
    }


   }, [getAllPosts,message, isError])


   return (
    isLoading || posts===null ? <Spinner/> :
    <div>
      <Container maxWidth="sm" style={{marginTop:'5%'}}>
        <Box>
        <Button onClick={handleOpen}>Upload photo</Button>
        </Box>
        <PostForm open={open} setOpen={setOpen}/>
        <Stack spacing={4}>
          {posts.map((post)=>
          <PostItem key={post._id} post = {post}/>
          )}
        

        </Stack>
      </Container>
    </div>
  )
}


export default Posts