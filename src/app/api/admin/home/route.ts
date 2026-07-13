import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Home } from "@/models/Home";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await connectToDatabase();
    let data = await Home.findOne({});
    if (!data) {
      data = new Home();
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
    let data = await Home.findOne({});
    if (data) {
      Object.assign(data, body);
      await data.save();
    } else {
      data = await Home.create(body);
    }
    return NextResponse.json(data);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
