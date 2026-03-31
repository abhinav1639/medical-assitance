'use server'

import { getCurrentUser } from '@/lib/auth'
import { prisma } from '@/src/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const userId = await getCurrentUser()
    if (!userId) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })

    const allappointment = await prisma.booking.findMany({ where: { userId: userId } })
    return NextResponse.json({ allappointment }, { status: 200 })
  } catch (error) {
    console.log(error)
  }
}
