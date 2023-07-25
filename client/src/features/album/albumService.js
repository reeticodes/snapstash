import axios from 'axios'


const createAlbum = async(album) =>{
    const config ={headers: { 'Content-Type' : 'application/json' }}
    const body = JSON.stringify(album)
    const res = await axios.post('http://localhost:5000/api/albums',body,config);
    console.log(res.data)
    return res.data
}
const getAllAlbums = async() => {
    const res = await axios.get('http://localhost:5000/api/albums')
    console.log(res.data)
    return res.data
}

const getAlbumById = async(albumId) => {
    const res = await axios.get(`http://localhost:5000/api/albums/${albumId}`);
    return res.data
}
const getUserAlbums = async(userId) => {
    const res = await axios.get(`http://localhost:5000/api/albums/user/${userId}`);
    return res.data
}
const deleteAlbum = async(albumId) => {
    const res = await axios.delete(`http://localhost:5000/api/albums/${albumId}`)
    return res
}



const authService = {
    createAlbum,
    getAllAlbums,
    getAlbumById,
    getUserAlbums,
    deleteAlbum
}

export default authService