import mongoose from "mongoose";



const urlSchema = new mongoose.Schema({
  url: { type: String, required: true },
  shortCode: { type: String, required: true, unique: true },
  accessCount: { type: Number, default: 0 },
}, { timestamps: true });


const urlModel =
  mongoose.models.url || mongoose.model("url", urlSchema);

export default urlModel
