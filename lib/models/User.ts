import { Schema, models, model } from "mongoose";

const UserSchema = new Schema(
  {
    uid: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    name: String,
    contact: String,
    nid: String,
    photoUrl: String,
  },
  { timestamps: true },
);

export const UserModel = models.User || model("User", UserSchema);
