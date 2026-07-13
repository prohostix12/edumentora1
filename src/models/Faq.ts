import { Schema, model, models } from "mongoose";

const FaqSchema = new Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true },
  order: { type: Number, default: 0 },
  enabled: { type: Boolean, default: true },
});

export const Faq = models.Faq || model("Faq", FaqSchema);
