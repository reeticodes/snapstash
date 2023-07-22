const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const config = require('config');

const Profile = require('../../models/Profile');
const Post = require('../../models/Posts')
const User = require('../../models/User');

const { check, validationResult } = require('express-validator');

//@route GET api/profile/me
//@desc Test route
//@access Public
router.get('/me',auth,async (req,res) => {
  try{
    
    const profile = await Profile.findOne({user : req.user.id}).populate('user');

    if(!profile){
      return res.status(400).json({msg : 'There is no profile for this user'});
    }
    res.json(profile);
  }catch(err){
    console.error(err.message);
    res.status(500).send('Server Error')
  }
});



//@route POST api/profile
//@desc Create or update profile
//@access private
router.post('/', [auth, [
  check('name', 'name required').not().isEmpty()
]],async (req,res) => {
// console.log(req.body);
const errors =validationResult(req);
if(!errors.isEmpty()){
  return res.status(400).json({errors: errors.array()});
}
    const { name,avatar,bio} = req.body;

    //Build profile object
    const profileFields = {};
    profileFields.user = req.user.id;
    if(name) profileFields.name = name;
    if (bio) profileFields.bio = bio;

    const user = await User.findById(req.user.id).select('-password');
    
    profileFields.avatar = `https://avatars.dicebear.com/api/bottts/${user._id}.svg`;
  
    try{
      let profile =await Profile.findOne({user : req.user.id})

      if(profile){
        //Update
        profile = await Profile.findOneAndUpdate({user: req.user.id},
          {$set: profileFields},
          {new: true, upsert: true, setDefaultsOnInsert: true }
          );
          return res.json(profile)
      }
      //Create a default album
      const newAlbum = new Album({
        name : "My Pictures",
        user : user.id,
    })
    const album = await newAlbum.save();

       //Create 
        profile = new Profile(profileFields);
        await profile.save();
        res.json(profile)

    }catch(err){
      console.error(err.message);
      res.status(500).send('Server error!')
    }
});




//@route  GET api/profile
//@desc   Get all profiles
//@access Public
router.get('/',async(req,res) => {
  try {
    const profiles = await Profile.find().populate('user');
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error!')
    
  }
});



//@route    GET api/profile/user/:user_id
//@desc     Get  profile by user id
//@access   Public
router.get('/user/:user_id', async (req, res) => {
  try {
    
    const profile = await Profile.findOne(
        {user: req.params.user_id}
      ).populate('user');

    if(!profile){
      return res.status(400).json({ msg: "Profile not found"})
    }
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    if(err.kind == 'ObjectId')
      return res.status(400).json({ msg: "Profile not found" });
      else
      res.status(500).send('Server error!');

  }
});


//@route    GET api/profiles/search
//@desc     Filter by search
//@access   Public

router.get('/filter', async (req,res)=>{
  try {
    const profiles = await Profile.find({ name: {$regex: req.query.name, $options:'i'} }).populate('user');
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error!')
  }
})




//@route    GET api/profile/user/:user_id
//@desc     Get  profile by user id
//@access   Public
router.get('/user/:user_id/posts',auth, async (req, res) => {
  try {
     const user = await User.findById(req.user.id).select('-password');
    const profile = await Profile.findOne(
      { user: req.params.user_id }
    ).populate('user');
    const posts = await Post.find({ 'name': profile.name });
    if (!posts) {
      return res.status(404).send("Post not found")
    }else
    res.json(posts);

    
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'ObjectId')
      return res.status(400).json({ msg: "Posts not found" });
    else
      res.status(500).send('Server error!');

  }
});






//********************************************************************************* */



//@route    GET api/profile/followuser/:user_id
//@desc     Follow user
//@access   Private
router.put('/followuser/:user_id',auth, async (req, res) => {
  try {
  
    const profile = await Profile.findOne(
      { user: req.params.user_id }
    )
    const myprofile = await Profile.findOne({ user: req.user.id })

    if (!profile) {
      return res.status(400).json({ msg: "Profile not found" })
    }
  
    //Check if the user is already followed
    if(profile.followers.filter(follow=>follow.user.toString()==req.user.id).length>0)
    {

      return res.status(404).json({ msg: 'User already followed' })
    }
    

    profile.followers.unshift({user : req.user.id});
    myprofile.following.unshift({user:req.params.user_id});

    await profile.save();
    await myprofile.save();
    res.json(`${profile} ------------------ ${myprofile}`);
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'ObjectId')
      return res.status(400).json({ msg: "Profile not found" });
    else
      res.status(500).send('Server error!');
  }
});






//@route    GET api/profile/unfollowuser/:user_id
//@desc     unfollow user
//@access   Private
router.put('/unfollowuser/:user_id', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne(
      { user: req.params.user_id }
    ).populate('user');
    const myprofile = await Profile.findOne({ user: req.user.id }).populate('user');

    if (!profile) {
      return res.status(400).json({ msg: "Profile not found" })
    }

    //Check if the user is already followed
    if (profile.followers.filter(follow => follow.user.toString() == req.user.id).length === 0) {

      return res.status(404).json({ msg: 'User not followed' })
    }

    //Get remove index
    profile.followers = profile.followers.filter(
      ({user})=> user.toString()!==req.user.id
    )
    myprofile.following = myprofile.following.filter(
      ({user}) => user.toString()!== req.params.user_id
      )

    await profile.save();
    await myprofile.save();

    res.json(`Unfollowed!`);
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'ObjectId')
      return res.status(400).json({ msg: "Profile not found" });
    else
      res.status(500).send('Server error!');
  }
});



//@route    GET api/profile/unfollowuser/:user_id
//@desc     Get Followers
//@access   Public
router.get('/followers/:user_id', async (req,res)=>{

  try {
    console.log('im in')
    const profile = await Profile.findOne({user: req.params.user_id})
    
    //const x = await Profile.findOne({ user: profile.followers[0].user })
    const profiles=[];
    for(let i=0;i<profile.followers.length;i++)
    {
      profiles[i] =  (await Profile.findOne({ user: profile.followers[i].user })).populate('user')
    }
    //console.log(profile.followers[0].user)
    res.json(profiles)
    //const folllowers = profile.folllowers.map(x => console.log(x))
    // console.log(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

router.get('/following/:user_id', async (req, res) => {

  try {

    const profile = await Profile.findOne({ user: req.params.user_id })
    const profiles = [];
    for (let i = 0; i < profile.following.length; i++) {
      profiles[i] = await Profile.findOne({ user: profile.following[i].user }).populate('user')
    }
    res.json(profiles)

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});



//********************************************************************************* */










module.exports = router;