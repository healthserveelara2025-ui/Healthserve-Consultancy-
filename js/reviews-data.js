/**
 * Healthserve Health Consultancy - Client Reviews & Testimonials Dataset
 * Prototype Sample Dataset (120 Reviews, 4.7 Average)
 * 94 x 5-star, 18 x 4-star, 5 x 3-star, 2 x 2-star, 1 x 1-star
 * Easily replaceable with verified reviews later.
 */

const HEALTHSERVE_REVIEWS_DATA = [
  {
    "id": 1,
    "name": "Priya Nair",
    "profession": "Registered Nurse",
    "country": "India",
    "rating": 5,
    "category": "Licensing & Career Guidance",
    "review": "I was looking for nursing opportunities in Dubai and didn't know where to begin. Healthserve explained the licensing requirements clearly and helped me understand what I needed before applying."
  },
  {
    "id": 2,
    "name": "Sandeep Gurung",
    "profession": "Registered Nurse",
    "country": "Nepal",
    "rating": 5,
    "category": "Licensing & Career Guidance",
    "review": "I contacted Healthserve while searching for a healthcare job in the UAE. Their guidance on the licensing process made everything much easier to understand."
  },
  {
    "id": 3,
    "name": "Ahmed Hassan",
    "profession": "Doctor",
    "country": "Egypt",
    "rating": 5,
    "category": "Licensing",
    "review": "The team helped me understand the requirements for practising in the UAE. The consultation was clear and professional."
  },
  {
    "id": 4,
    "name": "Maria Santos",
    "profession": "Registered Nurse",
    "country": "Philippines",
    "rating": 4,
    "category": "Licensing",
    "review": "I had many questions about the licensing process and the team was very patient in explaining the requirements and next steps."
  },
  {
    "id": 5,
    "name": "Arjun Menon",
    "profession": "Nurse",
    "country": "India",
    "rating": 5,
    "category": "Career Guidance",
    "review": "I initially came looking for job guidance but realised I needed to sort out my licensing first. Healthserve helped me understand the right direction."
  },
  {
    "id": 6,
    "name": "Anisha Thapa",
    "profession": "Nurse",
    "country": "Nepal",
    "rating": 5,
    "category": "Licensing",
    "review": "Very helpful team. They explained the requirements without making the process feel complicated."
  },
  {
    "id": 7,
    "name": "Fatima Zahra",
    "profession": "Physiotherapist",
    "country": "Morocco",
    "rating": 4,
    "category": "Licensing",
    "review": "I needed guidance regarding my professional registration. The team gave me useful information and helped me understand what documents I should prepare."
  },
  {
    "id": 8,
    "name": "Muhammad Rizwan",
    "profession": "Nurse",
    "country": "Pakistan",
    "rating": 5,
    "category": "Licensing",
    "review": "The licensing process was confusing initially, but after speaking with Healthserve I had a much clearer idea of what to do."
  },
  {
    "id": 9,
    "name": "Daniel Okoro",
    "profession": "Healthcare Professional",
    "country": "Nigeria",
    "rating": 5,
    "category": "Training",
    "review": "I attended one of the professional training sessions and found it informative and well structured."
  },
  {
    "id": 10,
    "name": "Riya Sharma",
    "profession": "Nurse",
    "country": "India",
    "rating": 5,
    "category": "Career Guidance",
    "review": "Good experience overall. The team was responsive whenever I had questions about my application."
  },
  {
    "name": "Dr. Tariq Al-Mansoor",
    "profession": "Specialist Cardiologist",
    "country": "Jordan",
    "rating": 5,
    "category": "Licensing",
    "review": "Navigating the PQR guidelines for Tier-2 qualifications was complex. The advisor mapped out my exact path for DHA credentialing without unnecessary delays.",
    "id": 11
  },
  {
    "name": "Kristine Joy Alcantara",
    "profession": "ICU Staff Nurse",
    "country": "Philippines",
    "rating": 5,
    "category": "Exam Preparation",
    "review": "The Prometric exam orientation provided realistic practice cases and timing strategies. I passed on my first attempt with confidence.",
    "id": 12
  },
  {
    "name": "Bikash Shrestha",
    "profession": "Dialysis Nurse",
    "country": "Nepal",
    "rating": 5,
    "category": "Licensing",
    "review": "My primary concern was verifying my hospital bed-capacity documents. Healthserve verified everything against the Unified PQR criteria before submission.",
    "id": 13
  },
  {
    "name": "Dr. Sarah Jenkins",
    "profession": "General Practitioner",
    "country": "United Kingdom",
    "rating": 5,
    "category": "Career Guidance",
    "review": "Moving from the NHS to Abu Dhabi required understanding DOH title equivalence. The consultation saved me weeks of independent guesswork.",
    "id": 14
  },
  {
    "name": "Amr El-Sayed",
    "profession": "Clinical Pharmacist",
    "country": "Egypt",
    "rating": 5,
    "category": "Licensing",
    "review": "Assisted me thoroughly with DataFlow Primary Source Verification. They flagged an issue with my internship transcript before it caused a discrepancy.",
    "id": 15
  },
  {
    "name": "Blessing Adeyemi",
    "profession": "Medical Laboratory Technologist",
    "country": "Nigeria",
    "rating": 5,
    "category": "Exam Preparation",
    "review": "Clear guidance on syllabus coverage for the Dubai Health Authority laboratory technologist assessment. Very practical and structured.",
    "id": 16
  },
  {
    "name": "Dr. Navin Chawla",
    "profession": "Specialist Paediatrician",
    "country": "India",
    "rating": 5,
    "category": "Licensing",
    "review": "Professional evaluation of my MD paediatrics documentation against DHA requirements. Highly structured advisory without unrealistic promises.",
    "id": 17
  },
  {
    "name": "Cheryl Fernandez",
    "profession": "Dental Hygienist",
    "country": "Philippines",
    "rating": 5,
    "category": "Training",
    "review": "The infection control and patient safety CPD modules were well organised and aligned with UAE regulatory expectations.",
    "id": 18
  },
  {
    "name": "Hassan Mahmoud",
    "profession": "Radiographer",
    "country": "Sudan",
    "rating": 5,
    "category": "Licensing",
    "review": "They explained the exact difference between DHA and MOHAP application scopes. That alone saved me from applying to the wrong regulator.",
    "id": 19
  },
  {
    "name": "Laxmi Tamang",
    "profession": "OT Nurse",
    "country": "Nepal",
    "rating": 5,
    "category": "Career Guidance",
    "review": "Friendly and transparent guidance. They were realistic about the clinical experience years needed before applying for hospital positions.",
    "id": 20
  },
  {
    "name": "Dr. Reem Al-Khatib",
    "profession": "Dermatologist",
    "country": "Lebanon",
    "rating": 5,
    "category": "Licensing",
    "review": "Clear analysis of board certification equivalence. Handled my case with confidentiality and meticulous document review.",
    "id": 21
  },
  {
    "name": "Kavitha Balakrishnan",
    "profession": "Staff Nurse",
    "country": "India",
    "rating": 5,
    "category": "Exam Preparation",
    "review": "The question bank review session gave me the confidence I needed for the computer-based test. Passed smoothly.",
    "id": 22
  },
  {
    "name": "Jerome Dizon",
    "profession": "Respiratory Therapist",
    "country": "Philippines",
    "rating": 5,
    "category": "Career Guidance",
    "review": "Very honest breakdown of salary ranges, licensing prerequisites, and timeline reality in Dubai and Saudi Arabia.",
    "id": 23
  },
  {
    "name": "Dr. Farooq Qureshi",
    "profession": "General Dentist",
    "country": "Pakistan",
    "rating": 5,
    "category": "Licensing",
    "review": "Extremely thorough review of my logbook and clinical practice certificates. Clarified licensing steps that other sources had confused.",
    "id": 24
  },
  {
    "name": "Thabo Mokoena",
    "profession": "Emergency Medical Technician",
    "country": "South Africa",
    "rating": 5,
    "category": "Training",
    "review": "Completed their trauma care and life support orientation. Quality instructors with practical Gulf clinical experience.",
    "id": 25
  },
  {
    "name": "Nouran Mostafa",
    "profession": "Clinical Dietitian",
    "country": "Egypt",
    "rating": 5,
    "category": "Career Guidance",
    "review": "Gave me realistic expectations about allied health opportunities in UAE private clinics versus public healthcare.",
    "id": 26
  },
  {
    "name": "Manish Adhikari",
    "profession": "Staff Nurse",
    "country": "Nepal",
    "rating": 5,
    "category": "Licensing",
    "review": "DataFlow document verification went through without a single query because Healthserve checked every date and seal beforehand.",
    "id": 27
  },
  {
    "name": "Grace Wanjiku",
    "profession": "Midwife",
    "country": "Kenya",
    "rating": 5,
    "category": "Licensing",
    "review": "Guidance on council good standing requirements and verification timelines was spot on. Highly respectful team.",
    "id": 28
  },
  {
    "name": "Dr. Deepak Verma",
    "profession": "Orthopaedic Surgeon",
    "country": "India",
    "rating": 5,
    "category": "Licensing",
    "review": "Accurately evaluated my MS Ortho and fellowship records for Dubai eligibility. Their PQR pre-check was completely accurate.",
    "id": 29
  },
  {
    "name": "Rowena Bautista",
    "profession": "Paediatric Nurse",
    "country": "Philippines",
    "rating": 5,
    "category": "Training",
    "review": "CPD courses provided valuable clinical insights that directly helped with my UAE hospital interview preparation.",
    "id": 30
  },
  {
    "name": "Usman Ali",
    "profession": "Physiotherapist",
    "country": "Pakistan",
    "rating": 5,
    "category": "Exam Preparation",
    "review": "Mock tests closely resembled the actual Prometric interface and question style. Worth every minute of preparation.",
    "id": 31
  },
  {
    "name": "Dr. Hany Boulos",
    "profession": "Anaesthesiologist",
    "country": "Egypt",
    "rating": 5,
    "category": "Licensing",
    "review": "Smooth handling of my professional portfolio and experience letters. No false claims, just solid regulatory facts.",
    "id": 32
  },
  {
    "name": "Pratima KC",
    "profession": "Nurse",
    "country": "Nepal",
    "rating": 5,
    "category": "Career Guidance",
    "review": "Prompt WhatsApp responses and clear explanations of every step from credential check to final exam booking.",
    "id": 33
  },
  {
    "name": "Emeka Nwosu",
    "profession": "Pharmacist",
    "country": "Nigeria",
    "rating": 5,
    "category": "Licensing",
    "review": "Helped resolve an issue with my home country licensing council letter before applying to the UAE authorities.",
    "id": 34
  },
  {
    "name": "Sunita Pillai",
    "profession": "Nurse Educator",
    "country": "India",
    "rating": 5,
    "category": "Training",
    "review": "Attended the advanced leadership in nursing webinar. Well researched and interactive.",
    "id": 35
  },
  {
    "name": "Dr. Zaid Al-Hamdan",
    "profession": "Consultant Radiologist",
    "country": "Jordan",
    "rating": 5,
    "category": "Licensing",
    "review": "Their team understands the subtle differences between DHA Tier-1 and Tier-2 consultant recognition criteria.",
    "id": 36
  },
  {
    "name": "Mark Anthony Cruz",
    "profession": "Medical Technologist",
    "country": "Philippines",
    "rating": 5,
    "category": "Exam Preparation",
    "review": "Preparation materials focused on clinical pathology and laboratory safety. Cleared the exam on first attempt.",
    "id": 37
  },
  {
    "name": "Amina Idris",
    "profession": "Staff Nurse",
    "country": "Sudan",
    "rating": 5,
    "category": "Licensing",
    "review": "Patiently guided me through document attestation steps for UAE healthcare practice.",
    "id": 38
  },
  {
    "name": "Suresh Patel",
    "profession": "Sonographer",
    "country": "India",
    "rating": 5,
    "category": "Career Guidance",
    "review": "Explained the accreditation requirements for diagnostic ultrasound practitioners across the Emirates.",
    "id": 39
  },
  {
    "name": "Dr. Clara Ofori",
    "profession": "General Practitioner",
    "country": "Ghana",
    "rating": 5,
    "category": "Licensing",
    "review": "Appreciated their transparency regarding internship duration criteria required under GCC Unified regulations.",
    "id": 40
  },
  {
    "name": "Rosalyn Mendoza",
    "profession": "Neonatal Nurse",
    "country": "Philippines",
    "rating": 5,
    "category": "Licensing",
    "review": "Helped me coordinate the exact hospital clinical verification documentation needed for my NICU experience.",
    "id": 41
  },
  {
    "name": "Nader Gomaa",
    "profession": "Clinical Pharmacist",
    "country": "Egypt",
    "rating": 5,
    "category": "Training",
    "review": "Excellent pharmacotherapy update session. The speaker was engaging and answered specific GCC practice questions.",
    "id": 42
  },
  {
    "name": "Devendra Pandey",
    "profession": "Emergency Nurse",
    "country": "Nepal",
    "rating": 5,
    "category": "Exam Preparation",
    "review": "Systematic approach to emergency triage and pharmacology revision questions for Gulf licensing exams.",
    "id": 43
  },
  {
    "name": "Dr. Vivek Saxena",
    "profession": "Specialist Neurologist",
    "country": "India",
    "rating": 5,
    "category": "Licensing",
    "review": "Accurate advice on DM Neurology equivalence and registration timelines for UAE private hospitals.",
    "id": 44
  },
  {
    "name": "Leila Benali",
    "profession": "Occupational Therapist",
    "country": "Tunisia",
    "rating": 5,
    "category": "Career Guidance",
    "review": "Very polite advisors who took time to review my French-language translated credentials carefully.",
    "id": 45
  },
  {
    "name": "Muhammad Bilal",
    "profession": "Cardiac Perfusionist",
    "country": "Pakistan",
    "rating": 5,
    "category": "Licensing",
    "review": "Specialised field with rare requirements, yet they found the exact PQR clauses applicable to cardiac surgery support staff.",
    "id": 46
  },
  {
    "name": "Dr. Patrick O'Connor",
    "profession": "Emergency Physician",
    "country": "Ireland",
    "rating": 5,
    "category": "Career Guidance",
    "review": "Insightful discussion on locum vs permanent positions and credential transferability between Dubai and Abu Dhabi.",
    "id": 47
  },
  {
    "name": "Ailene Reyes",
    "profession": "Staff Nurse",
    "country": "Philippines",
    "rating": 5,
    "category": "Licensing",
    "review": "Handled my case with clear milestone updates on WhatsApp. Very grateful for their prompt assistance.",
    "id": 48
  },
  {
    "name": "Dr. Mahmoud Fawzy",
    "profession": "Ophthalmologist",
    "country": "Egypt",
    "rating": 5,
    "category": "Licensing",
    "review": "Understood surgical logbook requirements and guided me on official translation formats accepted in UAE.",
    "id": 49
  },
  {
    "name": "Gita Magar",
    "profession": "Nurse",
    "country": "Nepal",
    "rating": 5,
    "category": "Training",
    "review": "Basic Life Support (BLS) refresher was comprehensive and well presented by certified trainers.",
    "id": 50
  },
  {
    "name": "Karthik Raja",
    "profession": "Biomedical Engineer",
    "country": "India",
    "rating": 5,
    "category": "Career Guidance",
    "review": "Clarified how hospital biomedical maintenance roles are regulated compared to clinical medical devices staff.",
    "id": 51
  },
  {
    "name": "Dr. Samar Kabbani",
    "profession": "Specialist Pathologist",
    "country": "Syria",
    "rating": 5,
    "category": "Licensing",
    "review": "Compassionate and professional support during document verification and experience recognition review.",
    "id": 52
  },
  {
    "name": "Joan Achieng",
    "profession": "Nurse",
    "country": "Kenya",
    "rating": 5,
    "category": "Exam Preparation",
    "review": "The practice mock examinations pinpointed my weak areas in pharmacology and maternal health.",
    "id": 53
  },
  {
    "name": "Anil Kumar",
    "profession": "Staff Nurse",
    "country": "India",
    "rating": 5,
    "category": "Licensing",
    "review": "Resolved a discrepancy in my university seal before submission to avoid negative verification flags.",
    "id": 54
  },
  {
    "name": "Maritess Ramos",
    "profession": "Infection Control Nurse",
    "country": "Philippines",
    "rating": 5,
    "category": "Training",
    "review": "High quality infection surveillance workshop that matched international JCI standards.",
    "id": 55
  },
  {
    "name": "Dr. Walid Shalaby",
    "profession": "Gynaecologist",
    "country": "Egypt",
    "rating": 5,
    "category": "Career Guidance",
    "review": "Realistic and candid briefing about maternity healthcare demands and licensing in Abu Dhabi versus Dubai.",
    "id": 56
  },
  {
    "name": "Pooja Bhatt",
    "profession": "Dental Assistant",
    "country": "India",
    "rating": 5,
    "category": "Licensing",
    "review": "Assisted me in getting my diploma evaluated accurately without paying for unnecessary services.",
    "id": 57
  },
  {
    "name": "Dipendra Thapa",
    "profession": "ICU Nurse",
    "country": "Nepal",
    "rating": 5,
    "category": "Exam Preparation",
    "review": "Passed the Prometric exam with 82% thanks to their focused high-yield revision summaries.",
    "id": 58
  },
  {
    "name": "Dr. Femi Adeleke",
    "profession": "Psychiatrist",
    "country": "Nigeria",
    "rating": 5,
    "category": "Licensing",
    "review": "Professional and courteous team who helped clarify mental health licensing registration pathways.",
    "id": 59
  },
  {
    "name": "Rani Abraham",
    "profession": "Dialysis Specialist",
    "country": "India",
    "rating": 5,
    "category": "Licensing",
    "review": "Very detail-oriented team. They made sure my clinical logs matched the exact authority template.",
    "id": 60
  },
  {
    "name": "Geraldine Cruz",
    "profession": "Operating Room Nurse",
    "country": "Philippines",
    "rating": 5,
    "category": "Career Guidance",
    "review": "Helped me plan my career steps: first getting the DHA eligibility letter, then job networking.",
    "id": 61
  },
  {
    "name": "Dr. Assem Kassem",
    "profession": "Specialist Urologist",
    "country": "Egypt",
    "rating": 5,
    "category": "Licensing",
    "review": "Their assessment of my German fellowship and Egyptian master degree was fast and precise.",
    "id": 62
  },
  {
    "name": "Kabir Hussain",
    "profession": "Nuclear Medicine Tech",
    "country": "Pakistan",
    "rating": 5,
    "category": "Training",
    "review": "Radiation safety training program was well structured with practical clinical scenarios.",
    "id": 63
  },
  {
    "name": "Sunil Joshi",
    "profession": "Hospital Pharmacist",
    "country": "Nepal",
    "rating": 5,
    "category": "Exam Preparation",
    "review": "Pharmacology calculations and clinical case reviews were thoroughly explained during tutoring.",
    "id": 64
  },
  {
    "name": "Dr. Elena Rostova",
    "profession": "Dermatologist",
    "country": "Russia",
    "rating": 5,
    "category": "Licensing",
    "review": "Clear guidance on notarised English translations and legalisation of medical degrees for UAE.",
    "id": 65
  },
  {
    "name": "Lilibeth Santos",
    "profession": "General Nurse",
    "country": "Philippines",
    "rating": 5,
    "category": "Licensing",
    "review": "Quick answers on WhatsApp. Always polite and supportive whenever I had doubts about my certificates.",
    "id": 66
  },
  {
    "name": "Dr. Harish Pillai",
    "profession": "General Practitioner",
    "country": "India",
    "rating": 5,
    "category": "Career Guidance",
    "review": "Gave a clear comparison between working in Dubai healthcare city vs mainland Dubai clinics.",
    "id": 67
  },
  {
    "name": "Fatouma Diop",
    "profession": "Midwife",
    "country": "Senegal",
    "rating": 5,
    "category": "Training",
    "review": "Maternal emergency management CPD was interactive and easy to follow.",
    "id": 68
  },
  {
    "name": "Mohsin Raza",
    "profession": "Physiotherapist",
    "country": "Pakistan",
    "rating": 5,
    "category": "Licensing",
    "review": "Identified that my university was already listed in the recognized institutes database, saving me money.",
    "id": 69
  },
  {
    "name": "Dr. Sherif Attia",
    "profession": "Specialist ENT Surgeon",
    "country": "Egypt",
    "rating": 5,
    "category": "Licensing",
    "review": "Excellent grasp of surgical experience prerequisites for Department of Health Abu Dhabi.",
    "id": 70
  },
  {
    "name": "Reena Mathews",
    "profession": "Clinical Nurse Specialist",
    "country": "India",
    "rating": 5,
    "category": "Career Guidance",
    "review": "Helped me understand how clinical nurse specialist grades differ from staff nurse grades in the Gulf.",
    "id": 71
  },
  {
    "name": "Melanie Garcia",
    "profession": "Staff Nurse",
    "country": "Philippines",
    "rating": 5,
    "category": "Exam Preparation",
    "review": "The test simulation platform was very close to the real Pearson VUE testing environment.",
    "id": 72
  },
  {
    "name": "Dr. Tariq Butt",
    "profession": "Consultant Anaesthetist",
    "country": "Pakistan",
    "rating": 5,
    "category": "Licensing",
    "review": "Streamlined documentation verification. Saved valuable time for a busy practicing clinician.",
    "id": 73
  },
  {
    "name": "Suman Shrestha",
    "profession": "Cardiac Nurse",
    "country": "Nepal",
    "rating": 5,
    "category": "Licensing",
    "review": "Helped verify hospital bed capacity and bed occupancy certificates with proper institutional seals.",
    "id": 74
  },
  {
    "name": "Dr. Nicole Venter",
    "profession": "Emergency Doctor",
    "country": "South Africa",
    "rating": 5,
    "category": "Career Guidance",
    "review": "Provided realistic timelines for licensing while practicing abroad. No misleading timelines.",
    "id": 75
  },
  {
    "name": "Abeba Tesfaye",
    "profession": "Laboratory Technologist",
    "country": "Ethiopia",
    "rating": 5,
    "category": "Training",
    "review": "Laboratory quality management CPD course was very practical and informative.",
    "id": 76
  },
  {
    "name": "Shyam Sundar",
    "profession": "Staff Nurse",
    "country": "India",
    "rating": 5,
    "category": "Licensing",
    "review": "Clear explanation of the continuity of practice rule and how gaps are handled.",
    "id": 77
  },
  {
    "name": "Princess Joy Mercado",
    "profession": "Dental Nurse",
    "country": "Philippines",
    "rating": 5,
    "category": "Career Guidance",
    "review": "Advised me on whether to register as a dental assistant or dental nurse based on my transcript.",
    "id": 78
  },
  {
    "name": "Dr. Karim Mansour",
    "profession": "Consultant Nephrologist",
    "country": "Egypt",
    "rating": 5,
    "category": "Licensing",
    "review": "Detailed analysis of Tier-1 equivalence documentation for senior consultant roles.",
    "id": 79
  },
  {
    "name": "Chidimma Eze",
    "profession": "Nurse Practitioner",
    "country": "Nigeria",
    "rating": 5,
    "category": "Exam Preparation",
    "review": "High yield study guide and regular feedback on practice questions. Made a big difference.",
    "id": 80
  },
  {
    "name": "Manoj Basnet",
    "profession": "Radiology Tech",
    "country": "Nepal",
    "rating": 5,
    "category": "Licensing",
    "review": "Explained the radiation protection supervisor prerequisites clearly.",
    "id": 81
  },
  {
    "name": "Dr. Sameer Al-Ghamdi",
    "profession": "Resident Doctor",
    "country": "Saudi Arabia",
    "rating": 5,
    "category": "Training",
    "review": "Great CPD updates on healthcare ethics and medical documentation in GCC practice.",
    "id": 82
  },
  {
    "name": "Jocelyn Tan",
    "profession": "Nurse Manager",
    "country": "Philippines",
    "rating": 5,
    "category": "Career Guidance",
    "review": "Solid strategic advice on healthcare management transitions in the private sector.",
    "id": 83
  },
  {
    "name": "Dr. Rajesh Nambiar",
    "profession": "Specialist Diabetologist",
    "country": "India",
    "rating": 5,
    "category": "Licensing",
    "review": "Pre-screened all hospital experience credentials meticulously before final government filing.",
    "id": 84
  },
  {
    "name": "Fozia Khan",
    "profession": "Staff Nurse",
    "country": "Pakistan",
    "rating": 5,
    "category": "Training",
    "review": "Comprehensive paediatric resuscitation workshop with hands-on skill scenarios.",
    "id": 85
  },
  {
    "name": "Bijay Adhikari",
    "profession": "Staff Nurse",
    "country": "Nepal",
    "rating": 5,
    "category": "Licensing",
    "review": "Transparent consultation. Did not push services I didn't need. Very trustworthy.",
    "id": 86
  },
  {
    "name": "Dr. Hisham Zaki",
    "profession": "Specialist Pulmonologist",
    "country": "Egypt",
    "rating": 5,
    "category": "Exam Preparation",
    "review": "Structured pulmonary medicine review points for specialist qualifying examination.",
    "id": 87
  },
  {
    "name": "Sheela Thomas",
    "profession": "Operation Theatre Nurse",
    "country": "India",
    "rating": 5,
    "category": "Licensing",
    "review": "Gave precise advice on surgical suite documentation formats accepted in Dubai.",
    "id": 88
  },
  {
    "name": "Bryan De Vera",
    "profession": "Medical Technologist",
    "country": "Philippines",
    "rating": 5,
    "category": "Licensing",
    "review": "Helped resolve an address discrepancy in my laboratory certificate before it caused delays.",
    "id": 89
  },
  {
    "name": "Dr. Amina Farooq",
    "profession": "General Dentist",
    "country": "Pakistan",
    "rating": 5,
    "category": "Career Guidance",
    "review": "Very realistic about clinical setup and private practice regulations across Sharjah and Dubai.",
    "id": 90
  },
  {
    "name": "Tenzing Sherpa",
    "profession": "Nurse",
    "country": "Nepal",
    "rating": 5,
    "category": "Training",
    "review": "Patient assessment and triage refresher course was well articulated.",
    "id": 91
  },
  {
    "name": "Dr. Anthony Chukwu",
    "profession": "Family Medicine Specialist",
    "country": "Nigeria",
    "rating": 5,
    "category": "Licensing",
    "review": "Clear breakdown of primary healthcare accreditation and medical council registration steps.",
    "id": 92
  },
  {
    "name": "Reshma Varghese",
    "profession": "Critical Care Nurse",
    "country": "India",
    "rating": 5,
    "category": "Exam Preparation",
    "review": "Passed my licensing exam on first attempt after two weeks of targeted practice using their portal.",
    "id": 93
  },
  {
    "name": "Catherine Gomez",
    "profession": "Midwife",
    "country": "Philippines",
    "rating": 5,
    "category": "Licensing",
    "review": "Patient coordinators who kept me updated on document processing milestones.",
    "id": 94
  },
  {
    "name": "Dr. Mostafa Kamel",
    "profession": "Internal Medicine Specialist",
    "country": "Egypt",
    "rating": 5,
    "category": "Licensing",
    "review": "Accurately checked that my postgraduate master degree met the 3-year structured training rule.",
    "id": 95
  },
  {
    "name": "Nabin Rawal",
    "profession": "Staff Nurse",
    "country": "Nepal",
    "rating": 5,
    "category": "Career Guidance",
    "review": "Honest review of the market demand and licensing costs before I spent any money.",
    "id": 96
  },
  {
    "name": "Dr. Kimberly Adams",
    "profession": "General Practitioner",
    "country": "United Kingdom",
    "rating": 4,
    "category": "Licensing",
    "review": "Very competent team. The process took a little longer due to authority review times, but Healthserve kept me well informed.",
    "id": 97
  },
  {
    "name": "John Paul Soriano",
    "profession": "ER Nurse",
    "country": "Philippines",
    "rating": 4,
    "category": "Exam Preparation",
    "review": "Good exam coaching material. Would have loved a few more pharmacology practice sets, but overall very helpful.",
    "id": 98
  },
  {
    "name": "Vinod Chandran",
    "profession": "Pharmacist",
    "country": "India",
    "rating": 4,
    "category": "Licensing",
    "review": "Responsive advisors. Took about 48 hours to get replies during peak season, but the guidance was always accurate.",
    "id": 99
  },
  {
    "name": "Dr. Mahmoud Nour",
    "profession": "Paediatrician",
    "country": "Egypt",
    "rating": 4,
    "category": "Career Guidance",
    "review": "Clear breakdown of differences between DHA and DOH licensing pathways. Practical and objective.",
    "id": 100
  },
  {
    "name": "Pramila Rai",
    "profession": "Nurse",
    "country": "Nepal",
    "rating": 4,
    "category": "Training",
    "review": "Good CPD training. Would recommend adding recorded sessions for night-shift nurses who cannot join live.",
    "id": 101
  },
  {
    "name": "Oluwaseun Bakare",
    "profession": "Biomedical Scientist",
    "country": "Nigeria",
    "rating": 4,
    "category": "Licensing",
    "review": "Helped untangle a complicated degree certificate issue. Clear communication throughout.",
    "id": 102
  },
  {
    "name": "Dr. Asad Mehmood",
    "profession": "Dentist",
    "country": "Pakistan",
    "rating": 4,
    "category": "Exam Preparation",
    "review": "Solid question breakdown for the dental assessment. Passed smoothly on my first attempt.",
    "id": 103
  },
  {
    "name": "Deepa Ranganathan",
    "profession": "Physiotherapist",
    "country": "India",
    "rating": 4,
    "category": "Career Guidance",
    "review": "Good realistic advice on the UAE job market and hospital requirements for junior therapists.",
    "id": 104
  },
  {
    "name": "Maria Teresa Cruz",
    "profession": "Staff Nurse",
    "country": "Philippines",
    "rating": 4,
    "category": "Licensing",
    "review": "Patiently guided me through document uploads. Reliable service for Gulf healthcare workers.",
    "id": 105
  },
  {
    "name": "Dr. Khaled El-Baz",
    "profession": "General Surgeon",
    "country": "Egypt",
    "rating": 4,
    "category": "Licensing",
    "review": "Good technical understanding of surgical credential evaluation. Professional interaction.",
    "id": 106
  },
  {
    "name": "Birendra Yadav",
    "profession": "Dialysis Tech",
    "country": "Nepal",
    "rating": 4,
    "category": "Exam Preparation",
    "review": "Helpful preparatory questions. Enabled me to understand the computer-based test format.",
    "id": 107
  },
  {
    "name": "Anu Joseph",
    "profession": "Staff Nurse",
    "country": "India",
    "rating": 4,
    "category": "Career Guidance",
    "review": "Clear direction on what steps to take first before spending money on exam bookings.",
    "id": 108
  },
  {
    "name": "Dr. Chika Obi",
    "profession": "Radiologist",
    "country": "Nigeria",
    "rating": 4,
    "category": "Licensing",
    "review": "Identified an issue with my clinical experience letter formatting and corrected it early.",
    "id": 109
  },
  {
    "name": "Rowell Miranda",
    "profession": "OR Nurse",
    "country": "Philippines",
    "rating": 4,
    "category": "Training",
    "review": "Great infection control review. Practical examples applicable to modern Gulf hospital settings.",
    "id": 110
  },
  {
    "name": "Sohail Akhtar",
    "profession": "Laboratory Technician",
    "country": "Pakistan",
    "rating": 4,
    "category": "Licensing",
    "review": "Detailed checklist provided. Made a bureaucratic procedure much simpler to follow.",
    "id": 111
  },
  {
    "name": "Neelam Pokhrel",
    "profession": "Nurse",
    "country": "Nepal",
    "rating": 4,
    "category": "Exam Preparation",
    "review": "The mock test timing simulation prepared me well for the pressure of the exam hall.",
    "id": 112
  },
  {
    "name": "Sunil Subedi",
    "profession": "Staff Nurse",
    "country": "Nepal",
    "rating": 3,
    "category": "Licensing",
    "review": "The guidance was good, but government verification took longer than expected due to home university delays. Healthserve followed up until resolved.",
    "id": 113
  },
  {
    "name": "Dr. Ayman Samir",
    "profession": "General Practitioner",
    "country": "Egypt",
    "rating": 3,
    "category": "Career Guidance",
    "review": "Accurate licensing information, though communication was a bit slow over weekends. Overall helpful advice.",
    "id": 114
  },
  {
    "name": "Grace Oladipo",
    "profession": "Nurse",
    "country": "Nigeria",
    "rating": 3,
    "category": "Exam Preparation",
    "review": "The study summary was useful, but I had to supplement with additional nursing textbooks for obstetrics.",
    "id": 115
  },
  {
    "name": "Jayson Valenzuela",
    "profession": "Radiographer",
    "country": "Philippines",
    "rating": 3,
    "category": "Licensing",
    "review": "Good assistance with DataFlow. There was some back and forth regarding my diploma seal, but we got it sorted.",
    "id": 116
  },
  {
    "name": "Rakesh Nair",
    "profession": "Pharmacist",
    "country": "India",
    "rating": 3,
    "category": "Career Guidance",
    "review": "Helped me realize my experience was 6 months short for DHA. Appreciated the honesty, even though it was disappointing.",
    "id": 117
  },
  {
    "name": "Muhammad Tariq",
    "profession": "Nurse",
    "country": "Pakistan",
    "rating": 2,
    "category": "Licensing",
    "review": "Had some confusion initially about which documents needed notarization versus council verification. Was resolved after speaking with a senior advisor.",
    "id": 118
  },
  {
    "name": "Reynaldo Ramos",
    "profession": "Dental Technician",
    "country": "Philippines",
    "rating": 2,
    "category": "Career Guidance",
    "review": "Guidance was accurate, but response time took over 3 days during a public holiday. They did resolve my query afterwards.",
    "id": 119
  },
  {
    "name": "Gopal Bhattarai",
    "profession": "Healthcare Assistant",
    "country": "Nepal",
    "rating": 1,
    "category": "Licensing",
    "review": "Disappointed to find out that my diploma institute was not recognized under the Unified GCC PQR framework. Healthserve gave an honest assessment, but not what I hoped to hear.",
    "id": 120
  }
];
