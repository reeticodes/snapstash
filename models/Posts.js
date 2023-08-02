const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new mongoose.Schema({
  caption:{
    type : String,
    required: true
  },
  myfile:{
    type : String,
    required: true
  },
  name:{
    type: String,
    required : true
  },
  avatar: {
    type: String
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
  comments: [
    {
      profile: {
        type: Schema.Types.ObjectId,
        ref:'profile'
      },
      user: {
        type: Schema.Types.ObjectId,
        ref:'user'
      },
      text: {
        type: String,
        required: true
      },
      name: {
        type: String,
        required: true
      },
      avatar: {
        type: String
      },
      likes: [
        {
          user: {
            ref: 'user',
            type: Schema.Types.ObjectId
          }
        }
      ],
      date: {
        type: Date,
        default: Date.now
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }

});
module.exports = Post = mongoose.model('post', PostSchema);