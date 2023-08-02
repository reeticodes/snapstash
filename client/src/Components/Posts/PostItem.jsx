import {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import moment from 'moment'

import {Card,Avatar,CardHeader, CardContent, CardActions, Typography, Button} from '@mui/material'
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {useDispatch, useSelector} from 'react-redux'

import {likePost, unlikePost, commentPost} from '../../features/posts/postSlice'
import {} from '../../features/profile/profileSlice'

import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import {toast, ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


function Post({isLoading,post, profile}) {

  useEffect(() => {
    
  }, [])
  
  

  const dispatch = useDispatch()

  const {myfile, caption, keywords} = post


  

   const handleLike = () => {
      dispatch(likePost(post._id))
   }
   const handleUnlike = () => {
    dispatch(unlikePost(post._id))
 }



  return (
    <Card sx = {{maxWidth: '100%'}}>
      <CardHeader
        avatar={
          <Avatar src={post.avatar}/>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={post.name}
        subheader={moment(post.date).format('DD/MM/YYYY')}
      />
    <img src={myfile}/>
    <CardContent>
      <Typography>
        {caption}
      </Typography>
    </CardContent>
    <CardActions>
      <Button
      onClick={()=>dispatch(likePost(post._id))}> 
      <span>👍</span>
				<span>
          {post.likes.length > 0 && <span>{post.likes.length}</span>}
        </span>
      </Button>

      <Button onClick={() => dispatch(unlikePost(post._id))}>
				<span>👎</span>
			</Button>
        
        <Link state={{ postId : post._id, albumId : post.album}} to={`/post/${post._id}`}>
           <Button size = "small" >
           <span>💬</span>
<span>{post.comments.length>0 && <span>{post.comments.length}</span> }</span>
           </Button>
        </Link>
      
      
      
    </CardActions>
    <ToastContainer/>
   </Card>
  )
}

export default Post