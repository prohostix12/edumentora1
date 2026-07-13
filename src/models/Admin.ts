import { Schema, model, models } from "mongoose";

const AdminSchema = new Schema({
  username: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true }, // bcrypt hash
});

export const Admin = models.Admin || model("Admin", AdminSchema);
