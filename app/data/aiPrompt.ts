export const userInput = `
depends on conversation  between patient and doctor create a list of reports for the patient in json formate only 

  {"agent": "string",
  "user": "string",
  "timestamp": "ISO Date string",
  "chiefComplaint": "string",
  "diagnosis": "string",
  "treatmentPlan": "string",
  "prognosis": "string",
  "riskFactors": ["factor1", "factor2"],
  "summary": "string",
  "symptoms": ["symptom1", "symptom2"],
  "severity": "string",
  "medicationsMentioned": ["med1", "med2"],
  "recommendations": ["rec1", "rec2"]   
  }
  
  make sure it look like this [
  {
    "agent": "Dr. Sarah Johnson",
    "user": "John Parker",
    "timestamp": "2026-03-20T09:30:00Z",
    "chiefComplaint": "Persistent fatigue and dizziness for the past two weeks",
    "diagnosis": "Iron deficiency anemia",
    "treatmentPlan": "Iron supplementation 65mg twice daily with vitamin C, follow-up CBC in 6 weeks",
    "prognosis": "Good with adherence to treatment; expected improvement within 4-6 weeks",
    "riskFactors": [
      "Poor dietary iron intake",
      "History of heavy menstrual bleeding",
      "Vegetarian diet"
    ],
    "summary": "Patient presented with complaints of persistent fatigue, dizziness, and occasional shortness of breath. CBC revealed low hemoglobin (10.2 g/dL) and low ferritin (8 ng/mL). Diagnosed with iron deficiency anemia. Prescribed oral iron supplements and dietary modifications.",
    "symptoms": [
      "Fatigue",
      "Dizziness",
      "Shortness of breath",
      "Pale skin",
      "Cold hands and feet"
    ],
    "severity": "Moderate",
    "medicationsMentioned": [
      "Ferrous sulfate 65mg",
      "Vitamin C 500mg",
      "Multivitamin"
    ],
    "recommendations": [
      "Increase iron-rich foods in diet",
      "Take iron supplements on empty stomach",
      "Avoid tea/coffee with meals",
      "Follow-up blood test in 6 weeks",
      "Return if symptoms worsen"
    ]
  },]  `
