'use server'

import { forgetPasswordOtpSend } from '@/lib/nodemailer'
import { prisma } from '@/src/lib/prisma'
import bcrypt from 'bcryptjs'
import { NextRequest, NextResponse } from 'next/server'
export async function POST(req: NextRequest) {
  const { email } = await req.json()
  console.log(email)

  const user = await prisma.user.findUnique({ where: { email }, select: { id: true, email: true } })
  if (!user) return NextResponse.json({ message: 'User not found' }, { status: 400 })

  const generateOtp = Math.floor(100000 + Math.random() * 900000).toString()
  const hashOtp = await bcrypt.hash(generateOtp, 10)

  await forgetPasswordOtpSend({
    to: user.email,
    otp: hashOtp,
    name: user.email.split('@')[0].replace(/\d/g, ''),
  })

  const otpExpireDate = new Date()
  otpExpireDate.setMinutes(otpExpireDate.getMinutes() + 5)

  await prisma.otpVerify.create({
    data: { email: user.email, otp: hashOtp, expireOtp: otpExpireDate },
  })

  return NextResponse.json({ message: 'Otp sent successfully' }, { status: 200 })
}
