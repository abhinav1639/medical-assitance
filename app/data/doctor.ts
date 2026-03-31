export interface Doctor {
  id: number;
  name: string;
  specialty: string;
  rating: number;
  reviews: number;
  experience: string;
  online: boolean;
  nextSlot: string;
  tags: string[];
  image: string;
}

export interface ConsultationHistory {
  id: number;
  doctorName: string;
  specialty: string;
  date: string;
  status: "completed" | "cancelled" | "upcoming";
  type: string;
  notes?: string;
}

const specialties = [
  "Cardiologist", "Dermatologist", "Neurologist", "Orthopedic", "Pediatrician",
  "Psychiatrist", "Endocrinologist", "Gastroenterologist", "Pulmonologist", "Oncologist",
  "Urologist", "Ophthalmologist", "ENT Specialist", "Rheumatologist", "Nephrologist",
];

const firstNames = [
  "Sarah", "James", "Priya", "Michael", "Elena", "David", "Aisha", "Robert",
  "Maria", "Chen", "Olivia", "Ahmad", "Sophie", "Raj", "Emily", "Liam",
  "Fatima", "Alexander", "Yuki", "Daniel", "Amara", "William", "Nadia", "Thomas",
];

const lastNames = [
  "Mitchell", "Patel", "Rodriguez", "Kim", "Okonkwo", "Bergström", "Nakamura", "Al-Rashid",
  "Thompson", "Wei", "Fernandez", "Johansson", "Gupta", "Morrison", "Sato", "Hassan",
  "Dubois", "Sharma", "O'Brien", "Yamamoto", "Petrov", "Singh", "Müller", "Takahashi",
];

const tagSets = [
  ["Heart Health", "ECG", "Hypertension"],
  ["Skin Care", "Acne", "Dermatitis"],
  ["Brain Health", "Migraine", "Epilepsy"],
  ["Joint Pain", "Sports Injury", "Fracture"],
  ["Child Care", "Vaccination", "Growth"],
  ["Mental Health", "Anxiety", "Depression"],
  ["Diabetes", "Thyroid", "Hormones"],
  ["Digestive", "IBS", "Liver"],
  ["Respiratory", "Asthma", "COPD"],
  ["Cancer Care", "Screening", "Therapy"],
  ["Kidney", "UTI", "Dialysis"],
  ["Vision", "Glaucoma", "Cataract"],
  ["Ear Nose Throat", "Sinus", "Hearing"],
  ["Arthritis", "Autoimmune", "Lupus"],
  ["Renal Care", "Stones", "CKD"],
];

const timeSlots = [
  "Today, 2:30 PM", "Today, 4:00 PM", "Today, 5:15 PM",
  "Tomorrow, 9:00 AM", "Tomorrow, 10:30 AM", "Tomorrow, 1:00 PM",
  "Tomorrow, 3:45 PM", "Mar 20, 11:00 AM", "Mar 20, 2:00 PM",
  "Mar 21, 9:30 AM",
];

export const doctors: Doctor[] = Array.from({ length: 24 }, (_, i) => ({
  id: i + 1,
  name: `Dr. ${firstNames[i % firstNames.length]} ${lastNames[i % lastNames.length]}`,
  specialty: specialties[i % specialties.length],
  rating: +(4 + Math.random() * 0.9).toFixed(1),
  reviews: Math.floor(50 + Math.random() * 450),
  experience: `${Math.floor(5 + Math.random() * 20)}+ yrs`,
  online: Math.random() > 0.35,
  nextSlot: timeSlots[i % timeSlots.length],
  tags: tagSets[i % tagSets.length],
  image: `https://api.dicebear.com/9.x/notionists/svg?seed=${firstNames[i % firstNames.length]}${lastNames[i % lastNames.length]}`,
}));

export const consultationHistory: ConsultationHistory[] = [
  { id: 1, doctorName: "Dr. Sarah Mitchell", specialty: "Cardiologist", date: "Mar 15, 2026", status: "completed", type: "Video Call", notes: "Blood pressure follow-up. Prescribed Amlodipine 5mg." },
  { id: 2, doctorName: "Dr. Raj Gupta", specialty: "Dermatologist", date: "Mar 12, 2026", status: "completed", type: "Chat", notes: "Skin rash examination. Topical cream recommended." },
  { id: 3, doctorName: "Dr. Elena Rodriguez", specialty: "Neurologist", date: "Mar 10, 2026", status: "completed", type: "Video Call", notes: "Migraine assessment. MRI scheduled." },
  { id: 4, doctorName: "Dr. James Patel", specialty: "Orthopedic", date: "Mar 8, 2026", status: "cancelled", type: "In-Person" },
  { id: 5, doctorName: "Dr. Aisha Okonkwo", specialty: "Psychiatrist", date: "Mar 5, 2026", status: "completed", type: "Video Call", notes: "Therapy session. Follow-up in 2 weeks." },
  { id: 6, doctorName: "Dr. Chen Wei", specialty: "Gastroenterologist", date: "Mar 1, 2026", status: "completed", type: "Chat", notes: "Dietary consultation for IBS management." },
  { id: 7, doctorName: "Dr. Michael Kim", specialty: "Endocrinologist", date: "Feb 25, 2026", status: "completed", type: "Video Call", notes: "Thyroid panel review. Levels normalizing." },
  { id: 8, doctorName: "Dr. Priya Sharma", specialty: "Pediatrician", date: "Feb 20, 2026", status: "completed", type: "In-Person", notes: "Annual checkup. All vaccinations up to date." },
];