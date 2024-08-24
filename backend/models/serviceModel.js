import mongoose, {Schema, model} from "mongoose";

const serviceSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    category:{
        type: Schema.Types.ObjectId,
        ref: "ServiceCategory"
    },
    description: {
        type: String,
        required: true
    },
    image_url: {
        type: String,
        required: true
    },
    duration: {
        type: String,
        required: true,
        default: "1 hour"
    }
})

const serviceModel = new model("Service",serviceSchema);

export {
    serviceModel
}