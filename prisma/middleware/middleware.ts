// import jwt from "jsonwebtoken"
// import {  NextResponse } from "next/server";
//  export default function middleware(req, next) {
    
//     const token = req.cookies.get('refreshToken')?.value;
//     if(!token) return NextResponse.json({message:"Unauthorized"},{status:401});
//    try {
//     jwt.verify(token,process.env.REFRESH_TOKEN);
//     return NextResponse.next()
//    } catch (error) {
//     console.log(error);
//    }
  

// }

import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(req:NextRequest) {
  const authHeader = req.headers.get("authorization");


  if (!authHeader) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const token = authHeader.split(" ")[1];

  try {
        if (!process.env.ACCESS_TOKEN_SECRET) {
      throw new Error("ACCESS_TOKEN_SECRET is not defined");
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    return NextResponse.next();
  } catch {
    return NextResponse.json({ error: "Invalid" }, { status: 403 });
  }
}