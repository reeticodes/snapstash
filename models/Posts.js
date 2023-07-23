const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new mongoose.Schema({
  caption:{
    type : String,
    required : true
  },
  myfile:{
    type : String,
    required: true
  },
  keywords:[
    {
      type: String
    }
  ],
  album :{
    ref: 'album',
    type: Schema.Types.ObjectId
  },
  profile: {
    ref: 'profile',
    type: Schema.Types.ObjectId
  },
  user: {
    ref: 'user',
    type: Schema.Types.ObjectId
  },
  likes: [
    {
      user: {
        ref:'user',
        type: Schema.Types.ObjectId
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }

});
module.exports = Post = mongoose.model('post', PostSchema);