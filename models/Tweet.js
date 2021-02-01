const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TweetSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId, // users object id
    ref: 'users' // model name association
  },
  text: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Tweet = mongoose.model('tweet', TweetSchema);