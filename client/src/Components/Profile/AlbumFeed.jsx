import {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import {createAlbum, getUserAlbums} from '../../features/album/albumSlice'



import {IconButton,ImageList, ImageListItem, Grid, ImageListItemBar, ListSubheader, CardMedia, Typography} from '@mui/material'
import InfoIcon from '@mui/icons-material/Info';


function AlbumFeed() {
    const {albums, isLoading} = useSelector((state)=>state.album)
    const dispatch = useDispatch()
   

    const folderURL = 'https://i.pinimg.com/564x/7d/3c/af/7d3caf2c89c7c846bd7485443cb8af20.jpg'

    useEffect(() => {
      dispatch(getUserAlbums())
      console.log(albums)
    }, [getUserAlbums])
    
  return (
    <div>
    <Grid container>
        <Grid container spacing = {2}>
        {albums.map((album)=>
        (
            <Link key={album._id} to={`/album/${album._id}`}>
            <Grid item xs={3} sx={{textAlign:'left'}}>
                <img style={{width:'200px', borderRadius:'5px'}} src={folderURL}/>
                <Typography>{album.name}</Typography>
            </Grid>
            </Link>
        )
        )}
        </Grid>
 
    </Grid>
    </div>
  )
}

export default AlbumFeed








const itemData = [
    {
      img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
      title: 'Breakfast',
      author: '@bkristastucchio',
      rows: 2,
      cols: 2,
      featured: true,
    },
    {
      img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
      title: 'Burger',
      author: '@rollelflex_graphy726',
    },
    {
      img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
      title: 'Camera',
      author: '@helloimnik',
    },
    {
      img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
      title: 'Coffee',
      author: '@nolanissac',
      cols: 2,
    },
    {
      img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
      title: 'Hats',
      author: '@hjrc33',
      cols: 2,
    },
    {
      img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
      title: 'Honey',
      author: '@arwinneil',
      rows: 2,
      cols: 2,
      featured: true,
    },
    {
      img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
      title: 'Basketball',
      author: '@tjdragotta',
    },
    {
      img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
      title: 'Fern',
      author: '@katie_wasserman',
    },
    {
      img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
      title: 'Mushrooms',
      author: '@silverdalex',
      rows: 2,
      cols: 2,
    },
    {
      img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
      title: 'Tomato basil',
      author: '@shelleypauls',
    },
    {
      img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
      title: 'Sea star',
      author: '@peterlaster',
    },
    {
      img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
      title: 'Bike',
      author: '@southside_customs',
      cols: 2,
    },
  ];