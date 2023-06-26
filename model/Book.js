import mongoose from "mongoose";

const BookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
      },
      author: {
        type: String,
        required: true,
      },
      genre: {
        type: String,
        required: true,
      },
      ISBN: {
        type: Number,
        required: true,
      },
      thumbnail: {
        type: String,
        required: true,
      },
      availability:{
        type: Boolean,
        required:true
      }
})

const Book = mongoose.model('Book',BookSchema)
export default Book