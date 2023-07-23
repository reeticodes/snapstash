import { Fragment, useState , useEffect} from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { store } from './store'
import { Provider } from 'react-redux'

import { useDispatch} from 'react-redux'
//Components
import Header from './Components/Layout/Header'
import Dashboard from './Components/Dashboard'
import Login from './Components/Auth/Login'
import Register from './Components/Auth/Register'

import setAuthToken from './Utils/setAuthToken'
import {loadUser} from './features/auth/authSlice'
import Feed from './Components/Feed/Feed'
function App() {

  if (localStorage.user) {
    setAuthToken(localStorage.user);
  }
  

  useEffect(() => {
  
   store.dispatch(loadUser())
  }, [])
  
  
  return (
    <>
    <Provider store={store}>
    <Router>
        <div>
          <Header/>
          <Routes>
            <Route path='/' element={<Dashboard/>} />
            <Route path='/login' element={<Login/>} />
            <Route path='/register' element={<Register/>} />
            <Route path='/feed' element={<Feed/>} />
          </Routes>
        </div>
      </Router>
      </Provider>
    </>
    
  )
}

export default App


