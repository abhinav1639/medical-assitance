
import { prisma } from "@/src/lib/prisma";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refreshToken")?.value;

  try {
    // 1️⃣ Delete refresh token from DB
    if (refreshToken) {
      await prisma.refreshToken.deleteMany({
        where: { token: refreshToken },
      });
    }

    // 2️⃣ Clear cookies
    const res = NextResponse.json({ message: "Logged out successfully" });

    res.cookies.set("refreshToken", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 0, // delete
      sameSite: "lax",
    });

    res.cookies.set("accessToken", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 0, // delete
      sameSite: "lax",
    });

    return res;
  } catch (err) {
    console.log("Logout error:", err);
    return NextResponse.json(
      { message: "Error logging out" },
      { status: 500 }
    );
  }
}