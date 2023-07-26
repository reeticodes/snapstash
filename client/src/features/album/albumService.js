import axios from 'axios'


const createAlbum = async(album) =>{
    const name = album
    const config ={headers: { 'Content-Type' : 'application/json' }}
    const body = JSON.stringify(album)
    const res = await axios.post('http://localhost:5000/api/albums',{name},config);
    return res.data
}
const getAllAlbums = async() => {
    const res = await axios.get('http://localhost:5000/api/albums')
    return res.data
}

const getAlbumById = async(albumId) => {
    const res = await axios.get(`http://localhost:5000/api/albums/${albumId}`);
    return res.data
}
const getAlbumByName = async(name) => {
    console.log(name)
    const res = await axios.get(`http://localhost:5000/api/albums/${name}`);
    console.log(res.data)
    return res.data
}
const getUserAlbums = async() => {
    const res = await axios.get(`http://localhost:5000/api/albums/user`);
    return res.data
}
const deleteAlbum = async(albumId) => {
    const res = await axios.delete(`http://localhost:5000/api/albums/${albumId}`)
    return res
}
const movePost = async(postData) =>{
    
    const config ={headers: { 'Content-Type' : 'Application/json' }}
    const body = JSON.stringify(postData)
    const res = await axios.put('http://localhost:5000/api/albums/', body, config)
    console.log(res.data)
    return res.data
}




const authService = {
    createAlbum,
    getAllAlbums,
    getAlbumById,
    getUserAlbums,
    deleteAlbum,
    getAlbumByName,
    movePost
}

export default authService