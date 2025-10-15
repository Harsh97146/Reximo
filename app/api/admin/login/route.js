import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required" },
        { status: 400 }
      );
    }

    // In a real application, you would validate against a database
    // This is a mock implementation for demonstration
    if (email === "admin@reximo.com" && password === "admin123") {
      // Create a mock token (in production, use JWT or other secure method)
      const token = "mock-jwt-token-" + Math.random().toString(36).substring(2);
      
      // Mock user data
      const user = {
        id: 1,
        email: "admin@reximo.com",
        name: "Admin User",
        role: "admin",
      };

      return NextResponse.json({ 
        message: "Login successful", 
        token, 
        user 
      });
    }

    return NextResponse.json(
      { message: "Invalid email or password" },
      { status: 401 }
    );
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}