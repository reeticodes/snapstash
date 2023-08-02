import {useState,Fragment, useEffect} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {toast, ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Spinner from '../../Components/Layout/Spinner'



import {useSelector, useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {login,loadUser, reset} from '../../features/auth/authSlice'




const defaultTheme = createTheme();




export default function Login() {

  const {
    user,
    isError,
    authToken,
    isLoading,
    isAuthenticated,
    isSuccess,
    message
  } = useSelector((state) => state.auth)
  
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    if(isError){
      
      message.forEach(error => toast.error(error.msg));
  
    }
    if(isSuccess || user && authToken) {
      dispatch(loadUser())
       navigate('/posts')
    }
    dispatch(reset())
  
  }, [user,authToken, message,isAuthenticated, isError, isSuccess, navigate, dispatch])
  

  const [formData, setformData] = useState({
    email : '',
    password : ''
  })


  const onChange = (e) => {
    setformData((prevState)=>({
      ...prevState,
      [e.target.name] : e.target.value
    }))
  }

  

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(login(formData))
  };



  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange = {onChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange = {onChange}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <ToastContainer/>
      </Container>
    </ThemeProvider>
  );
}