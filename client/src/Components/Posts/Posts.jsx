import React from 'react'
import PostItem from './PostItem'
import {Card,Stack,Button, CardContent, CardActions, Typography} from '@mui/material'

function Posts() {
  return (
    <Stack spacing={4}>
       <Card sx = {{maxWidth: '100%'}}>
        <img src='https://images.unsplash.com/photo-1551963831-b3b1ca40c98e'/>
        <CardContent>
          <Typography>
            Food
          </Typography>
        </CardContent>
        <CardActions>
          <Button size = "small">Like</Button>
          <Button size = "small">Comment</Button>
        </CardActions>
       </Card>

      </Stack>
  )
}

export default Posts