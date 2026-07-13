import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { connectToDatabase } from '@/lib/mongodb';
import { Admin } from '@/models/Admin';

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    // Ensure DB connection
    await connectToDatabase();

    // Find admin by username
    const admin = await Admin.findOne({ username });
    if (!admin) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
    }

    const passwordMatch = await bcrypt.compare(password, admin.passwordHash);
    if (!passwordMatch) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
    }

    const token = jwt.sign(
      { role: "admin", username },
      process.env.NEXT_PUBLIC_JWT_SECRET || "supersecretkey",
      { expiresIn: "2h" }
    );
    const response = NextResponse.json({ message: "Login successful" });
    response.cookies.set("admin_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 2 * 60 * 60,
    });
    return response;
  } catch (err: any) {
    console.error("❌ Admin login error:", err.message);
    return NextResponse.json(
      { message: "Server error: " + err.message },
      { status: 500 }
    );
  }
}




