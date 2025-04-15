import mongoose, { models, Schema } from "mongoose";

const userSchema = new Schema(
  {
    googleId: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    totalWPM: {
      type: Number,
      default: 0,
    },
    totalCPM: {
      type: Number,
      default: 0,
    },
    totalAccuracy: {
      type: Number,
      default: 0,
    },
    practices: {
      type: Number,
      default: 0,
    }
  },
  { timestamps: true }
);

const User = models.User || mongoose.model("User", userSchema);
export default User;
