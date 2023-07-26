const express = require('express')
const router = express.Router();
const {check, validationResult} = require('express-validator')
const auth = require('../../middleware/auth')

const User = require('../../models/User');
const Profile = require('../../models/Profile');
const Posts = require('../../models/Posts');
const Album = require('../../models/Album')

//@route POST api/albums
//@dec create an album
//@access private
router.post('/',[auth,[
    check('name', 'name is required').not().isEmpty()
]], async(req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.json(400).json({errors:errors.array()})
    }

        try {
            const profile = await Profile.findOne({
            user: req.user.id
            }).populate('user');

            let album = await Album.findOne({name : req.body.name});
            if(album){
              return res.status(400).json({ errors: [{ msg: 'Album with this name already exists!' }] });
            }

          
            const newAlbum = new Album({
                name : req.body.name,
                user : req.user.id,
            })
            album = newAlbum.save();
            res.status(201).json(album)
            
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error')
        }
    
})


//@route  GET api/albums
//@desc   Get all albums 
//@access Private
router.get('/',auth,async(req,res)=>{
    try {
      const albums = await Album.find()
      res.json(albums)
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error')
    }
  });
  
//@route  GET api/albums/user
//@desc   Get user albums 
//@access Private
router.get('/user',auth,async(req,res)=>{
  try {
  
    const albums = await Album.find({user : req.user.id})
    res.json(albums)
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error')
  }
});

  //@route  GET api/albums/name
//@desc   Get album by name 
//@access Private
router.get('/:name',auth,async(req,res)=>{
  try {
    let name = req.params.name;
    console.log(name)
    const album = await Album.findOne({name: name})
    res.status(200).json({album:album});
  } catch (err) {
    console.error(err.message);
      res.status(500).send('Server error')
  }
})

//@route  GET api/albums/:id
//@desc   Get albums by id
//@access Private
router.get('/:id',auth, async (req, res) => {
    try {
      const album = await Album.findById(req.params.id)
      //.sort({ date: -1 });
      if(!album){
        return res.status(404).send("Album not found")
      }
      res.json(album)
    } catch (err) {
      if (err.kind==='ObjectId') 
        return res.status(404).send("Album not found");
      console.error(err.message);
      res.status(500).send('Server error!!');
    
  }
  });


//@route  DELETE api/albums/:id
//@desc   Delete an album
//@access Private
router.delete('/:id', auth, async (req, res) => {
    try {
      const album = await Album.findById(req.params.id)
      if(!album){
        return res.status(404).send("Album not found");
      }
      //Check user
      if(album.user.toString()!== req.user.id)
      return res.status(401).json({msg:"User Not Authorised"});
      
      await Album.remove();
      res.json({msg:"album removed"})
      
      
    } catch (err) {
      if (err.kind === 'ObjectId')
        return res.status(404).send("Album not found");
      console.error(err.message);
      res.status(500).send('Server error');
    }
  });
  
  //@route  PUT api/abums/changeAlbum
//@desc   Change the album of a post
//@access Private
router.put('/',auth,async(req,res)=>{
  try {
    let newAlbum = req.body.albumId;

    console.log(newAlbum)
    
    const post = await Posts.findOne({_id: req.body.postId});
    
    if (!post) return res.status(400).json({ msg: "Post not found" })
    //Check user
    if(post.user.toString()!== req.user.id)
    return res.status(401).json({msg:"User Not Authorised"});


    post.album = newAlbum;

    newAlbum = await Album.findById(newAlbum)
    console.log(newAlbum)
    await post.save();
    
    res.json(newAlbum)
    
  } catch (err) {
    if (err.kind == 'ObjectId')
      return res.status(400).json({ msg: "Post not found" });
    else
      res.status(500).send('Server error!');
  }
})



module.exports = router;

//add a post in an album
//remove a post from an album