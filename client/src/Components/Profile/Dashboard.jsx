import React, { useEffect, Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import Spinner from '../../Components/Layout/Spinner'
import { getCurrentProfile, reset } from '../../features/profile/profileSlice';
import CreateProfile from './CreateProfile'
import Profile from './Profile'
import { useDispatch, useSelector } from 'react-redux'


function Dashboard() {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {
    profile,
    isLoading,
    isSuccess,
    message
  } = useSelector((state) => state.profile)

  const {
    isAuthenticated,
    user
  } = useSelector((state) => state.auth)

  useEffect(() => {
    dispatch(getCurrentProfile())

  }, [getCurrentProfile])
  

  return isLoading && profile === null ? (
    <Spinner/>
   ) : (
    <Fragment>
      {profile !== null ? navigate(`/profile/${user._id}`): 
        navigate('/create-profile')
      }
    </Fragment>
   )
}

export default Dashboard