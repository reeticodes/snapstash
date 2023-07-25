import {useState,useEffect} from 'react'
import {Button,Modal,Input, Container, Avatar} from '@mui/material'
import TagInput from './TagInput'
import {useSelector, useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {toast, ToastContainer} from 'react-toastify'

import {createPost} from '../../features/posts/postSlice'
import Spinner from '../Layout/Spinner'

const style = {
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
  
  const formData = new FormData();

  const [caption, setCaption] = useState("");
  let [myfile, setmyfile] = useState("https://www.aig.ie/content/aig/emea/ie/en/existing-customers/myaig/_jcr_content/root/responsivegrid/container_copy/teaserflex_copy_copy.coreimg.90.1024.png/1629824897918/icon-upload-documents-540x180-min.png")
  let [tags, setTags] = useState([]);
  const [imageURL, setimageURL] = useState(null)

  useEffect(() => {
    if(isError){
      if(message)
      message.forEach(error => toast.error(error.msg));
    }
    if(isSuccess) toast.success('Posted')
 
   }, [message, isSuccess,isLoading, isError])


  const handleClose = () => setOpen(false)
  ;


  const handleSubmit = () =>{
    console.log(`my caption is ${caption}`)
    formData.append("myfile", myfile)
    formData.append("caption", caption)
    
    dispatch(createPost(formData))
    handleClose()
  }

  const handleFile = async(e) =>{
    const file = e.target.files[0];
    setimageURL(URL.createObjectURL(file))
    const base64 = await convertToBase64(file);
    setmyfile(file)
  }




  return (
   
    <Modal
  open={open}
  onClose={handleClose}
>
  <Container sx={style}>
    <div >Create Post</div>
  <div>
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
  
    <Input name="caption" value={caption} type="text" onChange={(e)=>{ 
      console.log(caption)
      setCaption(e.target.value)
      console.log(caption)
    }
      } ></Input>
    <TagInput tags={tags} setTags={setTags} />
    <Button onClick={handleSubmit} >Post</Button>
  </div>
  </Container>
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