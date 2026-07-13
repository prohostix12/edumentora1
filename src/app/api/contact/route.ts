import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Enquiry } from "@/models/Enquiry";

export async function GET() {
  try {
    await connectToDatabase();
    const data = await Enquiry.find({}).sort({ createdAt: -1 });
    return NextResponse.json(data);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await connectToDatabase();
    const body = await request.json();
    const item = await Enquiry.create(body);
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
    await Enquiry.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
