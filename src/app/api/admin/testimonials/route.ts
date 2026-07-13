import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Testimonial } from "@/models/Testimonial";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await connectToDatabase();
    const data = await Testimonial.find({}).sort({ order: 1 });
    return NextResponse.json(data);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await connectToDatabase();
    const body = await request.json();
    const item = await Testimonial.create(body);
    return NextResponse.json(item);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    await connectToDatabase();
    const body = await request.json();
    const { _id, ...updateData } = body;
    const item = await Testimonial.findByIdAndUpdate(_id, updateData, { new: true });
    return NextResponse.json(item);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    await connectToDatabase();
    const url = new URL(request.url);
    const id = url.searchParams.get("id");
    await Testimonial.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
