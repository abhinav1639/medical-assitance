import { prisma } from '@/src/lib/prisma'
import bcrypt from 'bcryptjs'
import { NextRequest, NextResponse } from 'next/server'
import { generateAccessToken, generateRefreshToken } from '@/lib/jwt'

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { email, password } = body
  console.log(email, password)

  try {
    if (typeof email !== 'string' || typeof password !== 'string' || !email || !password) {
      return NextResponse.json({ message: 'Please provide email and password' }, { status: 400 })
    }

    const user = await prisma.user.findUnique({
      where: { email },
    })

    if (!user) return NextResponse.json({ message: 'User not found' }, { status: 400 })

    const verifyPassword = await bcrypt.compare(password, user.password ?? '')

    if (!verifyPassword) return NextResponse.json({ message: 'Invalid password' }, { status: 400 })

    const accessToken = generateAccessToken(user.id)
    const refreshToken = generateRefreshToken(user.id)

    await prisma.refreshToken.create({
      data: {
        token: refreshToken,
        userId: user.id,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    })

    const res = NextResponse.json(
      { accessToken, user: { email: user.email, name: user.name, id: user.id } },
      { status: 200 }
    )

    res.cookies.set('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60,
    })

    res.cookies.set('accessToken', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 15,
    })

    return res
  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: 'Error in signing routes' }, { status: 500 })
  }
}
