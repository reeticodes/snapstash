import React, { useState, useEffect } from 'react'
import {Link, useNavigate, useParams, useLocation} from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import moment from 'moment'
import {toast} from 'react-toastify'
import {getPostById, deletePost,likePost, unlikePost, commentPost} from '../../features/posts/postSlice'
import {getCurrentProfile, getProfileById} from '../../features/profile/profileSlice'
import {getAlbumById, getUserAlbums,movePost} from '../../features/album/albumSlice'

import {FormControl, InputLabel, Select, MenuItem,
  Grid,Button, Container, Card,Avatar,Typography, CardActions, CardContent, CardMedia, CardHeader, TextField} from '@mui/material'
import { styled } from '@mui/material/styles';

import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Spinner from '../Layout/Spinner'



const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));



function PostIem(props) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation();



  const {id} = useParams();

  // const profile = location.state.profile
  const postId = location.state.postId

  const handleComment = () =>{
    const formData = {postId, text}
    dispatch(commentPost(formData))
  }

  const {profile, isLoading : profileLoading} = useSelector((state)=>state.profile)
  const { post,isLoading, isSuccess} = useSelector((state)=>state.post)
  const {album,albums, isLoading: albumLoading} = useSelector((state)=>state.album)


  const [action, setaction] = useState(false)
  const [text, settext] = useState('')
  

  useEffect(() => {
    dispatch(getPostById(location.state.postId))
    dispatch(getAlbumById(location.state.albumId))
    dispatch(getUserAlbums())
    
  
  }, [])


  const handleDelete = () =>{
    dispatch(deletePost(id))
    navigate('/posts')
  }
  const handleAlbumchange = (e) =>{

    const newALbumId = (event.target.getAttribute('albumid'));
    const formData = {
      postId : id,
      albumId : newALbumId
    }
    dispatch(movePost(formData))
  }
  return (
    (isLoading || profile===null || albumLoading || post===null ||album===null)  ? <Spinner/> :
    <Grid container spacing={2} sx={{
      display:'flex',
      alignItems:'center',
      maxWidth:'40%',
      justifyContent:'center',
      marginLeft:'30%'
    }}>

      <Grid item xs={12}>
    <Card sx={{ maxWidth:'100%', marginTop:'20px'}}>
      <CardHeader
        avatar={
          <Avatar src={post.avatar}>
            R
          </Avatar>
        }
        action={
          post.user === profile.user._id &&
            <FormControl fullWidth>
            <InputLabel >Album</InputLabel>
            <Select
              value={album.name}
              label="Album"
              onChange={handleAlbumchange}
            >
              
              {
              albums.map((album)=>
              (<MenuItem
                 key={album._id}
                 name={album.name}
                 value={album.name}
                 albumid = {album._id}
                 onClick={handleAlbumchange}
                 >
                  {album.name}
                </MenuItem>))
              }
            
            </Select>
          </FormControl>
                  
        }
        title={post.name}
        subheader={moment(post.date).format('DD/MM/YYYY')}
      />
      <CardMedia
        component="img"
        height="194"
        image={post.myfile}
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {post.caption}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
      <Button
      onClick={()=>{
        setaction(!action)
        dispatch(likePost(id))}}> 
      <span>👍</span>
				<span>
          {post.likes && <span>{post.likes.length}</span>}
        </span>
      </Button>
      <Button onClick={() =>{
        setaction(!action)
         dispatch(unlikePost(id))}}>
				<span>👎</span>
			</Button>
      <Button size = "small" >
           <span>💬</span>
<span>{post.comments&& <span>{post.comments.length}</span> }</span>
           </Button>
           <Link to={post.myfile}><Button>download</Button></Link>
           

      {post.user===profile.user._id && 
        <Button>
          <span onClick={()=>handleDelete()}>🗑️</span>
        </Button>
      }
       
       
      </CardActions>
      </Card>
      </Grid>
      <Grid item xs = {12}>
        <Card sx={{padding:'20px', height:'150px'}}>
          <div style={{display:'flex', justifyContent:'space-between'}}>
            <Avatar  src={profile.avatar}/>
          <TextField
          name="comment" value={text}
          onChange={(e)=>settext(e.target.value)}
           multiline maxRows={4} sx={{width:'80%', marginBottom:'20px'}}/>
          </div>
          
           <Button
           onClick={(e)=> handleComment()}
            variant='outlined' sx={{float:'right'}}>Comment</Button>
        </Card>
      </Grid>
      <Grid item xs={12}>

          {post.comments && post.comments.map((comment)=>
              <Card key={comment._id}>
              <CardHeader
                avatar={
                  <Avatar src={comment.avatar}>
                    R
                  </Avatar>
                }
              
                title={comment.name}
                subheader=""
              />
              <CardContent>{comment.text}</CardContent>
            
              </Card>
          )}
          
       
    
   
      </Grid>
        
    </Grid>
  )
}

export default PostIem