const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");

// Load .env.local
dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("❌ MONGODB_URI is not defined in .env.local");
  process.exit(1);
}

const HomeSchema = new mongoose.Schema({
  heroBadge: String,
  heroTitle: String,
  heroDescription: String,
});

const Home = mongoose.models.Home || mongoose.model("Home", HomeSchema);

async function run() {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(MONGODB_URI);
    console.log("Connected successfully.");

    // Update existing document or create one
    const updated = await Home.findOneAndUpdate(
      {},
      {
        heroBadge: "Kerala's Premier Credit Transfer Institute",
        heroTitle: "Empowering Students Through Credit Transfer",
        heroDescription: "Resume your education with the Best Academic Credit Transfer institution in Kerala. Recognizing credits and saving time and cost to achieve your academic goals."
      },
      { upsert: true, new: true }
    );

    console.log("✅ Home content updated successfully in MongoDB:", updated);
    process.exit(0);
  } catch (error) {
    console.error("❌ Update failed:", error);
    process.exit(1);
  }
}

run();
