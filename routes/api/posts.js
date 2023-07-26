const express = require('express');
const router = express.Router();
const { check, validationResult} = require('express-validator');
const multer  = require('multer')


const fs = require('fs')
const util = require('util')
const unlinkFile = util.promisify(fs.unlink)

//Middleware
const auth = require('../../middleware/auth')
const upload = multer({ dest: 'uploads/' })
const {uploadFile} = require('../../config/s3')


//Models
const User = require('../../models/User');
const Profile = require('../../models/Profile');
const Posts = require('../../models/Posts');
const Album = require('../../models/Album')



//@route POST api/posts
//@desc Create a post 
//@access Private
router.post('/',[
  upload.single('myfile'),
  auth
], async(req,res) => {

  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({errors: errors.array()})
  }

  try {
    if(!req.file) res.json('Post cannot be empty')
      const profile = await Profile.findOne({
      user: req.user.id
    }).populate('user');

    //Create default Album
    let albumId;
    if(!req.body.albumId){
      let album =  await Album.findOne({name : 'My Pictures'});
      albumId = album._id
    } 
    else albumId = req.body.albumId


     //Upload to s3
    const file = req.file
    const result = await uploadFile(file)
    await unlinkFile(file.path)
    const fileLocation = result.Location

    console.log(fileLocation)
    

    const newPost = new Posts({
      myfile: fileLocation,
      caption : req.body.caption,
      keywords: req.body.keywords,
      name : profile.name,
      avatar: profile.avatar,
      user: req.user.id,
      album : albumId
    })
    const post = await newPost.save();
    res.json(post)
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error')
  }
    
  }
);
//@route  PUT api/posts/changeAlbum
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
    await post.save();
    
    res.json(post)
    
  } catch (err) {
    if (err.kind == 'ObjectId')
      return res.status(400).json({ msg: "Post not found" });
    else
      res.status(500).send('Server error!');
  }
})

//@route  GET api/posts
//@desc   Get all posts 
//@access Private
router.get('/',auth, async(req,res)=>{
  try {
    const posts = await Posts.find().sort({date : -1});
    res.json(posts)
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error')
  }
});

//@route  GET api/posts/user/:id
//@desc   Get user posts 
//@access Private
router.get('/user/:id', auth, async(req,res)=>{
  try {
    console.log(req.params)
    const posts = await Posts.find(
      {user: req.params.id}
    )
    res.json(posts)
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error')
  }
})

//@route  GET api/posts/album/:id
//@desc   Get album posts 
//@access Private
router.get('/album/:id', auth, async(req,res)=>{
  try {
    const posts = await Posts.find(
      {album: req.params.id}
    )
    res.json(posts)
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error')
  }
})





//@route  GET api/posts/:id
//@desc   Get posts by id
//@access Private
router.get('/:id', async (req, res) => {
  try {
    const post = await Posts.findById(req.params.id)
    //.sort({ date: -1 });
    if(!post){
      return res.status(404).send("Post not found")
    }
    res.json(post)
  } catch (err) {
    if (err.kind==='ObjectId') 
      return res.status(404).send("Post not found");
    console.error(err.message);
    res.status(500).send('Server error!!');
  
}
});




//@route  DELETE api/posts/:id
//@desc   Delete a post
//@access Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const post = await Posts.findById(req.params.id)
    if(!post){
      return res.status(404).send("Post not found");
    }
    //Check user
    if(post.user.toString()!== req.user.id)
    return res.status(401).json({msg:"User Not Authorised"});
    
    await Posts.deleteOne(post._id)
    
    res.json({msg:"Post removed"})
    
    
  } catch (err) {
    if (err.kind === 'ObjectId')
      return res.status(404).send("Post not found");
    console.error(err.message);
    res.status(500).send('Server error');
  }
});



//@route  PUT api/posts/like/:id
//@desc   Like a post
//@access Private
router.put('/like/:id',auth,async (req,res)=>{
  try{
    const post = await Posts.findById(req.params.id);

    //Check if the post has already been liked
    if(post.likes.filter(like=>like.user.toString()===req.user.id).length > 0 ){
      return res.status(404).json({msg : 'Post already liked'})
    }

      post.likes.unshift({user: req.user.id });

      await post.save();
      console.log('liked')

      res.json(post);
    
  }catch(err){
    console.error(err.message);
    res.status(500).send('Server error')
  }
});


//@route  PUT api/posts/unlike/:id
//@desc   unlike a post
//@access Private
router.put('/unlike/:id', auth, async (req, res) => {
  try {
    const post = await Posts.findById(req.params.id);

    //Check if the post has already been liked
    if (post.likes.some(like => like.user.toString() === req.user.id).length === 0) {
      return res.status(404).json({ msg: 'Post has not yet been liked' })
    }

    //Get remove index
    post.likes = post.likes.filter(
      ({ user }) => user.toString() !== req.user.id
    );

    

    await post.save();
    console.log('unliked')

    res.json(post);

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error')
  }
})


//@route POST api/posts/comment/:id
//@desc Comment on a post
//@access Private
router.post('/comment/:id', [auth, [
  check('text', 'Text is required').not().isEmpty()
]], async (req, res) => {
  console.log('POST THE COMMENT!')
  console.log(req.body)
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  try {
    const post = await Posts.findById(req.params.id);
    const profile = await Profile.findOne(req.profile).populate('user');
    
    console.log('what')
    const newComment = {
      text: req.body.text,
      name: profile.name,
      avatar: profile.avatar,
      user: req.user.id,
      profile : req.profile
    };

    post.comments.unshift(newComment);
    await post.save();
    res.json(post);

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error')
  }

}
);







//******************************************************************************* */



module.exports = router;