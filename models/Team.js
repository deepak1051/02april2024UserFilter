import mongoose from 'mongoose';

const teamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  members: {
    type: Array,
    default: [],
  },
});

export default mongoose.model('Team', teamSchema);
