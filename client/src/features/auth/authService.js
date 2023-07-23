    import axios from 'axios'


    //Register user
    const register = async(userData) =>{
        const config ={
            headers: {
              'Content-Type' : 'application/json',
            }
          }
        const body = JSON.stringify(userData)
        const response = await axios.post('http://localhost:5000/api/users'
        , body, config);
        
        if(response.data){
            localStorage.setItem('token',response.data.token)
        }
        return response.data.token
    }
    //login user
    const login = async(userData)=>{
      const config ={
        headers: {
          'Content-Type' : 'application/json',
        }
      }
    const body = JSON.stringify(userData)
    const response = await axios.post('http://localhost:5000/api/auth'
    , body, config);
    
    if(response.data){
        localStorage.setItem('token', response.data.token)
    }
    return response.data.token
    }

    //logout user 
    const logout = async()=>{
      localStorage.removeItem('token')
    }

    //load user
    const getUser = async() =>{
      const res = await axios.get('http://localhost:5000/api/auth')
      return res.data;
    }



    const authService = {
        register,
        login,
        logout,
        getUser
    }

    export default authService