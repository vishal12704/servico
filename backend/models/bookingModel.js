import mongoose, { Schema, model } from "mongoose";

const bookingSchema = new Schema({
  service: {
    type: Schema.Types.ObjectId,
    ref: "Service",
    required: true,
  },
  servicePerson: {
    type: Schema.Types.ObjectId,
    ref: "Serviceperson",
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  feedback: {
    content : {
    type: Object,
  },
  calculatedRating : {
    type: Number
  }
},
  fare: {
    type: Number,
    required: true,
  },
  startTime: {
    type: Date,
    required: true,
  },
  endTime: {
    type: Date,
    default: null,
  },
  status: {
    type: String,
    enum: ["PENDING", "ACCEPTED", "REJECTED", "PAID","ONGOING", "COMPLETED"],
    default: "PENDING",
  },
});

const bookingModel = new model("Booking", bookingSchema);

export { bookingModel };
