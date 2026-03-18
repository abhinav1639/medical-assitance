import { prisma } from "@/src/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const doctors = await prisma.doctor.findMany({
    orderBy: [{ rating: "desc" }, { name: "asc" }],
  });
  return NextResponse.json({ doctors });
}

