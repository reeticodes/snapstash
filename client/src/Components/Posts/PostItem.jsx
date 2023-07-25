import {useState, useEffect} from 'react'
import {Card,Avatar,CardHeader, CardContent, CardActions, Typography, Button} from '@mui/material'
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import Spinner from '../Layout/Spinner'
import {useDispatch, useSelector} from 'react-redux'
import {getCurrentProfile} from '../../features/profile/profileSlice'
function Post({post}) {

  const {profile, isLoading} = useSelector((state)=>state.profile)
  const dispatch = useDispatch()

  const {myfile, caption, keywords} = post

  useEffect(() => {
    console.log('what the fuck')
    dispatch(getCurrentProfile())
  }, [getCurrentProfile])
  

  return (
    isLoading || profile===null ? <Spinner/> :
    <Card sx = {{maxWidth: '100%'}}>
      <CardHeader
        avatar={
          <Avatar src={profile.avatar}/>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={post.caption}
        subheader={post.date}
      />
    <img src={myfile}/>
    <CardContent>
      <Typography>
        {caption}
      </Typography>
    </CardContent>
    <CardActions>
      <Button size = "small">Like</Button>
      <Button size = "small">Comment</Button>
    </CardActions>
   </Card>
  )
}

export default Post