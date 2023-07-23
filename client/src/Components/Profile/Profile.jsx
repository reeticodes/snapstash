import {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getCurrentProfile, reset } from '../../features/profile/profileSlice';


import {Button} from '@mui/material'
import { loadUser } from '../../features/auth/authSlice';


function Profile() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {profile, isLoading, isError} = useSelector((state)=>state.profile)
  const {isAuthenticated, user} = useSelector((state)=>state.auth)

  useEffect(() => {
    console.log(profile)
    if(!profile) navigate('/')
    dispatch(loadUser())
    dispatch(getCurrentProfile)
  }, [])

 const {name,avatar,bio} = profile;

  return (
    <div>
      {name}
      <img style={{borderRadius:'50%', width:'250px'}} src={avatar}/>
      {bio}
    <Button onClick={(e)=>navigate('/create-profile')}>Edit</Button>
    </div>
  )
}

export default Profile