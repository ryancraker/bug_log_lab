import { Schema } from "mongoose";

export const BugSchema = new Schema(
  {
    title: { type: String, maxLength: 50, minLength: 10, required: true },
    description: {
      type: String,
      maxLength: 500,
      minLength: 10,
      required: true,
    },
    priority: { type: Number, enum: [1, 2, 3, 4, 5], required: true },
    closed: { type: Boolean, default: false, required: true },
    closedDate: { type: Date },
    creatorId: { type: Schema.ObjectId, required: true, ref: "Account" },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
  }
);
BugSchema.virtual("creator", {
  localField: "creatorId",
  ref: "Account",
  foreignField: "_id",
  justOne: true,
});
