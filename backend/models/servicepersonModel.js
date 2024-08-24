import mongoose, { Schema, model } from "mongoose";

const servicepersonSchema = new Schema({
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
  address:{
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  jobs_done: {
    type: Number,
    default: 0,
  },
  qualification: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
    required: true,
  },
  rating: {
    rating: {
      type: Number,
    },
    totalReviews: {
      type: Number,
    },
  },
  image_url: {
    type: String,
    required: false,
  },
  servicesOffered: [
    {
      service: {
        type: Schema.Types.ObjectId,
        ref: "ServiceCategory",
      },
      fare: {
        type: Number,
      },
    },
  ],
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

const servicepersonModel = new model("Serviceperson", servicepersonSchema);

export { servicepersonModel };
