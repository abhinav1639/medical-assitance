import {getCurrentUser} from  "@/lib/auth"
import { prisma } from "@/src/lib/prisma"
import { NextResponse } from "next/server"

export async function GET() {
   const userId = await getCurrentUser()
   if (!userId) {
     return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
   }

   const currentUserData = await prisma.user.findUnique({where:{id:userId},select: {
    id: true,
    name: true,
    email: true,
   
  }})

   if(!currentUserData) return NextResponse.json({message:"User not found"},{status:400})

   return NextResponse.json({currentUserData})
}