import {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import {createAlbum, getUserAlbums} from '../../features/album/albumSlice'



import {Button,ImageList, ImageListItem, Grid, ImageListItemBar, ListSubheader, CardMedia, Typography, TextField} from '@mui/material'
import InfoIcon from '@mui/icons-material/Info';
import {toast, ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


function AlbumFeed() {
    const {albums, isLoading} = useSelector((state)=>state.album)
    const dispatch = useDispatch()
   const [albumName, setalbumName] = useState('')

    const folderURL = 'https://i.pinimg.com/564x/7d/3c/af/7d3caf2c89c7c846bd7485443cb8af20.jpg'

    useEffect(() => {
      dispatch(getUserAlbums())
      console.log(albums)
    }, [getUserAlbums, createAlbum])
    
  return (
    <div>
      <div style={{padding:'20px', margin:'20px', float:'right'}}>
        <TextField name='albumName' label="Album name" value={albumName}  onChange = {(e)=>setalbumName(e.target.value)} ></TextField>
        <Button onClick={()=>dispatch(createAlbum(albumName))}  variant="outlined">Add Folder</Button>
      </div>
    <Grid container>
        <Grid container spacing = {2}>
        {albums.map((album)=>
        (
            <Link key={album._id} to={`/album/${album._id}`}>
            <Grid item xs={3} sx={{textAlign:'center'}}>
                <img style={{width:'300px', borderRadius:'5px'}} src={folderURL}/>
                <Typography>{album.name}</Typography>
            </Grid>
            </Link>
        )
        )}
        </Grid>
 
    </Grid>
    <ToastContainer/>
    </div>
  )
}

export default AlbumFeed






