import mongoose, { Schema } from "mongoose";

const resultSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  accuracy: {
    type: Number,
    required: true,
  },
  cpm: {
    type: Number,
    required: true,
  },
  wpm: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Result = mongoose.model("result", resultSchema);
export default Result;
