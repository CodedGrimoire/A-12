import { Schema, models, model } from "mongoose";

const ServiceSchema = new Schema(
  {
    slug: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    category: { type: String, required: true },
    summary: String,
    description: String,
    hourlyRate: Number,
    dailyRate: Number,
    features: [String],
    notes: String,
  },
  { timestamps: true },
);

export const ServiceModel = models.Service || model("Service", ServiceSchema);
