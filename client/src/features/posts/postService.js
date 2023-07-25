import axios from 'axios'


const createPost = async(post) =>{
    console.log('heloooooo')
    console.log(post.get("caption"))
    const config ={headers: { 'Content-Type' : 'multipart/form-data' }}
    const res = await axios.post('http://localhost:5000/api/posts',post,config);
    console.log(res.data)
    return res.data
}
const getAllPosts = async() => {
    const res = await axios.get('http://localhost:5000/api/posts')
    console.log(res.data)
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
const deletePost = async(postId) => {
    const res = await axios.delete(`http://localhost:5000/api/posts/${postId}`)
    return res
}
const moveAlbum = async(postData) =>{
    const {postId, newAlbumId} = postData;
    const res = await axios.put('http://localhost:5000/api/posts/changeAlbum')
    return res
}


const likePost = async(postId) =>{
    const res = await axios.put(`http://localhost:5000/api/posts/like/${postId}`)
    return res;
}

const unlikePost = async(postId) =>{
    const res = await axios.put(`http://localhost:5000/api/posts/unlike/${postId}`)
    return res;
}
const commentPost = async(formData) =>{
    const {postId, text} = formData
    const config ={headers: { 'Content-Type' : 'application/json' }}
    const body = JSON.stringify(text)
    const res = await axios.post(`http://localhost:5000/api/posts/unlike/${postId}`, body, config)
    return res;
}


const authService = {
    createPost,
    getAllPosts,
    getPostById,
    getUserPosts,
    deletePost,
    moveAlbum,
    likePost,
    unlikePost,
    commentPost
}

export default authService