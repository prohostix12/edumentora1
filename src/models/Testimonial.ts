import { Schema, model, models } from "mongoose";

const TestimonialSchema = new Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  feedback: { type: String, required: true },
  image: { type: String, default: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=256&h=256&fit=crop" },
  rating: { type: Number, default: 5 },
  order: { type: Number, default: 0 },
  enabled: { type: Boolean, default: true },
});

export const Testimonial = models.Testimonial || model("Testimonial", TestimonialSchema);
