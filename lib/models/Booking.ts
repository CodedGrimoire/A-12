import { Schema, models, model } from "mongoose";

const BookingSchema = new Schema(
  {
    userUid: { type: String, required: true },
    userEmail: { type: String, required: true },
    serviceId: { type: String, required: true },
    serviceName: { type: String, required: true },
    duration: {
      value: { type: Number, required: true },
      unit: { type: String, enum: ["hours", "days"], required: true },
    },
    location: {
      division: String,
      district: String,
      city: String,
      area: String,
    },
    totalCost: { type: Number, required: true },
    status: {
      type: String,
      enum: ["Pending", "Confirmed", "Completed", "Cancelled"],
      default: "Pending",
    },
  },
  { timestamps: true },
);

export const BookingModel =
  models.Booking || model("Booking", BookingSchema);
