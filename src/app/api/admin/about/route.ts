import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { About } from "@/models/About";

export async function GET() {
  try {
    await connectToDatabase();
    let data = await About.findOne({});
    if (!data) {
      data = new About();
    }
    return NextResponse.json(data);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await connectToDatabase();
    const body = await request.json();
    let data = await About.findOne({});
    if (data) {
      Object.assign(data, body);
      await data.save();
    } else {
      data = await About.create(body);
    }
    return NextResponse.json(data);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
