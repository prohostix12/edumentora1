import { Schema, model, models } from "mongoose";

const HomeSchema = new Schema({
  heroBadge: { type: String, default: "Kerala's Premier Credit Transfer Institute" },
  heroTitle: { type: String, default: "Empowering Students Through Credit Transfer" },
  heroDescription: { type: String, default: "Resume your education with the Best Academic Credit Transfer institution in Kerala. Recognizing credits and saving time and cost to achieve your academic goals." },
  missionTitle: { type: String, default: "Our Mission" },
  missionDescription: { type: String, default: "To provide accessible pathways for students to achieve their academic goals through credit transfer." },
  visionTitle: { type: String, default: "Our Vision" },
  visionDescription: { type: String, default: "To be the leading credit transfer guidance institute in India, fostering smooth academic transitions." },
  achievementsTitle: { type: String, default: "Our Great Achievements" },
  achievementsSubtitle: { type: String, default: "Over the years, we have helped thousands of students achieve their dreams of higher education." },
});

export const Home = models.Home || model("Home", HomeSchema);
