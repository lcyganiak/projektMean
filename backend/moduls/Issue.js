import mongoose from 'mongoose';
import { Array } from 'core-js';

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
    type: []
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
