const mongoose = require('mongoose'); // imports mongoose pkg
const Schema = mongoose.Schema;       // Gets #Schema funtionality

const UserSchema = new Schema({
  handle: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
}, {
  timestamps: true
})

// exports User as mongoose.model...
module.exports = User = mongoose.model('User', UserSchema);
