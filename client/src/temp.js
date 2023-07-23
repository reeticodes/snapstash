import { useState } from 'react'
import './App.css'
import avatar from './assets/profile.png'
import axios from 'axios'


const url = "http://localhost:5000/uploads"

function App() {
   
  const [postImage, setPostImage] = useState( { myfile : ""})

  const createPost = async (newImage) => {
    try{
      await axios.post(url, newImage)
    }catch(error){
      console.log(error)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    createPost(postImage)
    console.log("Uploaded")
  }

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    console.log(base64)
    setPostImage({ ...postImage, myfile : base64 })
  }
 
  return (
    <div className="App">
    <form onSubmit={handleSubmit}>

    <label htmlFor="file-upload" className='custom-file-upload'>
          <img src={postImage.myfile || avatar} alt="" />
        </label>

      <input 
        type="file"
        lable="Image"
        name="myfile"
        id='file-upload'
        accept='.jpeg, .png, .jpg'
        onChange={(e) => handleFileUpload(e)}
       />

       <h3>Doris Wilder</h3>
       <span>Designer</span>

       <button type='submit'>Submit</button>
    </form>
  </div>
  )
}

export default App


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