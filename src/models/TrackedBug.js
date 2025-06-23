import { Schema } from "mongoose";

export const TrackedBugSchema = new Schema(
  {
    accountId: { type: Schema.ObjectId, required: true, ref: "Accounts" },
    bugId: { type: Schema.ObjectId, required: true, ref: "Bug" },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
  }
);

TrackedBugSchema.virtual("bug", {
  localField: "bugId",
  ref: "Bug",
  foreignField: "_id",
  justOne: true,
});

TrackedBugSchema.virtual("tracker", {
  localField: "accountId",
  ref: "Account",
  foreignField: "_id",
  justOne: true,
});
