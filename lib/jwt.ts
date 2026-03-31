
import jwt from "jsonwebtoken";

export const generateAccessToken =  (userId: string) => {
if(! process.env.ACCESS_TOKEN_SECRET) throw new Error("ACCESS_TOKEN_SECRET is not defined");
  return  jwt.sign(
    { userId },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "15m" }
  );
};

export const generateRefreshToken =  (userId: string) => {
    if(! process.env.REFRESH_TOKEN_SECRET) throw new Error("REFRESH_TOKEN_SECRET is not defined");
  return jwt.sign(
    { userId },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "7d" }
  );
};