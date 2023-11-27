import mongoose, { Schema } from "mongoose";
import { model } from "mongoose";

const citySchema = new mongoose.Schema({
    name: {type: String, required:true},
    lat: {type: Number, required:false},
    lng: {type: Number, required:false},
    status: {type: String, required:true, default: 'active'},
    created_at: {type: Date, required: true, default: new Date()},
    updated_at: {type: Date, required:true, default: new Date()},

});

export default model ('cities', citySchema)