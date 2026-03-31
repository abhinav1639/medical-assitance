import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/src/lib/prisma";
import next from "next";
import { NextResponse } from "next/server";



export async function PUT(){
  
    const userId = await getCurrentUser()
    if(!userId) return NextResponse.json({message:"Unauthorized"},{status:401})
  try {
    await prisma.notification.updateMany({where:{ userId:userId,read:false},data:{read:true}})
    return NextResponse.json({message:"success"},{status:200})
  } catch (error) {
      return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }


}export async function GET (){
    const userId = await getCurrentUser()
    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    try {
        const notifications = await prisma.notification.findMany({where:{userId:userId},orderBy:{createdAt:"desc"},take:5})
        return NextResponse.json({notifications},{status:200})
    } catch (error) {
        console.log(error);
    }
}
