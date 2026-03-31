import { prisma } from '@/src/lib/prisma'
import bcrypt from 'bcryptjs'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { email, password }: { email: string; password: string } = await req.json()
    if (!password || !email)
      return NextResponse.json({ message: 'Please provide email and password' }, { status: 400 })

    const hashPassword = await bcrypt.hash(password, 10)
    await prisma.user.update({ where: { email }, data: { password: hashPassword } })

    return NextResponse.json({ message: 'Password updated successfully' }, { status: 200 })
  } catch (error) {}
}
