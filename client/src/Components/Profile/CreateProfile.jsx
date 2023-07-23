import {useState,Fragment, useEffect} from 'react';
import {Fab, Button,Avatar,Input,FormControlLabel,Link,Checkbox, CssBaseline,TextField,Box, Grid,Typography,Container} from '@mui/material'

import { createTheme, ThemeProvider } from '@mui/material/styles';
import {toast, ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Spinner from '../Layout/Spinner'

import {useSelector, useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {createProfile, reset} from '../../features/profile/profileSlice'
import { loadUser } from '../../features/auth/authSlice';



const defaultTheme = createTheme();


export default function CreateProfile() {
  const {
    profile,
    isError,
    isLoading,
    isAuthenticated,
    isSuccess,
    message
  } = useSelector((state) => state.profile)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [avatar, setAvatar] = useState(profile===null? '': profile.avatar)
  const [name, setname] = useState(profile===null? '': profile.name)
  const [bio, setbio] = useState(profile===null? '': profile.bio)

  useEffect(() => {

    dispatch(loadUser())

    if(isError){
      if(message)
      message.forEach(error => toast.error(error.msg));
    }
    if(isSuccess) toast.success('Updated')
  }, [ avatar, message,isAuthenticated, isError, isSuccess, navigate, dispatch])
  
  const handleFileUpload = async(e) =>{
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    setAvatar(base64)
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const profileData = {
      name,bio,avatar
    }
    console.log(profileData)
    dispatch(createProfile(profileData))
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <Box
            sx={{
                padding:'15px',
                backgroundColor:'#DFD7BF',
                marginTop: 8,
            }}
        >
        <Typography variant="h6">Create you profile</Typography>
        <Box
          sx={{
            padding:'15px',
            display: 'flex',
            
            flexDirection: 'column',
            alignItems: 'center',
          }}
        > 
        <label  htmlFor="upload-photo">
                <Avatar 
                src={avatar}
                sx={{height:'200px', width:'200px', m: 1, bgcolor: '#CCEEBC' }}>
                </Avatar>
                <input
                type="file"
                name="profilepic"
                accept=".jpeg, .png, .jpg"
                onChange={(e)=> handleFileUpload(e)}
                style={{ display: "none"}}
                id="upload-photo"
                />
            </label>
          <Box sx={{ mt: 1 }}>
          <TextField
              margin="normal"
              required
              fullWidth
              name="name"
              label="Name"
              value={name}
              id="name"
              onChange = {(e)=>{setname(e.target.value)}}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="bio"
              label="bio"
              name="bio"
              value={bio}
              autoFocus
              onChange = {(e)=>{setbio(e.target.value)}}
            />
            
            
            <Button
              type="submit"
              variant="contained"
              sx={{ mt: 3, mb: 2, backgroundColor:'#3F2305' }}
              onClick={handleSubmit}
            >
              Submit
            </Button>
            
          </Box>
        </Box>
        </Box>
       
        <ToastContainer/>
      </Container>
    </ThemeProvider>
  );
}


function convertToBase64(file){
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result)
      };
      fileReader.onerror = (error) => {
        reject(error)
      }
    })
  }