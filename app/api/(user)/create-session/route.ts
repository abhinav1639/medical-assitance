
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/src/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){
      try {
          const userId = await getCurrentUser()
          console.log("userid",userId)
    if(!userId) return NextResponse.json({message:"Unauthorized"},{status:401});
    const body = await req.json();
    const {selectedDoctorId ,doctorName,speciality} = body





    const createSession = await prisma.session.create({data:{
        selectedDoctorId:selectedDoctorId,
        userId:userId,
        doctorName:doctorName,
        speciality:speciality
    }} as any)
    
    return NextResponse.json({createSession},{status:200})
      } catch (error) {
        console.log(error);
      }
  

}

export async function GET(req:NextRequest){
    try {
        const userId = await getCurrentUser()
        if(!userId) return NextResponse.json({message:"Unauthorized"},{status:401});
        const session = await prisma.session.findMany({where:{userId:userId}})
        return NextResponse.json({session},{status:200})
    } catch (error) {
        console.log(error);
    }
}