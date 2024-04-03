import mongoose from 'mongoose';

//      "id": 1,
//     "first_name": "Anet",
//     "last_name": "Doe",
//     "email": "adoe0@comcast.net",
//     "gender": "Female",
//     "avatar": "https://robohash.org/sintessequaerat.png?size=50x50&set=set1",
//     "domain": "Sales",
//     "available": false

const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  gender: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    required: true,
  },
  domain: {
    type: String,
    required: true,
  },
  available: {
    type: Boolean,
    required: true,
  },
});

userSchema.index({ first_name: 'text' });

const User = mongoose.model('User', userSchema);
export default User;
