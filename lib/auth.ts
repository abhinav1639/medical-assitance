// import { cookies } from "next/headers";
// import jwt, { JwtPayload } from "jsonwebtoken";


// export const getCurrentUser = async()=>{
//     if(!process.env.ACCESS_TOKEN_SECRET) throw new Error("ACCESS_TOKEN_SECRET is not defined");
//     const token = (await cookies()).get("accessToken")?.value;
//     if(!token) return null;
    
//     const decoded :JwtPayload = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)as JwtPayload    
//     return decoded.id

// }


import { cookies } from "next/headers";
import jwt, { JwtPayload } from "jsonwebtoken";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/(auth)/auth/[...nextauth]/route";

export const getCurrentUser = async (): Promise<string | null> => {
  // Primary auth path (your custom JWT cookies)
  if (process.env.ACCESS_TOKEN_SECRET) {
    const token = (await cookies()).get("accessToken")?.value;
    if (token) {
      try {
        const decoded: JwtPayload = jwt.verify(
          token,
          process.env.ACCESS_TOKEN_SECRET
        ) as JwtPayload;
        return decoded.userId;
      } catch {
        return null;
      }
    }
  }

  // Fallback auth path (NextAuth Google session)
  const session = await getServerSession(authOptions);
  return (session as any)?.userId ?? null;

};