import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    date: Date,
    creator: String,
    photos: [],
  },
  {
    versionKey: false,
  }
);

const Album = mongoose.model("Album", schema);

export default Album;
