import axios from 'axios'

const createProfile = async (profile) => {
    console.log(profile)
    const config ={headers: {'Content-Type' : 'multipart/form-data'}}
    const res = await axios.post('http://localhost:5000/api/profile',profile,config)
    return res.data
}

const getCurrentProfile = async() => {
    const res = await axios.get('http://localhost:5000/api/profile/me');
    return res.data
}

const profileService = {
    createProfile,
    getCurrentProfile
}

export default profileService