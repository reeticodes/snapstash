const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const AlbumSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
      },
    profile: {
        ref: 'profile',
        type: Schema.Types.ObjectId
      },
      user: {
        ref: 'user',
        type: Schema.Types.ObjectId
      },
      photos: [
            {
              type: Schema.Types.ObjectId,
                 ref: "post"
            }
        ]
})

module.exports = Album = mongoose.model('album', AlbumSchema);