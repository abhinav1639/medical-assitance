'use client'

import { motion } from 'framer-motion'
import { Star } from 'lucide-react'
import { Doctor } from '@/app/data/data'
import api from '@/lib/api'
import { useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux'
import { setDoctorSession } from '@/app/redux/slice/userSlice'
// import SelectedDoctor from "../selected-doctor/[sessionId]/page";

interface DoctorCardProps {
  doctor: Doctor
  index: number
  onConsult?: (doctor: Doctor) => void
}

export function DoctorCard({ doctor, index, onConsult }: DoctorCardProps) {
  const router = useRouter()
  const dispatch = useDispatch()
  const handelClick = async (doctor: Doctor) => {
    console.log(doctor)
    const result = await api.post('/create-session', {
      selectedDoctorId: doctor.vapiId,
      doctorName: doctor.name,
      speciality: doctor.specialization
    })
    console.log(result.data)
    dispatch(setDoctorSession(result.data.createSession))
    router.push(`selected-doctor/${result.data.createSession.id}`)
  }
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.04 }}
      whileHover={{ y: -4, boxShadow: '0 12px 40px -12px hsl(210 80% 55% / 0.15)' }}
      className="rounded-xl bg-card border border-border p-5 flex flex-col items-center text-center transition-colors"
    >
      <div className="relative mb-3">
        <img
          src={doctor.avatar}
          alt={doctor.name}
          className="h-16 w-16 rounded-full bg-secondary"
        />
        <span
          className={`absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-card ${doctor.online ? 'bg-success' : 'bg-muted-foreground/40'}`}
        />
      </div>
      <h3 className="font-semibold text-sm text-card-foreground">{doctor.name}</h3>
      <p className="text-xs text-muted-foreground mt-0.5">{doctor.specialization}</p>
      <div className="flex items-center gap-1 mt-2">
        <Star className="h-3.5 w-3.5 fill-warning text-warning" />
        <span className="text-xs font-medium text-card-foreground">{doctor.rating}</span>
        <span className="text-xs text-muted-foreground">· {doctor.experience}y exp</span>
      </div>
      <p className="text-[11px] text-muted-foreground mt-1">
        Next: <span className="font-medium text-card-foreground">{doctor.nextSlot}</span>
      </p>
      <button
        onClick={() => handelClick(doctor)}
        className="mt-3 w-full py-2 rounded-lg bg-primary text-primary-foreground text-xs font-medium hover:bg-primary/90 transition-colors"
      >
        Consult Now
      </button>
    </motion.div>
  )
}
