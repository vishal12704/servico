import mongoose, { Schema, model } from "mongoose";

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  image_url: {
    type: String,
    required: false,
    default: null,
  },
  address: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  bookings: [
    {
      type: Schema.Types.ObjectId,
      ref: "Booking",
      default: []
    },
  ],
});

const userModel = new model("User", userSchema);

export { userModel };
