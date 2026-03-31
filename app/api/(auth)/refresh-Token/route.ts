import { prisma } from '@/src/lib/prisma'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { generateAccessToken, generateRefreshToken } from '@/lib/jwt'
import { NextResponse } from 'next/server'

export async function POST(req: any) {
  const oldToken = req.cookies.get('refreshToken')?.value
  if (!process.env.REFRESH_TOKEN_SECRET) throw new Error('REFRESH_TOKEN_SECRET is not defined')

  if (!oldToken) {
    return NextResponse.json({ error: 'No token' }, { status: 401 })
  }

  try {
    const decoded = jwt.verify(oldToken, process.env.REFRESH_TOKEN_SECRET) as JwtPayload

    const tokenInDb = await prisma.refreshToken.findUnique({
      where: { token: oldToken },
    })

    if (!tokenInDb) {
      return NextResponse.json({ error: 'Invalid' }, { status: 403 })
    }

    // ❗ delete old token (rotation)
    await prisma.refreshToken.delete({
      where: { token: oldToken },
    })

    // ✅ new tokens
    const newAccessToken = generateAccessToken(decoded.userId)
    const newRefreshToken = generateRefreshToken(decoded.userId)

    await prisma.refreshToken.create({
      data: {
        token: newRefreshToken,
        userId: decoded.userId,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    })

    const res = NextResponse.json(
      // { accessToken: newAccessToken }
      { status: 200 }
    )
    res.cookies.set('refreshToken', newRefreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60, // 7 days
    })

    res.cookies.set('accessToken', newAccessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      path: '/',
      maxAge: 15 * 6,
    })

    return res
  } catch {
    return NextResponse.json({ error: 'Expired' }, { status: 403 })
  }
}
