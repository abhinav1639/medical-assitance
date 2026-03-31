// export interface Doctor {
//   id: number;
//   name: string;
//   specialization: string;
//   rating: number;
//   experience: number;
//   online: boolean;
//   nextSlot: string;
//   avatar: string;
//   consultations: number;
// }

// export interface Consultation {
//   id: number;
//   doctorName: string;
//   specialization: string;
//   date: string;
//   time: string;
//   status: "completed" | "pending" | "cancelled";
//   notes: string;
//   avatar: string;
// }

// export interface Notification {
//   id: number;
//   type: "appointment" | "message" | "system";
//   title: string;
//   description: string;
//   time: string;
//   read: boolean;
// }

// const specializations = [
//   "Cardiologist", "Dermatologist", "Neurologist", "Pediatrician",
//   "Orthopedic", "ENT Specialist", "Psychiatrist", "Ophthalmologist",
//   "General Physician", "Gynecologist", "Dentist", "Urologist",
// ];

// const firstNames = [
//   "Sarah", "James", "Emily", "Michael", "Olivia", "David", "Sophia", "Robert",
//   "Ava", "William", "Isabella", "Daniel", "Mia", "Alexander", "Charlotte",
//   "Matthew", "Amelia", "Andrew", "Harper", "Joseph", "Evelyn", "Christopher",
//   "Abigail", "Benjamin",
// ];

// const lastNames = [
//   "Johnson", "Williams", "Brown", "Davis", "Miller", "Wilson", "Moore", "Taylor",
//   "Anderson", "Thomas", "Jackson", "White", "Harris", "Martin", "Garcia",
//   "Robinson", "Clark", "Lewis", "Lee", "Walker", "Hall", "Allen", "Young", "King",
// ];

// export const doctors: Doctor[] = Array.from({ length: 24 }, (_, i) => ({
//   id: i + 1,
//   name: `Dr. ${firstNames[i % firstNames.length]} ${lastNames[i % lastNames.length]}`,
//   specialization: specializations[i % specializations.length],
//   rating: +(3.5 + Math.random() * 1.5).toFixed(1),
//   experience: 3 + Math.floor(Math.random() * 20),
//   online: Math.random() > 0.3,
//   nextSlot: ["10:00 AM", "11:30 AM", "2:00 PM", "3:30 PM", "4:00 PM"][Math.floor(Math.random() * 5)],
//   avatar: `https://api.dicebear.com/9.x/avataaars/svg?seed=${firstNames[i % firstNames.length]}${lastNames[i % lastNames.length]}`,
//   consultations: 50 + Math.floor(Math.random() * 500),
// }));

// export const consultations: Consultation[] = [
//   { id: 1, doctorName: "Dr. Sarah Johnson", specialization: "Cardiologist", date: "2026-03-20", time: "10:00 AM", status: "completed", notes: "Regular checkup. All vitals normal. Follow-up in 3 months.", avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=SarahJohnson" },
//   { id: 2, doctorName: "Dr. James Williams", specialization: "Dermatologist", date: "2026-03-19", time: "2:30 PM", status: "completed", notes: "Skin examination completed. Prescribed topical treatment.", avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=JamesWilliams" },
//   { id: 3, doctorName: "Dr. Emily Brown", specialization: "Neurologist", date: "2026-03-22", time: "11:00 AM", status: "pending", notes: "Scheduled for initial consultation regarding headaches.", avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=EmilyBrown" },
//   { id: 4, doctorName: "Dr. Michael Davis", specialization: "Pediatrician", date: "2026-03-18", time: "9:00 AM", status: "cancelled", notes: "Patient cancelled due to scheduling conflict.", avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=MichaelDavis" },
//   { id: 5, doctorName: "Dr. Olivia Miller", specialization: "Orthopedic", date: "2026-03-21", time: "3:00 PM", status: "pending", notes: "Follow-up for knee pain. X-ray review needed.", avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=OliviaMiller" },
//   { id: 6, doctorName: "Dr. David Wilson", specialization: "ENT Specialist", date: "2026-03-17", time: "1:00 PM", status: "completed", notes: "Hearing test completed. Results within normal range.", avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=DavidWilson" },
//   { id: 7, doctorName: "Dr. Sophia Moore", specialization: "Psychiatrist", date: "2026-03-23", time: "4:00 PM", status: "pending", notes: "Initial mental health evaluation.", avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=SophiaMoore" },
//   { id: 8, doctorName: "Dr. Robert Taylor", specialization: "Ophthalmologist", date: "2026-03-16", time: "10:30 AM", status: "completed", notes: "Eye examination done. New prescription for glasses.", avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=RobertTaylor" },
// ];

// export const notifications: Notification[] = [
//   { id: 1, type: "appointment", title: "Upcoming Appointment", description: "Consultation with Dr. Emily Brown tomorrow at 11:00 AM", time: "2 hours ago", read: false },
//   { id: 2, type: "message", title: "New Message", description: "Dr. Sarah Johnson sent you a follow-up message", time: "4 hours ago", read: false },
//   { id: 3, type: "system", title: "Profile Updated", description: "Your medical records have been updated successfully", time: "1 day ago", read: true },
//   { id: 4, type: "appointment", title: "Appointment Confirmed", description: "Your appointment with Dr. Olivia Miller is confirmed for today", time: "1 day ago", read: true },
//   { id: 5, type: "message", title: "Prescription Ready", description: "Dr. Robert Taylor has uploaded your prescription", time: "2 days ago", read: true },
//   { id: 6, type: "system", title: "System Maintenance", description: "Scheduled maintenance on March 25, 2026 from 2-4 AM", time: "3 days ago", read: true },
// ];

export interface Doctor {
  id: number
  name: string
  specialization: string
  rating: number
  experience: number
  online: boolean
  nextSlot: string
  avatar: string
  consultations: number
  vapiId: string
}

export interface Consultation {
  id: number
  doctorName: string
  specialization: string
  date: string
  time: string
  status: 'completed' | 'pending' | 'cancelled'
  notes: string
  avatar: string
}

export interface Notification {
  id: number
  type: 'appointment' | 'message' | 'system'
  title: string
  description: string
  time: string
  read: boolean
}

// const specializations = [
//   "Cardiologist", "Dermatologist", "Neurologist", "Pediatrician",
//   "Orthopedic", "ENT Specialist", "Psychiatrist", "Ophthalmologist",
//   "General Physician", "Gynecologist", "Dentist", "Urologist",
// ];

// const firstNames = [
//   "Sarah", "James", "Emily", "Michael", "Olivia", "David", "Sophia", "Robert",
//   "Ava", "William", "Isabella", "Daniel", "Mia", "Alexander", "Charlotte",
//   "Matthew", "Amelia", "Andrew", "Harper", "Joseph", "Evelyn", "Christopher",
//   "Abigail", "Benjamin",
// ];

// const lastNames = [
//   "Johnson", "Williams", "Brown", "Davis", "Miller", "Wilson", "Moore", "Taylor",
//   "Anderson", "Thomas", "Jackson", "White", "Harris", "Martin", "Garcia",
//   "Robinson", "Clark", "Lewis", "Lee", "Walker", "Hall", "Allen", "Young", "King",
// ];

// export const doctors: Doctor[] = Array.from({ length: 24 }, (_, i) => ({
//   id: i + 1,
//   name: `Dr. ${firstNames[i % firstNames.length]} ${lastNames[i % lastNames.length]}`,
//   specialization: specializations[i % specializations.length],

//   // ✅ Deterministic values (NO random)
//   rating: +(3.5 + (i % 5) * 0.3).toFixed(1),   // 3.5 → 4.7
//   experience: 3 + (i % 20),                   // 3 → 22 years
//   online: i % 2 === 0,                        // alternate true/false
//   nextSlot: ["10:00 AM", "11:30 AM", "2:00 PM", "3:30 PM", "4:00 PM"][i % 5],
//   consultations: 50 + (i * 13) % 500,         // varied but fixed

//   avatar: `https://api.dicebear.com/9.x/avataaars/svg?seed=${
//     firstNames[i % firstNames.length]
//   }${lastNames[i % lastNames.length]}`,
// }));

export const doctors: Doctor[] = [
  {
    id: 1,
    name: 'Dr. Sarah Johnson',
    specialization: 'Cardiologist',
    rating: 3.5,
    experience: 3,
    online: true,
    nextSlot: '10:00 AM',
    consultations: 50,
    avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=SarahJohnson',
    vapiId:'baa4d0c2-c2d9-4234-be11-41a0c657acb5'
  },
  {
    id: 2,
    name: 'Dr. James Williams',
    specialization: 'Dermatologist',
    rating: 3.8,
    experience: 4,
    online: false,
    nextSlot: '11:30 AM',
    consultations: 63,
    avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=JamesWilliams',
    vapiId: 'bba4d0c2-c2d9-4234-be11'
  },
  {
    id: 3,
    name: 'Dr. Emily Brown',
    specialization: 'Neurologist',
    rating: 4.1,
    experience: 5,
    online: true,
    nextSlot: '2:00 PM',
    consultations: 76,
    avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=EmilyBrown',
    vapiId:"1d11edea-ff2d-4dbd-9aec-a21b8c342b24"
  },
  {
    id: 4,
    name: 'Dr. Michael Davis',
    specialization: 'Pediatrician',
    rating: 4.4,
    experience: 6,
    online: false,
    nextSlot: '3:30 PM',
    consultations: 89,
    avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=MichaelDavis',
     vapiId:"50bfcfdf-381f-4a16-855a-4fbd1de625ad"
  },
  {
    id: 5,
    name: 'Dr. Olivia Miller',
    specialization: 'Orthopedic',
    rating: 4.7,
    experience: 7,
    online: true,
    nextSlot: '4:00 PM',
    consultations: 102,
    avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=OliviaMiller', 
  vapiId:'5e05aeea-29d5-4408-ae26-c19f43748ebd'
  },
  {
    id: 6,
    name: 'Dr. David Wilson',
    specialization: 'ENT Specialist',
    rating: 3.5,
    experience: 8,
    online: false,
    nextSlot: '10:00 AM',
    consultations: 115,
    avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=DavidWilson',
   vapiId: 'cb93edef-7972-4209-a908-88d386a2ca61'
  },
  {
    id: 7,
    name: 'Dr. Sophia Moore',
    specialization: 'Psychiatrist',
    rating: 3.8,
    experience: 9,
    online: true,
    nextSlot: '11:30 AM',
    consultations: 128,
    avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=SophiaMoore',
   vapiId:'bd1e7443-b75a-47fe-b777-63b23efb1220'
  },
  {
    id: 8,
    name: 'Dr. Robert Taylor',
    specialization: 'Ophthalmologist',
    rating: 4.1,
    experience: 10,
    online: false,
    nextSlot: '2:00 PM',
    consultations: 141,
    avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=RobertTaylor',
   vapiId:'4193df29-0b54-4f9e-86c0-9cd12ebfb19e'
  },
  // {
  //   id: 9,
  //   name: 'Dr. Ava Anderson',
  //   specialization: 'General Physician',
  //   rating: 4.4,
  //   experience: 11,
  //   online: true,
  //   nextSlot: '3:30 PM',
  //   consultations: 154,
  //   avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=AvaAnderson', vapiId:
  // },
  // {
  //   id: 10,
  //   name: 'Dr. William Thomas',
  //   specialization: 'Gynecologist',
  //   rating: 4.7,
  //   experience: 12,
  //   online: false,
  //   nextSlot: '4:00 PM',
  //   consultations: 167,
  //   avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=WilliamThomas', vapiId:
  // },
  // {
  //   id: 11,
  //   name: 'Dr. Isabella Jackson',
  //   specialization: 'Dentist',
  //   rating: 3.5,
  //   experience: 13,
  //   online: true,
  //   nextSlot: '10:00 AM',
  //   consultations: 180,
  //   avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=IsabellaJackson', vapiId:
  // },
  // {
  //   id: 12,
  //   name: 'Dr. Daniel White',
  //   specialization: 'Urologist',
  //   rating: 3.8,
  //   experience: 14,
  //   online: false,
  //   nextSlot: '11:30 AM',
  //   consultations: 193,
  //   avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=DanielWhite', vapiId:
  // },
  // {
  //   id: 13,
  //   name: 'Dr. Mia Harris',
  //   specialization: 'Cardiologist',
  //   rating: 4.1,
  //   experience: 15,
  //   online: true,
  //   nextSlot: '2:00 PM',
  //   consultations: 206,
  //   avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=MiaHarris', vapiId:
  // },
  // {
  //   id: 14,
  //   name: 'Dr. Alexander Martin',
  //   specialization: 'Dermatologist',
  //   rating: 4.4,
  //   experience: 16,
  //   online: false,
  //   nextSlot: '3:30 PM',
  //   consultations: 219,
  //   avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=AlexanderMartin', vapiId:
  // },
  // {
  //   id: 15,
  //   name: 'Dr. Charlotte Garcia',
  //   specialization: 'Neurologist',
  //   rating: 4.7,
  //   experience: 17,
  //   online: true,
  //   nextSlot: '4:00 PM',
  //   consultations: 232,
  //   avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=CharlotteGarcia', vapiId:
  // },
  // {
  //   id: 16,
  //   name: 'Dr. Matthew Robinson',
  //   specialization: 'Pediatrician',
  //   rating: 3.5,
  //   experience: 18,
  //   online: false,
  //   nextSlot: '10:00 AM',
  //   consultations: 245,
  //   avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=MatthewRobinson', vapiId:
  // },
  // {
  //   id: 17,
  //   name: 'Dr. Amelia Clark',
  //   specialization: 'Orthopedic',
  //   rating: 3.8,
  //   experience: 19,
  //   online: true,
  //   nextSlot: '11:30 AM',
  //   consultations: 258,
  //   avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=AmeliaClark', vapiId:
  // },
  // {
  //   id: 18,
  //   name: 'Dr. Andrew Lewis',
  //   specialization: 'ENT Specialist',
  //   rating: 4.1,
  //   experience: 20,
  //   online: false,
  //   nextSlot: '2:00 PM',
  //   consultations: 271,
  //   avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=AndrewLewis', vapiId:
  // },
  // {
  //   id: 19,
  //   name: 'Dr. Harper Lee',
  //   specialization: 'Psychiatrist',
  //   rating: 4.4,
  //   experience: 21,
  //   online: true,
  //   nextSlot: '3:30 PM',
  //   consultations: 284,
  //   avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=HarperLee', vapiId:
  // },
  // {
  //   id: 20,
  //   name: 'Dr. Joseph Walker',
  //   specialization: 'Ophthalmologist',
  //   rating: 4.7,
  //   experience: 22,
  //   online: false,
  //   nextSlot: '4:00 PM',
  //   consultations: 297,
  //   avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=JosephWalker', vapiId:
  // },
  // {
  //   id: 21,
  //   name: 'Dr. Evelyn Hall',
  //   specialization: 'General Physician',
  //   rating: 3.5,
  //   experience: 3,
  //   online: true,
  //   nextSlot: '10:00 AM',
  //   consultations: 310,
  //   avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=EvelynHall', vapiId:
  // },
  // {
  //   id: 22,
  //   name: 'Dr. Christopher Allen',
  //   specialization: 'Gynecologist',
  //   rating: 3.8,
  //   experience: 4,
  //   online: false,
  //   nextSlot: '11:30 AM',
  //   consultations: 323,
  //   avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=ChristopherAllen', vapiId:
  // },
  // {
  //   id: 23,
  //   name: 'Dr. Abigail Young',
  //   specialization: 'Dentist',
  //   rating: 4.1,
  //   experience: 5,
  //   online: true,
  //   nextSlot: '2:00 PM',
  //   consultations: 336,
  //   avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=AbigailYoung', vapiId:
  // },
  // {
  //   id: 24,
  //   name: 'Dr. Benjamin King',
  //   specialization: 'Urologist',
  //   rating: 4.4,
  //   experience: 6,
  //   online: false,
  //   nextSlot: '3:30 PM',
  //   consultations: 349,
  //   avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=BenjaminKing', vapiId:
  // },
]

export const consultations: Consultation[] = [
  {
    id: 1,
    doctorName: 'Dr. Sarah Johnson',
    specialization: 'Cardiologist',
    date: '2026-03-20',
    time: '10:00 AM',
    status: 'completed',
    notes: 'Regular checkup. All vitals normal. Follow-up in 3 months.',
    avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=SarahJohnson',
  },
  {
    id: 2,
    doctorName: 'Dr. James Williams',
    specialization: 'Dermatologist',
    date: '2026-03-19',
    time: '2:30 PM',
    status: 'completed',
    notes: 'Skin examination completed. Prescribed topical treatment.',
    avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=JamesWilliams',
  },
  {
    id: 3,
    doctorName: 'Dr. Emily Brown',
    specialization: 'Neurologist',
    date: '2026-03-22',
    time: '11:00 AM',
    status: 'pending',
    notes: 'Scheduled for initial consultation regarding headaches.',
    avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=EmilyBrown',
  },
  {
    id: 4,
    doctorName: 'Dr. Michael Davis',
    specialization: 'Pediatrician',
    date: '2026-03-18',
    time: '9:00 AM',
    status: 'cancelled',
    notes: 'Patient cancelled due to scheduling conflict.',
    avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=MichaelDavis',
  },
  {
    id: 5,
    doctorName: 'Dr. Olivia Miller',
    specialization: 'Orthopedic',
    date: '2026-03-21',
    time: '3:00 PM',
    status: 'pending',
    notes: 'Follow-up for knee pain. X-ray review needed.',
    avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=OliviaMiller',
  },
  {
    id: 6,
    doctorName: 'Dr. David Wilson',
    specialization: 'ENT Specialist',
    date: '2026-03-17',
    time: '1:00 PM',
    status: 'completed',
    notes: 'Hearing test completed. Results within normal range.',
    avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=DavidWilson',
  },
  {
    id: 7,
    doctorName: 'Dr. Sophia Moore',
    specialization: 'Psychiatrist',
    date: '2026-03-23',
    time: '4:00 PM',
    status: 'pending',
    notes: 'Initial mental health evaluation.',
    avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=SophiaMoore',
  },
  {
    id: 8,
    doctorName: 'Dr. Robert Taylor',
    specialization: 'Ophthalmologist',
    date: '2026-03-16',
    time: '10:30 AM',
    status: 'completed',
    notes: 'Eye examination done. New prescription for glasses.',
    avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=RobertTaylor',
  },
]

export const notifications: Notification[] = [
  {
    id: 1,
    type: 'appointment',
    title: 'Upcoming Appointment',
    description: 'Consultation with Dr. Emily Brown tomorrow at 11:00 AM',
    time: '2 hours ago',
    read: false,
  },
  {
    id: 2,
    type: 'message',
    title: 'New Message',
    description: 'Dr. Sarah Johnson sent you a follow-up message',
    time: '4 hours ago',
    read: false,
  },
  {
    id: 3,
    type: 'system',
    title: 'Profile Updated',
    description: 'Your medical records have been updated successfully',
    time: '1 day ago',
    read: true,
  },
  {
    id: 4,
    type: 'appointment',
    title: 'Appointment Confirmed',
    description: 'Your appointment with Dr. Olivia Miller is confirmed for today',
    time: '1 day ago',
    read: true,
  },
  {
    id: 5,
    type: 'message',
    title: 'Prescription Ready',
    description: 'Dr. Robert Taylor has uploaded your prescription',
    time: '2 days ago',
    read: true,
  },
  {
    id: 6,
    type: 'system',
    title: 'System Maintenance',
    description: 'Scheduled maintenance on March 25, 2026 from 2-4 AM',
    time: '3 days ago',
    read: true,
  },
]
