import { Schema } from "mongoose";

export const NoteSchema = new Schema(
  {
    body: { type: String, minLength: 5, maxLength: 500, required: true },
    creatorId: { type: Schema.ObjectId, required: true, ref: "Accounts" },
    bugId: { type: Schema.ObjectId, required: true, ref: "Bug" },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
  }
);
NoteSchema.virtual("creator", {
  localField: "creatorId",
  ref: "Account",
  foreignField: "_id",
  justOne: true,
});
