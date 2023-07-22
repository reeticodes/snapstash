import { Fragment, useState } from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { store } from './store'
import { Provider } from 'react-redux'

//Components
import Header from './Components/Layout/Header'
import Dashboard from './Components/Dashboard'
import Login from './Components/Auth/Login'
import Register from './Components/Auth/Register'


function App() {
  
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
          </Routes>
        </div>
      </Router>
      </Provider>
    </>
    
  )
}

export default App


