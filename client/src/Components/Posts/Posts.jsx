import {useState,useEffect} from 'react'
import {Stack,Box,Button,Modal,Input, Container, Avatar} from '@mui/material'
import TagInput from './TagInput'
import {useSelector, useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {toast, ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import PostForm from './PostForm'

import {getAllPosts} from '../../features/posts/postSlice'
import {getCurrentProfile} from '../../features/profile/profileSlice'
import {loadUser} from '../../features/auth/authSlice'

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

  const {profile, isLoading: profileLoading} = useSelector((state)=>state.profile)



  useEffect(() => {
    dispatch(loadUser())
    dispatch(getAllPosts())
    dispatch(getCurrentProfile())

    if(isError){
      if(message)
      message.forEach(error => toast.error(error.msg));
    }


   }, [getCurrentProfile, getAllPosts,message, loadUser])


   return (
    ( isLoading || profileLoading || posts===null || profile===null) ? <Spinner/> :
    <div>
      <Container maxWidth="sm" style={{marginTop:'5%'}}>
        <Box>
        <Button onClick={handleOpen}>Upload photo</Button>
        </Box>
        <PostForm open={open} setOpen={setOpen}/>
        <Stack spacing={4}>
          {posts.map((post)=>
          <PostItem
          isLoading={isLoading} 
          profile={profile}
           key={post._id} 
           post = {post}/>
          )}
        

        </Stack>
        <ToastContainer/>
      </Container>
    </div>
  )
}


export default Posts