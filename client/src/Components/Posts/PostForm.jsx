import {useState,useEffect} from 'react'
import {Button,Modal,Input, Container} from '@mui/material'
import TagInput from './TagInput'

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

  
  


  const [caption, setCaption] = useState("");
  let [myfile, setmyfile] = useState("")
  let [tags, setTags] = useState([]);


  useEffect(() => {
 
   }, [])


  const handleClose = () => setOpen(false)
  ;
  const handleSelecetedTags = (items) => {
    console.log(items);
  }

  const createPost = () =>{
    const newPost = {
      myfile, caption, tags
    }
    

  }





  return (
    <Modal
  open={open}
  onClose={handleClose}
>
  <Container sx={style}>
    <div >Create Post</div>
  <div>
    <Input type="file" onChange={(e)=>{setCaption(e.target.value)}}>lwhbja</Input>
    <Input name="caption" value={caption} type="text" onChange={(e)=>{setCaption(e.target.value)}} ></Input>
    <TagInput tags={tags} setTags={setTags} />
    <Button onClick={createPost} >Post</Button>
  </div>
  </Container>
</Modal>
  )
}

export default PostForm