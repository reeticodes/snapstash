import { useEffect } from 'react'; 
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/PanoramaHorizontalSharp';


import {toast, ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Spinner from '../../Components/Layout/Spinner'
import {Link} from 'react-router-dom'
import {logout, reset} from '../../features/auth/authSlice'
import { useSelector, useDispatch} from 'react-redux/';
import {useNavigate} from 'react-router-dom'

export default function ButtonAppBar() {
  const {user,isError,isAuthenticated, isLoading, isSuccess, message} = useSelector(
    (state) => state.auth
  )
  const navigate = useNavigate()
  const dispatch = useDispatch()
  useEffect(() => {
    if(isError){
      message.forEach(error => toast.error(error.msg));
    }
    dispatch(reset())
  }, [isError,isSuccess,isAuthenticated,user,navigate,dispatch])
  

  const onClick =() =>{
    dispatch(logout())
    navigate('/')
  }


  const guestLinks = (
    <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon/>
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to='/'>
            ImageGallery
            </Link>
          </Typography>
          <Button color="inherit"> <Link to='/login'>Login</Link> </Button>
          <Button color="inherit"> <Link to='/register'>Register</Link> </Button>
        </Toolbar>
  );
  const authLinks = (
    <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon/>
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to='/'>
            ImageGallery
            </Link>
          </Typography>
          <Button color="inherit"> <Link onClick={onClick}>Logout</Link> </Button>
          
        </Toolbar>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar  sx={{backgroundColor: "purple"}} position="static">
       <span></span> {user ? authLinks : guestLinks }
      </AppBar>
    </Box>
  );
}
