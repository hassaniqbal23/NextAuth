// app/api/login/route.ts
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required" },
        { status: 400 }
      );
    }

    const token = jwt.sign({ userId: 1 }, "secretkey", {
      expiresIn: "1h",
    });

    const response = NextResponse.json({
      token,
      user: {
        id: "ali",
        email: "admin1@gmail.com",
        userName: "ali",
      },
    });

    // Set the token in a cookie
    response.cookies.set("token", token, { httpOnly: true, maxAge: 3600 }); // Cookie expires in 1 hour

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
