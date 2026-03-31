


import { prisma } from "@/src/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs"
import {sendMail} from "@/lib/nodemailer"

export  async function POST(req:NextRequest,res:NextResponse){
    const {email ,password}:{email:string,password:string} = await req.json()
    console.log(email,password)

   try {
     if(!email || !password){
        return NextResponse.json({message:"Please provide email and password"},{status:400})
    }
    const existingUser = await prisma.user.findUnique({
        where:{email}
    })
    if(existingUser){
        return NextResponse.json({message:"User already exists"},{status:400})
    }
    
    // const hashPassword = await bcrypt.hash(password,10)
    const userName = email.split("@")[0].replace(/\d/g,"")
 
     const otp= Math.floor(100000+Math.random()*900000).toString()
     console.log(otp)
    const hashOtp = await bcrypt.hash(otp,10);
   
    // const date = new Date()
    // // const otpCreateTime = date.getMinutes() + ":" + date.getSeconds()
    // const otpExpireDate = date.setMinutes(date.getMinutes() + 5).toString()
 const otpExpireDate = new Date();
otpExpireDate.setMinutes(otpExpireDate.getMinutes() + 5);

console.log(otpExpireDate)
    
     await prisma.otpVerify.create({
        data:{
            email:email,                
            otp:hashOtp,
            expireOtp:otpExpireDate ,    

        }
    }as any)
    
    
  
    await sendMail({to:email,otp,name:userName})
    

    return NextResponse.json({message:"Check your email for a verification code!"},{status:200})
   } catch (error) {
    console.log(error)
    return NextResponse.json({message:"Something went wrong"},{status:500})
   }

   
    
}