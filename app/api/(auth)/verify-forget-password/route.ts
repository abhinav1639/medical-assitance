import { prisma } from '@/src/lib/prisma'
import bcrypt from 'bcryptjs'
import { NextRequest, NextResponse } from 'next/server'

type props = {
  email: string
  otp: string
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { email, otp }: props = body
  if (!email || !otp)
    return NextResponse.json({ message: 'Please provide email and otp' }, { status: 400 })

  const user = await prisma.otpVerify.findFirst({ where: { email } })

  if (!user) return NextResponse.json({ message: 'User not found' }, { status: 400 })

  const verifyOtp = await bcrypt.compare(otp, user.otp)
  if (!verifyOtp) return NextResponse.json({ message: 'Invalid code' }, { status: 400 })

  return NextResponse.json({ message: 'Otp verified successfully' }, { status: 200 })
}
