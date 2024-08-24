import mongoose from "mongoose";
// import dotenv from "dotenv";
// dotenv.config()
// will have to later remove this
// url = process.env.Test_Database_URL

const connectDB = async(url)  => {
    try {
        console.log(url);
        await mongoose.connect(url);
        console.log("Sucessfully connected to database");
    } catch(error) {
        console.log(error);
    }
}

export {
    connectDB
};
