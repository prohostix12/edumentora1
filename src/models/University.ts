import { Schema, model, models } from "mongoose";

const UniversitySchema = new Schema({
  name: { type: String, required: true },
  logo: { type: String, required: true }, // Logo filename or URL
  website: { type: String, default: "" },
  description: { type: String, default: "" },
});

export const University = models.University || model("University", UniversitySchema);
