import { Fragment, useState , useEffect} from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { store } from './store'
import { Provider } from 'react-redux'
import setAuthToken from './Utils/setAuthToken'
import {loadUser} from './features/auth/authSlice'
import PrivateRoutes from './Utils/PrivateRoutes'





//Components
import Header from './Components/Layout/Header'
import Dashboard from './Components/Profile/Dashboard'
import Login from './Components/Auth/Login'
import Register from './Components/Auth/Register'
import Posts from './Components/Posts/Posts'
import CreateProfile from './Components/Profile/CreateProfile'
import Profile from './Components/Profile/Profile'
import Homepage from './Components/Layout/Homepage'
import Album from './Components/Albums/Album'
import PostItem from './Components/Post/PostIem'
import Search from './Components/Search/Search'


function App() {

  if (localStorage.user) {
    setAuthToken(localStorage.user);
  }
  

  useEffect(() => {
    console.log("LOADING USER......")
   store.dispatch(loadUser())
  
  }, [])
  
  
  return (
    <>
    <Provider store={store}>
    <Router>
        <div>
          <Header/>
          <Routes>
            <Route path='/dashboard' element={<Dashboard/>} />
            <Route path='/login' element={<Login/>} />
            <Route path='/create-profile' element={<CreateProfile/>}/>
            <Route path='/register' element={<Register/>} />
            <Route path='/' element = {<Homepage/>}/>

            <Route element={<PrivateRoutes />}>
              <Route path='/search' element = {<Search/>}/>
              <Route path='/posts' element={<Posts/>} />
              <Route path='/post/:id' element={<PostItem/>} />
              <Route path='/profile/:id' element = {<Profile/>}/>
              <Route path='/album/:id' element = {<Album/>}/>            </Route>
            
          </Routes>
        </div>
      </Router>
      </Provider>
    </>
    
  )
}

export default App


