import { getCurrentUser } from '@/lib/auth'
import { prisma } from '@/src/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function PUT(req: NextRequest) {
  const userId = await getCurrentUser()
  const { name, email, phoneNumber } = await req.json()
  if (!userId) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    
try {

     const updatedUser = await prisma.user.update({ where: { 
    id: userId }, data: {
         name: name,
         email:email,
         phoneNumber:phoneNumber,
        
        } as any })
  

  return NextResponse.json({ updatedUser }, { status: 200 })
    
    
} catch (error) {
    console.log(error)
}
 
}
