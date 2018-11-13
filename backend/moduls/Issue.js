import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Issue = new Schema({
  title: {
    type: String
  },
  author: {
    type: String
  },
  category: {
    type: String
  },
  heroes: {
    type: String
  },

  description: {
    type: String
  },

  owner: {
    type: String
  },
  email: {
    type: String
  },
  access: {
    type: Boolean
  },
  // image: {
  //   type: String
  // },
  imagePath: {
    type: String
  }
});

export default mongoose.model('Issue', Issue);
