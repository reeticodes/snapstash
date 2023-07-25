import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function PrivateRoutes() {
    const {authToken} = useSelector((state)=>state.auth)
    return(
            authToken ? <Outlet/> : <Navigate to="/login"/>
        )
}

export default PrivateRoutes