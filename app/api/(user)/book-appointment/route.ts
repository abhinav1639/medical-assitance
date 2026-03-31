import { getCurrentUser } from '@/lib/auth'
import { appointmentBookingEmailSend } from '@/lib/nodemailer'
import { prisma } from '@/src/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const userId = await getCurrentUser()
  if (!userId) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  try {
    const { doctor, selections, showConfirmation } = await req.json()
    console.log(doctor, selections, showConfirmation, 'backend response')

    const booking = await prisma.booking.create({
      data: {
        userId: userId,
        consultationNotes: selections[0],
        date: selections[1],
        timing: selections[2],
        doctorName: doctor.name,
        specialization: doctor.specialization,
        veifiedBooking: showConfirmation,
        avatar: doctor.avatar,
        status: 'pending',
      },
    })

    const user = await prisma.user.findUnique({ where: { id: userId } })
    if (!user) return NextResponse.json({ message: 'User not found' }, { status: 400 })
    if (!user.name) return NextResponse.json({ message: 'User name not found' }, { status: 400 })

    const bookingData = await prisma.booking.findUnique({ where: { id: booking.id } })
    if (!bookingData) return NextResponse.json({ message: 'Booking not found' }, { status: 400 })

    await appointmentBookingEmailSend({
      to: user.email,
      consultation: bookingData.consultationNotes,
      date: bookingData.date,
      timing: bookingData.timing,
      doctorName: bookingData.doctorName,
      specialization: bookingData.specialization,
      patientName: user.name,
    })

    await prisma.notification.create({
      data: {
        userId: userId,
        description: `Your appointment with ${bookingData.doctorName} has been scheduled for ${bookingData.date} at ${bookingData.timing}.`,
        type: 'appointment',
        title: 'Upcoming Appointment',
        time: new Date().toISOString(),
      },
    })

    return NextResponse.json({ booking }, { status: 200 })
  } catch (error) {
    console.log(error)
  }
}

export async function GET(req: NextRequest) {
  try {
    const userId = await getCurrentUser()
    if (!userId) return NextResponse.json({ message: 'unAuthenticated user' }, { status: 400 })

    const allappointment = await prisma.booking.findMany({ where: { userId: userId } })
    return NextResponse.json({ allappointment }, { status: 200 })
  } catch (error) {
    console.log(error)
  }
}
