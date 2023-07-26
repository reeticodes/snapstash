import {useState,useEffect} from 'react'
import {Button,FormControl, InputLabel, Select, MenuItem,Modal,Input, Container, Avatar, Grid, Card, TextField, Typography} from '@mui/material'
import TagInput from './TagInput'
import {useSelector, useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {toast, ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import {createPost} from '../../features/posts/postSlice'
import {getAlbumById,getAlbumByName, getUserAlbums,movePost} from '../../features/album/albumSlice'

import Spinner from '../Layout/Spinner'

const style = {
    display:'flex',
    justifyContent:'center',
    alignContent:'center',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '60%',
    height :'70%',
    bgcolor: 'background.paper',
    boxShadow: 24,
    padding: 4,
    borderRadius:'5px'
    
  };

  const InputStyle = {
    color:'red'
  }
  

function PostForm({open, setOpen}) {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {
    post,
    isError,
    isLoading,
    isSuccess,
    message
  } = useSelector((state) => state.post)
  const {
    albums
    , isLoading:albumLoading
  } = useSelector((state) => state.album)
  
  const formData = new FormData();

  const [caption, setCaption] = useState("");
  let [myfile, setmyfile] = useState("https://www.aig.ie/content/aig/emea/ie/en/existing-customers/myaig/_jcr_content/root/responsivegrid/container_copy/teaserflex_copy_copy.coreimg.90.1024.png/1629824897918/icon-upload-documents-540x180-min.png")
  let [tags, setTags] = useState([]);
  const [imageURL, setimageURL] = useState(null)
  const [albumId, setalbumId] = useState('')
  const [albumName, setalbumName] = useState('')

  useEffect(() => {
    if(isError){
      console.log('CAUGH ERROR')
      if(message)
      message.forEach(error => toast.error(error.msg));
    }
    if(isSuccess) toast.success('Posted')

    dispatch(getUserAlbums())
 
   }, [message,createPost,getUserAlbums, isError])
   


  const handleClose = () => setOpen(false)

  const handleSubmit = () =>{
    console.log(albumId)
    formData.append("myfile", myfile)
    formData.append("caption", caption)
    formData.append("keywords", tags)
    formData.append("album", albumId)

    dispatch(createPost(formData))
    handleClose()
  }

  const handleFile = async(e) =>{
    const file = e.target.files[0];
    setimageURL(URL.createObjectURL(file))
    const base64 = await convertToBase64(file);
    setmyfile(file)
  }

  const handleAlbumchange = (e) =>{

    console.log(e.target.value)
    const newALbumId = (event.target.getAttribute('albumid'));
    
    setalbumId(newALbumId)
    setalbumName(e.target.value)
  }



  return (
   
    <Modal
  open={open}
  onClose={handleClose}
>
  <div>
 <Grid container sx={style} spacing={1}>
    <Grid item xs={12}>
    <label  htmlFor="upload-photo">
            <Avatar 
            src={imageURL}
            sx={{height:'200px', width:'200px', m: 1, bgcolor: '#CCEEBC' }}>
            </Avatar>
            <input
            type="file"
            name="myfile"
            accept=".jpeg, .png, .jpg"
            onChange={(e)=> handleFile(e)}
            style={{ display: "none"}}
            id="upload-photo"
            />
        </label>
    </Grid>
    <Grid item xs={12}>
      <Typography>Write a caption</Typography>
    <TextField sx={{width:'80%'}} name="caption" value={caption} type="text" onChange={(e)=>{ 
  setCaption(e.target.value)
}}/>
    </Grid>
    <Grid xs={12} item>
    <TagInput tags={tags} setTags={setTags} />
    </Grid>
    <Grid item xs={12}>
    <FormControl fullWidth>
            <InputLabel >Album</InputLabel>
            <Select
              value={albumName}
              label="Album"
              onChange={handleAlbumchange}
            >
              
              {
              albums.map((album)=>
              (<MenuItem
                 key={album._id}
                 name={album.name}
                 value={album.name}
                 albumid = {album._id}
                 onClick={handleAlbumchange}
                 >
                  {album.name}
                </MenuItem>))
              }
            
            </Select>
          </FormControl>
    </Grid>
    <Grid item>
    <Button onClick={handleSubmit} >Post</Button>
    </Grid>
 </Grid>
 <ToastContainer/>
 </div>
</Modal>
  )
}

export default PostForm


function convertToBase64(file){
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result)
    };
    fileReader.onerror = (error) => {
      reject(error)
    }
  })
}

{/* <Container sx={style}>
<div >Create Post</div>
<div>






</div>
</Container> */}