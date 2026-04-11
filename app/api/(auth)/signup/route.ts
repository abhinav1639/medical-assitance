import { prisma } from "@/src/lib/prisma";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";


export  async function POST(req:NextRequest,res:NextResponse){
    
    const body = await req.json() ;
    const userOtp = body.code
    const Date = body.currentTime
    const email = body.email
    const password = body.password 
    const otp = body.otp

    if(!userOtp) return NextResponse.json({message:"Please provide code"},{status:400});
    
    try {
        const findUserOtp = await prisma.otpVerify.findFirst({
            where:{email}
        })
        if(!findUserOtp) return NextResponse.json({message:"User not found"},{status:400})
            if(Date === findUserOtp.createdAt) return NextResponse.json({message:"OTP expired"},{status:400})
        const verifyOtp = await bcrypt.compare(userOtp,findUserOtp.otp);
        
        if(!verifyOtp) return NextResponse.json({message:"Invalid code"},{status:400}) 

        const hashPassword = await bcrypt.hash(password,10)
         await prisma.user.create({
            data:{
                email:email,
                password:hashPassword,
                name:email.split("@")[0].replace(/\d/g,""),
                verifiedUser:true,
            }
        })
        await prisma.otpVerify.deleteMany({
            where:{email}
        })
     
        return NextResponse.json({message:"User created successfully"},{status:200})


    } catch (error) {
        console.log(error,"error");
    }  

}
