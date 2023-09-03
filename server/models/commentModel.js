const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  animeId: {
    type: String,
    required: true
  },
  comments: [
    {
      username: {
        type: String,
        required: true
      },
      description: {
        type: String,
        required: true
      },
      rating: {
        type: Number,
        required: true
      }
    }
  ]
});

module.exports = mongoose.model('Comment', commentSchema);
