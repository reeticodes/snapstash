import React from 'react'
import {Card, CardContent, CardActions, Typography, Button} from '@mui/material'

function Post({post}) {
  const {myfile, caption, keywords} = post

  return (
    <Card sx = {{maxWidth: '100%'}}>
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