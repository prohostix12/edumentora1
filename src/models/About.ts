import { Schema, model, models } from "mongoose";

const AboutSchema = new Schema({
  title: { type: String, default: "Best Credit Transfer Institute in Kerala for B.Tech Students" },
  introText: { type: String, default: "Edumentora is dedicated to guiding students through B.Tech credit transfers, ensuring standard guidelines are met seamlessly." },
  fullContent: { type: String, default: "We provide comprehensive support, evaluation of syllabus compatibility, and handhold you until successful admission and degree completion." },
});

export const About = models.About || model("About", AboutSchema);
