import axios from 'axios'


const createPost = async(post) =>{
   
    const config ={headers: { 'Content-Type' : 'multipart/form-data' }}
    const res = await axios.post('http://localhost:5000/api/posts',post,config);
    console.log(res.data)
    return res.data
}
const getAllPosts = async() => {
    const res = await axios.get('http://localhost:5000/api/posts')
    return res.data
}

const getPostById = async(postId) => {
    const res = await axios.get(`http://localhost:5000/api/posts/${postId}`);
    return res.data
}
const getUserPosts = async(userId) => {
    const res = await axios.get(`http://localhost:5000/api/posts/user/${userId}`);
    return res.data
}
const getAlbumPosts = async(albumId) => {
    const res = await axios.get(`http://localhost:5000/api/posts/album/${albumId}`);
    return res.data
}
const deletePost = async(postId) => {
    const res = await axios.delete(`http://localhost:5000/api/posts/${postId}`)
    return res.data
}


const likePost = async(postId) =>{
    const config ={headers: { 'Content-Type' : 'Application/json' }}
    const res = await axios.put(`http://localhost:5000/api/posts/like/${postId}`,config)

    return res.data
}

const unlikePost = async(postId) =>{
    const res = await axios.put(`http://localhost:5000/api/posts/unlike/${postId}`)
    return res.data
}
const commentPost = async({postId, text}) =>{
    console.log(postId)
    console.log(text)
    console.log('making request....')
    const config ={headers: { 'Content-Type' : 'application/json' }}
    const body = JSON.stringify({text})
    console.log('making request....')
    const res = await axios.post(`http://localhost:5000/api/posts/comment/${postId}`,body, config)
    console.log(res)
    return res.data
}


const authService = {
    createPost,
    getAllPosts,
    getPostById,
    getUserPosts,
    getAlbumPosts,
    deletePost,
    likePost,
    unlikePost,
    commentPost
}

export default authService