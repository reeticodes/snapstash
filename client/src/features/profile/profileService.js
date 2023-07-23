import axios from 'axios'

const createProfile = async (profile) => {
    const config ={headers: {'Content-Type' : 'application/json'}}
    const body = JSON.stringify(profile)
    const res = await axios.post('http://localhost:5000/api/profile',body,config)
    console.log(res.data)
    return res.data
}

const getCurrentProfile = async() => {
    const res = await axios.get('http://localhost:5000/api/profile/me');
    console.log(res.data)
    return res.data
}

const profileService = {
    createProfile,
    getCurrentProfile
}

export default profileService