import bcrypt from "bcryptjs";
import { categoryModel } from "../models/categoryModel.js";
import { serviceModel } from "../models/serviceModel.js";
import { servicepersonModel } from "../models/servicepersonModel.js";
import { userModel } from "../models/userModel.js";
import { bookingModel } from "../models/bookingModel.js";
import { sentiment } from "../test3.js";

/**
 * @param {String} username
 * @param {String} password
 * @param {String} name
 * @param {String} email
 * @param {String} address
 * @param {String} location
 * @param {String} phone
 * @param {String?} image_url
 */
async function addUser(
  username,
  password,
  name,
  email,
  address,
  location,
  phone,
  image_url = null
) {
  try {
    let hashedPassword = bcrypt.hashSync(password, 10);
    // console.log(hashedPassword);
    await userModel.create({
      username: username,
      password: hashedPassword,
      name: name,
      email: email,
      address: address,
      location: location,
      phone: phone,
      image_url: image_url,
    });
  } catch (err) {
    // console.log(err);
    throw new Error("Error storing data.");
  }
}

/**
 * @param {String} name
 * @param {String} email
 * @param {String} phone
 * @param {String} address
 * @param {String} location
 * @param {String} qualification
 * @param {String} bio
 * @param {Array} servicesOffered
 * @param {String} username
 * @param {String} password
 * @param {String?} image_url
 */
async function addServiceperson(
  name,
  email,
  phone,
  address,
  location,
  qualification,
  bio,
  servicesOffered,
  username,
  password,
  image_url = null
) {
  try {
    let hashedPassword = bcrypt.hashSync(password, 10);
    // console.log(hashedPassword);
    await servicepersonModel.create({
      name: name,
      email: email,
      phone: phone,
      address: address,
      location: location,
      qualification: qualification,
      bio: bio,
      servicesOffered: servicesOffered,
      username: username,
      password: hashedPassword,
      image_url: image_url,
    });
  } catch (err) {
    // console.log(err);
    throw new Error("Error storing data.");
  }
}

/**
 * @param {String} username
 * @param {String} password
 */
async function userLogin(username, password) {
  let user = await userModel.findOne(
    { username: username },
    { _id: 0, __v: 0 }
  );
  if (!user) {
    throw new Error("User does not exist.");
  }
  if (!(await bcrypt.compare(password, user.password))) {
    throw new Error("Invalid credentials");
  } else {
    delete user.password;
    return user;
  }
}

/**
 * @param {String} username
 * @param {String} password
 */
async function servicepersonLogin(username, password) {
  let serviceperson = await servicepersonModel.findOne(
    { username: username },
    { _id: 0, __v: 0 }
  );
  if (!serviceperson) {
    throw new Error("Serviceperson does not exist.");
  }
  if (!(await bcrypt.compare(password, serviceperson.password))) {
    throw new Error("Invalid credentials");
  } else {
    delete serviceperson.password;
    return serviceperson;
  }
}

async function getServiceCategories() {
  const categories = await categoryModel.find({}, { __v: 0 });
  return categories;
}

/**
 * @param {String} category,
 * @param {Date|null} nowTime
 */
async function getServicepersonForCategories(category, nowTime = null) {
  // console.log(`category received = ${category}`)
  const serviceCategory = await categoryModel.findOne({ name: category });
  if (!serviceCategory) {
    throw new Error("No such service category.");
  }
  let servicepeople;
  // console.log(`received time : ${nowTime}`)
  if (nowTime) {
    // console.log("received time for querying ..")
    nowTime = new Date(nowTime);
    // console.log(typeof nowTime)
    servicepeople = await servicepersonModel.aggregate([
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
        }
      },
      // {
      //     $project: {
      //         _id: false,
      //         name: "$name"
      //     }
      // }
    ])
  }
  else {
    // console.log("did not receive time for querying...")
    // servicepeople = await servicepersonModel
    //   .find(
    //     {
    //       "servicesOffered.service": serviceCategory._id,
    //     },
    //     { _id: 0 }
    //   )
    //   .populate("servicesOffered.service", { _id: 0 });
    servicepeople = await servicepersonModel.aggregate([
      {
        $unwind: {
          path: "$servicesOffered",
        },
      },
      {
        $lookup: {
          from: "servicecategories",
          localField: "servicesOffered.service",
          foreignField: "_id",
          as: "service"
        }
      },
      {
        $unwind: {
          path: "$service",
        }
      },
      {
        $match: {
          "service.name": "Electrical Help"
        }
      },
      {
        $lookup: {
          from: "bookings",
          localField: "bookings",
          foreignField: "_id",
          as: "bookings"
        }
      }
    ])
  }
  return servicepeople;
}

/**
 * 
 * @param {String} category 
 */
async function getServicesForCategory(category) {
  const categoryDoc = await categoryModel.findOne({ name: category })
  // console.log(categoryDoc.name)
  let services = serviceModel.find({ category: categoryDoc._id })
  return services;
}

/**
 *
 * @param {String} serviceName
 * @param {String} servicePerson
 * @param {String} username
 * @param {Date} timeslot
 */
async function createBookingRequest(
  serviceName,
  servicePerson,
  username,
  timeslot
) {
  const service = await serviceModel.findOne({ name: serviceName });
  if (!service) {
    throw new Error("No such service found.");
  }
  // console.log(service);
  const serviceperson = await servicepersonModel.findOne({
    username: servicePerson,
    "servicesOffered.service": service.category,
  }); //.populate("servicesOffered.service");
  if (!serviceperson) {
    throw new Error("No such serviceperson for the service.");
  }
  // console.log(serviceperson)
  const fare = serviceperson.servicesOffered.filter(
    (d) => d.service == service.category.toString()
  )[0].fare;
  if (!fare) {
    throw new Error("Error getting approximate fare.");
  }
  // console.log(fare)
  const user = await userModel.findOne({ username: username });
  if (!user) {
    throw new Error("No such user found.");
  }
  // console.log(user)
  const newBooking = await bookingModel.create({
    service: service._id,
    servicePerson: serviceperson._id,
    user: user._id,
    fare: fare,
    startTime: timeslot,
  });
  serviceperson.bookings.push(newBooking._id);
  await serviceperson.save();
  user.bookings.push(newBooking._id);
  await user.save();
  return newBooking;
}

/**
 *
 * @param {String} serviceperson
 * @param {String} bookingId
 */
async function acceptBooking(servicepersonUsername, bookingId) {
  const booking = await bookingModel.findOne({
    _id: bookingId,
  });
  if (!booking) {
    throw new Error("No such booking.");
  }
  const serviceperson = await servicepersonModel.findOne({
    username: servicepersonUsername,
  });
  if (!serviceperson) {
    throw new Error("No such serviceperson.");
  }
  if (serviceperson._id.toString() != booking.servicePerson.toString()) {
    throw new Error("Can only accept your own booking requests.");
  }
  if (booking.status == "PENDING") {
    booking.status = "ACCEPTED";
    await booking.save();
  } else {
    throw new Error("Only pending requests can be accepted.");
  }
}

/**
 *
 * @param {String} serviceperson
 * @param {String} bookingId
 */
async function rejectBooking(servicepersonUsername, bookingId) {
  const booking = await bookingModel.findOne({
    _id: bookingId,
  });
  if (!booking) {
    throw new Error("No such booking.");
  }
  const serviceperson = await servicepersonModel.findOne({
    username: servicepersonUsername,
  });
  if (!serviceperson) {
    throw new Error("No such serviceperson.");
  }
  if (serviceperson._id.toString() != booking.servicePerson.toString()) {
    throw new Error("Can only reject your own booking requests.");
  }
  if (booking.status == "PENDING") {
    booking.status = "REJECTED";
    await booking.save();
  } else {
    throw new Error("Only pending requests can be rejected.");
  }
}

async function listUserBookings(username) {
  const user = await userModel
    .findOne({ username: username }, { username: 1, bookings: 1, __id: 1 })
    .populate({
      path: "bookings",
      populate: {
        path: "servicePerson",
      },
    })
    .populate({
      path: "bookings",
      populate: {
        path: "service",
      },
    });
  // console.log(user);
  if (user) {
    return user;
  } else {
    throw new Error("Error getting specified user bookings");
  }
}

async function listServicepersonBookings(username) {
  const serviceperson = await servicepersonModel
    .findOne({ username: username }, { username: 1, bookings: 1 })
    .populate({
      path: "bookings",
      populate: {
        path: "user",
      },
    })
    .populate({
      path: "bookings",
      populate: {
        path: "service",
      },
    });
  if (serviceperson) {
    return serviceperson;
  } else {
    throw new Error("Error getting specified serviceperson bookings");
  }
}

/**
 * 
 * @param {String} id 
 */
async function changeBookingStatusToPaid(id) {
  let booking = await bookingModel.findOne({ _id: id });
  if (!booking) {
    throw new Error("No such booking found.")
  }
  booking.status = "PAID";
  await booking.save();
}

async function changeBookingStatusToOngoing(id) {
  let booking = await bookingModel.findOne({ _id: id });
  if (!booking) {
    throw new Error("No such booking found.")
  }
  booking.status = "ONGOING";
  await booking.save();
}

async function changeBookingStatusToCompleted(id, feedback) {
  let booking = await bookingModel.findOne({ _id: id });
  if (!booking) {
    throw new Error("No such booking found.")
  }
  booking.status = "COMPLETED";
  booking.endTime = new Date();
  // trying to take weighted average below for each column present (star-3, efficiency-1, cleanliness-1, behaviour-1, overall-3)
  let totalWeight = 0;
  let summedWeight = 0;
  if (feedback.star) {
    summedWeight += (3 * (feedback.star - 3) / 2);
    totalWeight += 3;
    // console.log(`starRating : ${3*(feedback.star-3)/2}`)
  }
  if (feedback.efficiency) {
    summedWeight += sentiment.analyze(feedback.efficiency).comparative / 5;
    totalWeight += 1;
    // console.log(`efficiencyRating : ${sentiment.analyze(feedback.efficiency).comparative/5}`)
  }
  if (feedback.cleanliness) {
    summedWeight += sentiment.analyze(feedback.cleanliness).comparative / 5;
    totalWeight += 1;
    // console.log(`cleanlinessRating : ${sentiment.analyze(feedback.cleanliness).comparative/5}`)
  }
  if (feedback.behaviour) {
    summedWeight += sentiment.analyze(feedback.behaviour).comparative / 5;
    totalWeight += 1;
    // console.log(`behaviourRating : ${sentiment.analyze(feedback.behaviour).comparative/5}`)
  }
  if (feedback.overall) {
    summedWeight += (3 * sentiment.analyze(feedback.overall).comparative / 5);
    totalWeight += 3;
    // console.log(`overallRating : ${sentiment.analyze(feedback.overall).comparative/5}`)
  }
  // console.log("summedWeight",summedWeight)
  // console.log("totalWeight",totalWeight)
  if (totalWeight !== 0) {
    let f = { content: feedback, calculatedRating: summedWeight / totalWeight };
    console.clear();
    console.log(f)
    booking.feedback = f;
    let serviceperson = await servicepersonModel.findOne({ _id: booking.servicePerson });
    console.log("serviceperson.rating", serviceperson.rating)
    if (serviceperson.rating.rating) {
      let x = (serviceperson.rating.rating * serviceperson.rating.totalReviews + (2.5 + f.calculatedRating * 2.5)) / (serviceperson.rating.totalReviews + 1)
      console.log(x)
      serviceperson.rating.rating = x;
      serviceperson.rating.totalReviews++;
    } else {
      console.log("first time storing")
      serviceperson.rating = { rating: 2.5 + f.calculatedRating * 2.5, totalReviews: 1 };
    }
    console.log(serviceperson.rating)
    await serviceperson.save();
  }
  else {
    booking.feedback = null;
  }
  // console.log(booking)
  await booking.save();
}

export default {
  addUser,
  addServiceperson,
  userLogin,
  servicepersonLogin,
  getServiceCategories,
  getServicepersonForCategories,
  createBookingRequest,
  acceptBooking,
  rejectBooking,
  listUserBookings,
  listServicepersonBookings,
  getServicesForCategory,
  changeBookingStatusToPaid,
  changeBookingStatusToOngoing,
  changeBookingStatusToCompleted
};
export {
  addUser,
  addServiceperson,
  userLogin,
  servicepersonLogin,
  getServiceCategories,
  getServicepersonForCategories,
  createBookingRequest,
  acceptBooking,
  rejectBooking,
  listUserBookings,
  listServicepersonBookings,
  getServicesForCategory,
  changeBookingStatusToPaid,
  changeBookingStatusToOngoing,
  changeBookingStatusToCompleted
};