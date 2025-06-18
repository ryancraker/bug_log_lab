import { Schema } from "mongoose";

export const TrackedBugSchema = new Schema(
  {

  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true }
  }
)
