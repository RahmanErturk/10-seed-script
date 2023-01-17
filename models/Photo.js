import mongoose from "mongoose";

import Album from "./Album.js";

const photographerSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
    },
  },
  {
    _id: false,
  }
);

const schema = new mongoose.Schema(
  {
    price: Number,
    date: Date,
    url: {
      type: String,
      validate: {
        validator: (v) => {
          const val = v.startsWith("http") || v.startsWith("www");
          return val;
        },
        message: "Please give a valid URL",
      },
      required: true,
      unique: true,
    },
    theme: String,
    photographer: {
      type: photographerSchema,
      required: true,
    },
    album: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Album",
      required: true,
    },
    // photographers: [photographerSchema],
  },
  {
    versionKey: false,
  }
);

const Photo = mongoose.model("Photo", schema);

export const getAll = async () => {
  const photos = await Photo.find().populate("album");
  return photos;
};

export const getOne = async (photoId) => {
  const photo = await Photo.findById(photoId).populate("album");

  return photo;
};

export const create = async ({ price, date, url, theme }) => {
  const newPhoto = new Photo({ price, date, url, theme });
  const result = await newPhoto.save();
  return result;
};

export const updateOne = async (photoId, data) => {
  const photo = await Photo.findByIdAndUpdate(photoId, data, {
    new: true,

    runValidators: true,
  });

  return photo;
};

export const replaceOne = async (photoId, data) => {
  const photo = await Photo.findOneAndReplace(
    {
      _id: photoId,
    },
    data,
    {
      returnDocument: "after",
      runValidators: true,
    }
  );
  return photo;
};

export const deleteOne = async (photoId) => {
  const photo = await Photo.findByIdAndDelete(photoId);

  return photo;
};

export default Photo;
