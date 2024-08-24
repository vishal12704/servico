import mongoose from "mongoose";
import dotenv from "dotenv";
import { categoryModel } from "./models/categoryModel.js";
import { serviceModel } from "./models/serviceModel.js";
import { servicepersonModel } from "./models/servicepersonModel.js";
import { userModel } from "./models/userModel.js";
import { bookingModel } from "./models/bookingModel.js";
import controller from "./controllers/dbOps.js";

dotenv.config();
const connectDB = async (url) => {
  try {
    console.log(url);
    await mongoose.connect(url);
    console.log("Sucessfully connected to database\n\n\n");
  } catch (error) {
    console.log(error);
  }
};

await connectDB(process.env.Test_Database_URL);

//CATEGORIES PRESENT
// console.log("---Service categories present---")
// Array.from((await categoryModel.find({})).map(d=>d.name)).forEach((d,i)=>{console.log(`${i}. ${d}`)})
// console.log("\n\n")

//SERVICES FOR GIVEN CATEGORY
// let category = "Electrical Help"
// console.log(`Services for the category : ${category}`,(await controller.getServicesForCategory("Electrical Help")).map(d=>{return {name:d.name, duration:d.duration}}))
// console.log("\n")

//SERVICEPEOPLE FOR CATEGORY
// category = "Electrical Help"
// console.log((await controller.getServicepersonForCategories(category)).map(d=>{
//     // return d
//     return {
//         name: d.name,
//         jobs_done: d.jobs_done,
//         bookings_length: d.bookings.length
//     }
// }))

//TRYING FILTERING
// const nowTime = new Date("2024-01-11T05:34:13.267+00:00");
const nowTime = new Date("2024-01-26T12:00:00.000+05:30");
// const nowTime = new Date("2024-01-11T04:04:13.267+00:00");
const category = "Electrical Help";
console.log(nowTime);
let s = await servicepersonModel.aggregate([
  {
    $unwind: "$servicesOffered",
  },
  {
    $lookup: {
      from: "servicecategories",
      localField: "servicesOffered.service",
      foreignField: "_id",
      as: "service",
    },
  },
  {
    $unwind: "$service",
  },
  {
    $match: {
      "service.name": category,
    },
  },
  {
    $unwind: {
      path: "$bookings",
      preserveNullAndEmptyArrays: true,
    },
  },
  {
    $lookup: {
      from: "bookings",
      localField: "bookings",
      foreignField: "_id",
      as: "bookings",
    },
  },
  {
    $unwind: {
      path: "$bookings",
      preserveNullAndEmptyArrays: true,
    },
  },
  {
    $group: {
      _id: { _id: "$_id" },
      name: { $first: "$name" },
      bookings: { $push: "$bookings" },
      username: { $first: "$username" },
      servicesOffered: { $first: "$servicesOffered" },
      location: { $first: "$location" },
      qualification: { $first: "$qualification" },
      phone: { $first: "$phone" },
      jobs_done: { $first: "$jobs_done" },
      bio: { $first: "$bio" },
      rating: { $first: "$rating" },
      image_url: { $first: "$image_url" },
      email: { $first: "$email" },
    },
  },
  {
    $match: {
      $expr: {
        $not: {
          $gt: [
            {
              $size: {
                $filter: {
                  input: "$bookings",
                  as: "booking",
                  cond: {
                    $and: [
                      {
                        $gte: [
                          "$$booking.startTime",
                          new Date(nowTime.getTime() - 5400000),
                        ],
                      },
                      {
                        $lte: [
                          "$$booking.startTime",
                          new Date(nowTime.getTime() + 5400000),
                        ],
                      },
                      {
                        $eq: ["$$booking.status", "ACCEPTED"],
                      },
                    ],
                  },
                },
              },
            },
            0,
          ],
        },
      },
    },
  },
  {
      $project: {
          _id: false,
          name: "$name"
      }
  }
]);
// console.log(await servicepersonModel.find({}))
console.log(JSON.stringify(s, null, 4));
// s.forEach(element => {
//     console.log(element.username,element.bookings)
// });
console.log(s.length);

console.log("disconnecting...");
await mongoose.disconnect();
