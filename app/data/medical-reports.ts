export interface MedicalReport {
  agent: string;
  user: string;
  timestamp: string;
  chiefComplaint: string;
  diagnosis: string;
  treatmentPlan: string;
  prognosis: string;
  riskFactors: string[];
  summary: string;
  symptoms: string[];
  severity: string;
  medicationsMentioned: string[];
  recommendations: string[];
}

export const medicalReports: MedicalReport[] = [
  {
    agent: "Dr. Sarah Johnson",
    user: "John Parker",
    timestamp: "2026-03-20T09:30:00Z",
    chiefComplaint: "Persistent fatigue and dizziness for the past two weeks",
    diagnosis: "Iron deficiency anemia",
    treatmentPlan: "Iron supplementation 65mg twice daily with vitamin C, follow-up CBC in 6 weeks",
    prognosis: "Good with adherence to treatment; expected improvement within 4-6 weeks",
    riskFactors: ["Poor dietary iron intake", "History of heavy menstrual bleeding", "Vegetarian diet"],
    summary: "Patient presented with complaints of persistent fatigue, dizziness, and occasional shortness of breath. CBC revealed low hemoglobin (10.2 g/dL) and low ferritin (8 ng/mL). Diagnosed with iron deficiency anemia. Prescribed oral iron supplements and dietary modifications.",
    symptoms: ["Fatigue", "Dizziness", "Shortness of breath", "Pale skin", "Cold hands and feet"],
    severity: "Moderate",
    medicationsMentioned: ["Ferrous sulfate 65mg", "Vitamin C 500mg", "Multivitamin"],
    recommendations: ["Increase iron-rich foods in diet", "Take iron supplements on empty stomach", "Avoid tea/coffee with meals", "Follow-up blood test in 6 weeks", "Return if symptoms worsen"]
  },
  {
    agent: "Dr. Michael Chen",
    user: "John Parker",
    timestamp: "2026-03-18T14:15:00Z",
    chiefComplaint: "Chest tightness and elevated cholesterol levels",
    diagnosis: "Hyperlipidemia (elevated LDL cholesterol)",
    treatmentPlan: "Lifestyle modifications for 3 months, reassess for statin therapy if no improvement",
    prognosis: "Manageable with dietary changes and exercise; statin therapy if lifestyle changes insufficient",
    riskFactors: ["Family history of heart disease", "Sedentary lifestyle", "High-fat diet", "Age over 40"],
    summary: "Patient referred for elevated cholesterol found during routine screening. Lipid panel shows total cholesterol 215 mg/dL, LDL 142 mg/dL. No acute cardiac symptoms. Discussed cardiovascular risk factors and agreed on lifestyle-first approach before considering medication.",
    symptoms: ["Occasional chest tightness", "Mild exertional fatigue"],
    severity: "Mild",
    medicationsMentioned: ["Atorvastatin (discussed, not prescribed)", "Fish oil supplement"],
    recommendations: ["Mediterranean diet adoption", "30 minutes moderate exercise 5 days/week", "Reduce saturated fat intake", "Repeat lipid panel in 3 months", "Monitor blood pressure weekly"]
  },
  {
    agent: "Dr. Emily Williams",
    user: "John Parker",
    timestamp: "2026-03-15T11:00:00Z",
    chiefComplaint: "Headaches and elevated blood pressure readings at home",
    diagnosis: "Stage 1 Hypertension",
    treatmentPlan: "Amlodipine 5mg daily, low-sodium diet, regular BP monitoring",
    prognosis: "Good with medication adherence and lifestyle changes; target BP <130/80 within 8 weeks",
    riskFactors: ["High sodium diet", "Chronic stress", "Family history of hypertension", "Overweight BMI 27"],
    summary: "Patient reported frequent morning headaches and shared home BP readings averaging 145/92 mmHg over two weeks. In-office reading confirmed at 148/94 mmHg. Started on Amlodipine 5mg. Counseled on DASH diet and stress management techniques.",
    symptoms: ["Morning headaches", "Occasional blurred vision", "Neck stiffness", "Facial flushing"],
    severity: "Moderate",
    medicationsMentioned: ["Amlodipine 5mg", "Aspirin (not indicated yet)"],
    recommendations: ["Limit sodium to 1500mg/day", "Practice daily meditation or deep breathing", "Maintain BP diary twice daily", "Lose 5-10 lbs over next 3 months", "Follow-up in 4 weeks"]
  },
  {
    agent: "Dr. Robert Davis",
    user: "John Parker",
    timestamp: "2026-03-12T16:45:00Z",
    chiefComplaint: "Persistent dry cough lasting over 3 weeks",
    diagnosis: "Post-nasal drip syndrome secondary to allergic rhinitis",
    treatmentPlan: "Nasal corticosteroid spray, antihistamine, and saline nasal irrigation",
    prognosis: "Excellent; symptoms expected to resolve within 2-3 weeks of treatment",
    riskFactors: ["Seasonal allergies", "Dust mite exposure at home", "Non-smoker"],
    summary: "Patient presented with a dry, non-productive cough persisting for 3 weeks. Chest X-ray clear, no signs of infection. Throat examination revealed cobblestoning consistent with post-nasal drip. Allergy history positive. Started on nasal steroid spray and second-generation antihistamine.",
    symptoms: ["Dry cough", "Throat clearing", "Nasal congestion", "Mild sore throat", "Post-nasal drip sensation"],
    severity: "Mild",
    medicationsMentioned: ["Fluticasone nasal spray", "Cetirizine 10mg", "Saline nasal rinse"],
    recommendations: ["Use nasal spray consistently for 2 weeks minimum", "Wash bedding in hot water weekly", "Consider HEPA air purifier for bedroom", "Return if cough worsens or fever develops", "Avoid known allergens"]
  },
  {
    agent: "Dr. Lisa Anderson",
    user: "John Parker",
    timestamp: "2026-03-10T10:30:00Z",
    chiefComplaint: "Weight gain and increased fatigue despite no lifestyle changes",
    diagnosis: "Subclinical hypothyroidism",
    treatmentPlan: "Watchful waiting with repeat thyroid panel in 6 weeks; consider levothyroxine if TSH rises above 10",
    prognosis: "Good; may self-resolve or require low-dose thyroid hormone replacement",
    riskFactors: ["Female gender", "Family history of thyroid disease", "Age 35-45", "Positive TPO antibodies"],
    summary: "Patient reported unexplained weight gain of 8 lbs over 3 months, persistent fatigue, and cold intolerance. Thyroid panel shows TSH 5.8 mIU/L (mildly elevated), normal Free T4 and T3. TPO antibodies positive suggesting Hashimoto's. Discussed observation vs treatment approach.",
    symptoms: ["Unexplained weight gain", "Fatigue", "Cold intolerance", "Dry skin", "Constipation", "Brain fog"],
    severity: "Mild",
    medicationsMentioned: ["Levothyroxine (discussed, deferred)", "Selenium supplement"],
    recommendations: ["Repeat thyroid panel in 6 weeks", "Increase dietary selenium and zinc", "Regular exercise to support metabolism", "Monitor symptoms and keep a diary", "Avoid excessive soy and cruciferous vegetables"]
  },
  {
    agent: "Dr. James Wilson",
    user: "John Parker",
    timestamp: "2026-03-05T08:00:00Z",
    chiefComplaint: "Annual physical examination - no acute complaints",
    diagnosis: "Generally healthy with pre-diabetic blood sugar levels",
    treatmentPlan: "Lifestyle modifications, dietary counseling referral, repeat HbA1c in 3 months",
    prognosis: "Reversible with early intervention; high risk of progression to Type 2 diabetes without changes",
    riskFactors: ["BMI 25.5", "Family history of Type 2 diabetes", "Sedentary job", "High carbohydrate diet"],
    summary: "Routine annual physical exam. Vitals normal except mildly elevated fasting glucose. HbA1c 6.0% places patient in pre-diabetic range. All other systems reviewed and unremarkable. Counseled extensively on diabetes prevention through diet and exercise.",
    symptoms: ["Increased thirst (mild)", "Occasional blurred vision after meals"],
    severity: "Mild",
    medicationsMentioned: ["Metformin (discussed as future option)", "Berberine supplement"],
    recommendations: ["Reduce refined carbohydrate intake", "Walk 10,000 steps daily", "Schedule nutritionist consultation", "Repeat fasting glucose and HbA1c in 3 months", "Annual eye exam recommended"]
  },
  {
    agent: "Dr. Patricia Moore",
    user: "John Parker",
    timestamp: "2026-02-28T13:00:00Z",
    chiefComplaint: "Frequent urination and excessive thirst",
    diagnosis: "Pre-diabetes with impaired glucose tolerance",
    treatmentPlan: "Strict dietary control, structured exercise program, glucose monitoring",
    prognosis: "Reversible if lifestyle changes are sustained; re-evaluate in 3 months for medication",
    riskFactors: ["Elevated HbA1c 6.2%", "Fasting glucose 118 mg/dL", "Central obesity", "Family history"],
    summary: "Patient referred by Dr. Wilson for elevated blood sugar. Confirmed pre-diabetic status with HbA1c 6.2% and fasting glucose 118 mg/dL. OGTT showed impaired glucose tolerance. Extensive counseling on diabetes prevention. Provided home glucose monitor and dietary plan.",
    symptoms: ["Polyuria", "Polydipsia", "Fatigue after meals", "Slow wound healing", "Tingling in feet"],
    severity: "Moderate",
    medicationsMentioned: ["Metformin 500mg (prescribed)", "Glucometer supplies"],
    recommendations: ["Monitor fasting glucose daily", "Follow 1500-calorie low-glycemic diet", "Exercise 150 minutes per week minimum", "Attend diabetes prevention program", "Return in 4 weeks for glucose review"]
  },
  {
    agent: "Dr. Karen Taylor",
    user: "John Parker",
    timestamp: "2026-02-20T15:30:00Z",
    chiefComplaint: "Recurring severe headaches with visual disturbances",
    diagnosis: "Chronic migraine with aura",
    treatmentPlan: "Sumatriptan 50mg as needed for acute attacks, propranolol 40mg daily for prevention",
    prognosis: "Manageable with proper medication; may require adjustment over time",
    riskFactors: ["High stress occupation", "Irregular sleep schedule", "Screen time >10 hours/day", "Family history of migraines"],
    summary: "Patient reports 4-5 severe headaches per month for the past 6 months, preceded by visual aura (zigzag lines, light sensitivity). Neurological exam normal. MRI brain ordered to rule out structural causes. Started on preventive therapy and provided acute rescue medication.",
    symptoms: ["Severe unilateral headache", "Visual aura", "Photophobia", "Nausea", "Phonophobia", "Neck pain"],
    severity: "Moderate to Severe",
    medicationsMentioned: ["Sumatriptan 50mg", "Propranolol 40mg", "Ibuprofen 400mg", "Magnesium glycinate 400mg"],
    recommendations: ["Maintain consistent sleep schedule (7-8 hours)", "Identify and avoid triggers using headache diary", "Reduce screen time and take regular breaks", "Consider cognitive behavioral therapy for stress", "MRI brain within 2 weeks", "Follow-up in 4 weeks"]
  }
];
