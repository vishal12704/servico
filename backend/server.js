import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { connectDB } from "./config/config.js";

import { addServiceperson, addUser, createBookingRequest, getServiceCategories, getServicesForCategory, getServicepersonForCategories, userLogin, servicepersonLogin, acceptBooking, rejectBooking, listUserBookings, listServicepersonBookings, changeBookingStatusToPaid, changeBookingStatusToOngoing, changeBookingStatusToCompleted } from "./controllers/dbOps.js";
import { isServiceperson, isUser } from "./middlewares/auth.js";

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({ credentials: true, origin: ["http://localhost:5173", "http://127.0.0.1:5173", "http://127.0.0.1:4173", "http://localhost:4173"] }));
app.use(cookieParser());
dotenv.config();

//braintree config
import braintree from "braintree";

const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MERCHANT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY
});

await connectDB(process.env.Test_Database_URL);
// await connectDB(process.env.Database_URL);

app.get("/", (req, res) => {
  res.send("Server is active.");
});

app.post("/sign-up/user", async (req, res) => {
  // console.log(req.body);
  let username = req.body.username?.trim();
  let password = req.body.password?.trim();
  let name = req.body.name?.trim();
  let email = req.body.email?.trim();
  let address = req.body.address?.trim();
  let location = req.body.location?.trim();
  let phone = req.body.phone?.trim();
  let image_url = req.body.image_url?.trim();

  if (username && password && name && email && location && phone && address) {
    image_url
      ? await addUser(
        username,
        password,
        name,
        email,
        address,
        location,
        phone,
        image_url
      )
      : await addUser(username, password, name, email, address, location, phone);
    res.status(200).send("Created New User.");
  } else {
    res.status(400).send("Username or password missing.");
  }
});

app.post("/sign-up/serviceperson", async (req, res) => {
  // console.log(req.body)
  let username = req.body.username?.trim();
  let password = req.body.password?.trim();
  let name = req.body.name?.trim();
  let email = req.body.email?.trim();
  let address = req.body.address?.trim();
  let location = req.body.location?.trim();
  let phone = req.body.phone?.trim();
  let qualification = req.body.qualification?.trim();
  let bio = req.body.bio?.trim();
  let servicesOffered = req.body.servicesOffered;
  let image_url = req.body.image_url?.trim();

  if (
    username &&
    password &&
    name &&
    email &&
    address &&
    location &&
    phone &&
    qualification &&
    bio &&
    servicesOffered
  ) {
    image_url
      ? await addServiceperson(
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
        image_url
      )
      : await addServiceperson(
        name,
        email,
        phone,
        address,
        location,
        qualification,
        bio,
        servicesOffered,
        username,
        password
      );
    res.status(200).send("Created New Serviceperson.");
  } else {
    res.status(400).send("Username or password missing.");
  }
});

app.post("/sign-in/user", async (req, res) => {
  // console.log("trying user login")
  let username = req.body.username;
  let password = req.body.password;

  if (username && password) {
    userLogin(username, password)
      .then((user) => {
        const token = jwt.sign({ username: username, role: "USER" }, process.env.JWT_SECRET);
        res.status(200).cookie("token", token).json(user);
      })
      .catch((err) => {
        res.status(401).send(err.message);
      });
  } else {
    res.status(400).send("Incomplete data.");
  }
});

app.post("/sign-in/serviceperson", async (req, res) => {
  let username = req.body.username;
  let password = req.body.password;

  if (username && password) {
    servicepersonLogin(username, password)
      .then((user) => {
        const token = jwt.sign({ username: username, role: "SERVICEPERSON" }, process.env.JWT_SECRET);
        res.status(200).cookie("token", token, { httpOnly: true }).json(user);
      })
      .catch((err) => {
        res.status(401).send(err.message);
      });
  } else {
    res.status(400).send("Incomplete data.");
  }
});

app.get("/sign-out", (req, res) => {
  res.clearCookie("token").sendStatus(200)
})

app.get("/checkCookie", (req, res) => {
  res.send(req.cookies)
})

app.get("/api/get-service-categories", (req, res) => {
  getServiceCategories()
    .then(data => res.status(200).json(data))
    .catch(err => res.sendStatus(500))
})

// app.get("/api/get-servicepeople/:category",isUser, (req,res)=>{
app.get("/api/get-servicepeople/:category", (req, res) => {
  getServicepersonForCategories(req.params.category, req.query.datetime)
    .then(data => res.status(200).send(data))
    .catch(err => {
      // console.log(err)
      res.status(400).send("No such category")
    })
})

app.get("/api/get-services-for-category/:category", (req, res) => {
  if (req.params.category) {
    getServicesForCategory(req.params.category)
      .then(data => res.status(200).send(data))
      .catch(err => {
        // console.log(err)
        res.status(400).send("No such category")
      })
  }
  else {
    res.status(400).send("Please provide category.")
  }
})

app.post("/api/new-booking", isUser, (req, res) => {
  const serviceName = req.body.service;
  const servicepersonUsername = req.body.serviceperson;
  const username = req.user.username;
  const startTime = req.body.startTime;
  // console.log(serviceName, servicepersonUsername, username, startTime)
  if (serviceName && servicepersonUsername && username && startTime) {
    // to be implemented
    createBookingRequest(serviceName, servicepersonUsername, username, startTime)
      .then(booking => {
        res.status(200).json(booking);
      })
      .catch(err => {
        res.status(500).send(err.message);
      })
  }
  else {
    res.status(400).send("Request with incomplete data.")
  }
})

app.get("/api/accept-booking", isServiceperson, (req, res) => {
  const bookingId = req.query.bookingId;
  if (!bookingId) {
    res.status(400).send("Need to provide a booking id.");
  }
  acceptBooking(req.serviceperson.username, bookingId)
    .then(() => res.sendStatus(200))
    .catch(err => {
      console.log(err)
      res.status(500).send(err.message)
    })
})

app.get("/api/reject-booking", isServiceperson, (req, res) => {
  const bookingId = req.query.bookingId;
  if (!bookingId) {
    res.status(400).send("Need to provide a booking id.");
  }
  rejectBooking(req.serviceperson.username, bookingId)
    .then(() => res.sendStatus(200))
    .catch(err => {
      console.log(err);
      res.status(500).send(err.message)
    })
})

app.get("/api/startBooking", isServiceperson, (req, res) => {
  const bookingId = req.query.bookingId;
  if (!bookingId) {
    res.status(400).send("Need to provide a booking id.");
  }
  changeBookingStatusToOngoing(bookingId)
    .then(() => res.sendStatus(200))
    .catch(err => res.status(500).send(err.message))
})

app.post("/api/completeBooking", isUser, (req, res) => {
  const bookingId = req.body.bookingId;
  const feedback = req.body.feedback;
  // console.log(req.body)
  if (!bookingId) {
    res.status(400).send("Need to provide a booking id.");
  }
  changeBookingStatusToCompleted(bookingId, feedback)
    .then(() => res.sendStatus(200))
    .catch(err => res.status(500).send(err.message))
})

app.get("/api/send-feedback", isUser, (req, res) => {

})

app.get("/api/get-user-bookings", isUser, (req, res) => {
  listUserBookings(req.user.username)
    .then(data => res.status(200).json(data))
    .catch(err => res.status(500).send(err.message))
})

app.get("/api/get-serviceperson-bookings", isServiceperson, (req, res) => {
  // console.log(req.serviceperson)
  listServicepersonBookings(req.serviceperson.username)
    .then(data => res.status(200).json(data))
    .catch(err => res.status(500).send(err.message))
})

app.get("/api/get-payment-token", (req, res) => {
  gateway.clientToken.generate()
    .then((token) => {
      // console.log(token);
      res.status(200).send(token)
    })
    .catch((err) => { res.status(500).send("Error generating client token.") })
})

app.post("/api/process-payment", async (req, res) => {
  const nonce = req.body.nonce;
  const amount = req.body.amount;
  const bookingId = req.body.bookingId;
  try {
    let data = await gateway.transaction.sale({
      amount: amount,
      paymentMethodNonce: nonce,
      options: {
        submitForSettlement: true,
      }
    })
    // console.log(data);
    await changeBookingStatusToPaid(bookingId);
    res.status(200).send(data);
  }
  catch (err) {
    res.status(500).send(err);
  }

})

//payment settlement function
// gateway.transaction.sale({
//   amount: "10.00",
//   paymentMethodNonce: nonceFromTheClient,
//   deviceData: deviceDataFromTheClient,
//   options: {
//     submitForSettlement: true
//   }
// }).then(result => {
//   if (result.success) {
//     // See result.transaction for details
//   } else {
//     // Handle errors
//   }
// });


app.listen(8000, () => {
  console.log("Server active...");
});
