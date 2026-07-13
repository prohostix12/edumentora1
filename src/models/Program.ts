import { Schema, model, models } from "mongoose";

const ProgramSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  href: { type: String, required: true },
  image: { type: String, required: true },
  imageAlt: { type: String, default: "" },
  accent: { type: String, default: "from-primary/15 to-primary/5" },
  ring: { type: String, default: "ring-primary/15" },
  button: { type: String, default: "from-primary to-primary-dark" },
});

export const Program = models.Program || model("Program", ProgramSchema);
