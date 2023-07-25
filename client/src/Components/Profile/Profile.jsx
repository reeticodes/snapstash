import {useState, useEffect} from 'react'
import { useNavigate ,Link} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getCurrentProfile, reset } from '../../features/profile/profileSlice';
import { loadUser } from '../../features/auth/authSlice';

import {Edit} from '@mui/icons-material'
import {Container,Button, Paper, Grid, Card, CardMedia, CardActionArea, CardContent, Typography} from '@mui/material'
import AlbumFeed from './AlbumFeed';

function Profile() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {profile, isLoading, isError} = useSelector((state)=>state.profile)
  const {isAuthenticated, user} = useSelector((state)=>state.auth)

  useEffect(() => {
    if(!profile) navigate('/')
    dispatch(loadUser())
    dispatch(getCurrentProfile)
  }, [getCurrentProfile, loadUser])

 const {name,avatar,bio} = profile;

  return (
    <Container sx={{backgroundColor:'inherit', maxWidth:'60%'}}>
      <Grid container spacing = {2}>
      <Grid item xs={11}>
        <div style={
          {
            display:'flex',flexDirection:'column', alignItems:'center',
            padding:'20px'
          }}>
            <img src = {avatar} style={{width:'220px',
            borderRadius:'50%'}} />
            <Typography sx={{fontSize:'29px'}}>{name}</Typography>
            <Typography sx={{fontSize:'20px'}}>{bio}</Typography>
        </div>
      </Grid>
        <Grid item xs={1}>
        <Link to='/create-profile'>
        <Button variant="outlined"
        sx={{marginTop:'20px'}}
         startIcon={<Edit />}>  Edit</Button>
         </Link> 

        </Grid>
      
  
      <Grid item xs={12}><AlbumFeed/></Grid>
      </Grid>
    </Container>
  )
}

export default Profile