import {useState} from 'react'
import Posts from '../Posts/Posts'
import PostForm from '../Posts/PostForm'

import {Container,Box, Modal,Button,Stack, Card,CardMedia, CardContent, Typography,CardActions} from '@mui/material'



function Feed() {


  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  

  return (
    <div>
      <Container maxWidth="sm" style={{marginTop:'5%'}}>
        <Box>
        <Button onClick={handleOpen}>Upload photo</Button>
        </Box>
        <PostForm open={open} setOpen={setOpen}/>
        <Posts/>
      </Container>
    </div>
  )
}

export default Feed