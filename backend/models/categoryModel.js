import mongoose, {Schema, model} from "mongoose";

const categorySchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    description : {
        type: String,
    },
    image_url: {
        type: String,
    }
})

const categoryModel = new model("ServiceCategory",categorySchema);

export {
    categoryModel
}