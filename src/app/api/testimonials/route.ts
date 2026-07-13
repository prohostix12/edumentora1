import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Testimonial } from "@/models/Testimonial";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await connectToDatabase();
    const data = await Testimonial.find({ enabled: { $ne: false } }).sort({ order: 1 });
    return NextResponse.json(data);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
