const mongoose = require('mongoose');


const ProfileSchema = new mongoose.Schema({
  user: {
    type : mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  name: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  },
  bio: {
    type: String,
  },
  followers: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
      },
      profile: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'profile'
      }
    }
  ],
  following: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
      },
      profile: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'profile'
      }
    }
  ]
});
module.exports = Profile = mongoose.model('profile', ProfileSchema);