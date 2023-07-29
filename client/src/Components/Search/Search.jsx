import {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'

import TagInput from '../Posts/TagInput'

import {reset, searchPosts} from '../../features/posts/postSlice'

import {Grid, Button} from '@mui/material'

function Search() {

  const dispatch = useDispatch()
  const {posts, isLoading : postLoading, isError : postError} = useSelector((state)=>state.post)


  useEffect(() => {
    dispatch(reset())
  }, [])
  
  let [tags, setTags] = useState([]);
  

  return (
    <Grid container>
      <Grid item xs={12}>
        <TagInput tags={tags} setTags={setTags}/>
        <Button
        onClick={(e)=>dispatch(searchPosts({tags:tags}))}
        >Search</Button>
      </Grid>
      <Grid container spacing={1} sx={{maxWidth:'100%', padding:'10%'}}>
        {posts.map((post)=>
        
          <Grid item xs = {3} key = {post._id}>
             <Link state={{postId : post._id, albumId : post.album}} to={`/post/${post._id}`}>
          <img style={{width:'200px'}} src={post.myfile}/>
          </Link>
          </Grid>
        
        )}
      </Grid>
    </Grid>
  )
}

export default Search