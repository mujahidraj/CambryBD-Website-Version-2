import { PrismaClient, CourseLevel, LeadStatus } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
    console.log("🧹 Clearing existing data...");
    await prisma.course.deleteMany();
    await prisma.englishTestRequirement.deleteMany();
    await prisma.scholarship.deleteMany();
    await prisma.lead.deleteMany();
    await prisma.university.deleteMany();
    await prisma.country.deleteMany();
    await prisma.counselor.deleteMany();
    await prisma.testimonial.deleteMany();
    await prisma.fAQ.deleteMany();
    await prisma.service.deleteMany();
    await prisma.content.deleteMany();
    await prisma.adminUser.deleteMany();

    // ===== ADMIN USER =====
    console.log("👤 Creating admin user...");
    const passwordHash = await bcrypt.hash("AdminCambryBD1", 12);
    await prisma.adminUser.create({
        data: { email: "admin@cambrybd.com", passwordHash, name: "Admin" },
    });

    // ===== COUNSELORS =====
    console.log("👥 Creating counselors...");
    await prisma.counselor.createMany({
        data: [
            { name: "Sarah Ahmed", role: "Senior UK Counselor", bio: "8+ years guiding students to Russell Group universities with 200+ successful placements.", imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400", email: "sarah@cambrybd.com" },
            { name: "James Wilson", role: "Canada Specialist", bio: "Expert in PGWP pathways and Canadian college admissions with strong SDS visa expertise.", imageUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400", email: "james@cambrybd.com" },
            { name: "Priya Nair", role: "Australia & NZ Lead", bio: "Former university admissions officer with deep expertise in Australian and New Zealand education.", imageUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400", email: "priya@cambrybd.com" },
            { name: "Tanvir Hassan", role: "Malaysia Counselor", bio: "Specialist in affordable Asian education pathways with knowledge of Malaysian universities.", imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400", email: "tanvir@cambrybd.com" },
        ],
    });

    // ===== TESTIMONIALS =====
    console.log("⭐ Creating testimonials...");
    await prisma.testimonial.createMany({
        data: [
            { studentName: "Rahul Sharma", studentCourse: "MSc Data Science", universityName: "Imperial College London", targetCountry: "United Kingdom", quote: "Cambry made my UK dream possible. The visa process was flawless and the support was incredible. My counselor Sarah helped me get a 50% scholarship!", featured: true },
            { studentName: "Ayesha Rahman", studentCourse: "BEng Mechanical Engineering", universityName: "University of Toronto", targetCountry: "Canada", quote: "I got a fast-track offer and a CAD 10,000 scholarship thanks to my counselor at Cambry. The PGWP pathway was exactly what I needed.", featured: true },
            { studentName: "Priya Das", studentCourse: "MBA", universityName: "University of Melbourne", targetCountry: "Australia", quote: "The team at Cambry guided me through every step. From IELTS preparation to visa approval, they handled everything professionally.", featured: true },
            { studentName: "Karim Uddin", studentCourse: "BSc Computer Science", universityName: "University of Auckland", targetCountry: "New Zealand", quote: "I never thought studying in New Zealand was possible until Cambry showed me the options. The 3-year post-study work visa is amazing!", featured: true },
            { studentName: "Fatima Khan", studentCourse: "MSc Finance", universityName: "University of Leeds", targetCountry: "United Kingdom", quote: "Cambry's UK specialist knew exactly which universities would accept my profile with a 5-year study gap. I'm now studying at Leeds!", featured: true },
            { studentName: "Arif Hasan", studentCourse: "BBA", universityName: "University of Malaya", targetCountry: "Malaysia", quote: "Malaysia was the perfect affordable option for me. The quality of education is excellent and the tuition is very reasonable.", featured: true },
        ],
    });

    // ===== FAQS =====
    console.log("❓ Creating FAQs...");
    await prisma.fAQ.createMany({
        data: [
            { question: "Can I apply without IELTS?", answer: "Many universities accept Medium of Instruction (MOI) letters, Duolingo, or PTE as alternatives. Some universities have their own English proficiency tests. Contact us for country-specific requirements.", category: "General" },
            { question: "What is the study gap limit?", answer: "Most countries accept study gaps with proper justification. UK universities are generally lenient with 5-10+ year gaps. Australia and Canada may require additional documentation for gaps exceeding 5 years.", category: "General" },
            { question: "How long does the entire process take?", answer: "From initial consultation to receiving your offer letter, it typically takes 4-8 weeks depending on the university and program. Visa processing adds another 2-6 weeks.", category: "General" },
            { question: "Is the consultation really free?", answer: "Yes! Our initial consultation is completely free with no obligations. We only charge service fees after you decide to proceed with us.", category: "General" },
            { question: "Can I work while studying?", answer: "Yes! Most countries allow 20 hours/week part-time work during term and full-time during breaks. UK, Australia, Canada, and NZ all have generous student work rights.", category: "General" },
            { question: "Do you help with accommodation?", answer: "Absolutely! We assist with university dormitories, private student accommodation, and shared housing options near your campus.", category: "General" },
            { question: "What documents do I need?", answer: "Typically: academic transcripts, passport, IELTS/PTE score, SOP, recommendation letters, CV, financial documents. Requirements vary by country and university.", category: "General" },
            { question: "Can I bring my family?", answer: "Many countries allow dependent visas for spouses and children. UK, Australia, Canada, and NZ all have options for family accompanying students, especially at master's and PhD level.", category: "General" },
            { question: "What IELTS score do I need for UK?", answer: "Most UK universities require IELTS 6.0-7.0 overall with no band below 5.5-6.0. Some pre-sessional English courses are available for students who don't meet the requirements.", category: "United Kingdom" },
            { question: "What is the Graduate Route visa?", answer: "The UK Graduate Route allows international students to stay and work for 2 years after completing their degree (3 years for PhD). No sponsorship is required.", category: "United Kingdom" },
            { question: "What is the SDS visa stream for Canada?", answer: "The Student Direct Stream (SDS) is a fast-track study permit processing option for students from certain countries including Bangladesh. It typically takes 20 calendar days.", category: "Canada" },
            { question: "How affordable is studying in Malaysia?", answer: "Malaysia is one of the most affordable study destinations. Tuition fees range from MYR 15,000 to MYR 40,000 per year, and living costs are approximately MYR 1,000-1,500 per month.", category: "Malaysia" },
        ],
    });

    // ===== SERVICES =====
    console.log("🔧 Creating services...");
    await prisma.service.createMany({
        data: [
            { title: "Free Counseling", slug: "free-counseling", description: "One-on-one sessions with expert counselors to understand your academic goals, preferences, budget, and career aspirations.", icon: "MessageCircle", order: 1 },
            { title: "University Admissions", slug: "university-admissions", description: "Complete application support including SOP writing, recommendation letters, document preparation, and interview coaching.", icon: "BookOpen", order: 2 },
            { title: "Visa Processing", slug: "visa-processing", description: "Expert visa guidance with a 98% success rate. Includes document preparation, mock interviews, and appeal assistance.", icon: "FileText", order: 3 },
            { title: "Scholarship Guidance", slug: "scholarship-guidance", description: "Identify and apply for scholarships, grants, and financial aid. We've secured over 200 scholarships for our students.", icon: "Award", order: 4 },
            { title: "Pre-Departure Support", slug: "pre-departure-support", description: "Travel planning, forex assistance, cultural orientation, and packing guides to prepare you for life abroad.", icon: "Plane", order: 5 },
            { title: "Accommodation Help", slug: "accommodation-help", description: "Secure safe, affordable housing near your campus. We handle university halls, private accommodation, and shared housing.", icon: "Home", order: 6 },
        ],
    });

    // ===== CONTENT =====
    console.log("📝 Creating CMS content...");
    await prisma.content.createMany({
        data: [
            { key: "hero_title", title: "Expert Guidance For International Students", body: "Cambry is your trusted International Admission Centre.", type: "PAGE_HERO" },
            { key: "hero_subtitle", body: "We guide you from course selection to visa approval across top universities in the UK, Australia, Canada, Malaysia & New Zealand.", type: "PAGE_HERO" },
            { key: "about_mission", title: "Our Mission", body: "To empower students worldwide with expert guidance, seamless processes, and genuine care.", type: "PAGE_SECTION" },
        ],
    });

    // ===== COUNTRIES =====
    console.log("🌍 Creating countries...");

    const uk = await prisma.country.create({
        data: {
            name: "United Kingdom",
            slug: "united-kingdom",
            description: "The United Kingdom is home to some of the world's oldest and most prestigious universities. With a rich academic tradition, the UK offers world-class education, a multicultural environment, and the Graduate Route visa allowing 2 years of post-study work.",
            imageUrl: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800",
            flagUrl: "🇬🇧",
            currency: "GBP",
            language: "English",
            capitalCity: "London",
            visaRequirements: "Student Visa (Tier 4): Requires a CAS (Confirmation of Acceptance for Studies) from a licensed sponsor, proof of English language ability (IELTS 5.5+), financial evidence showing £1,334/month for London or £1,023/month outside London, tuberculosis test, and biometrics. Processing time is typically 3-4 weeks.",
            infographicData: {
                whyStudy: [
                    "World-class Education System",
                    "2 Years Post-Study Work Visa (Graduate Route)",
                    "Shorter Degree Durations (1 Year Masters)",
                    "Rich Cultural Heritage and Diversity",
                    "High Academic Standards and Global Recognition"
                ],
                timeline: [
                    { step: 1, title: "Initial Counseling & Profiling", duration: "Day 1" },
                    { step: 2, title: "University Selection & Application", duration: "Week 1-2" },
                    { step: 3, title: "Receive Conditional/Unconditional Offer", duration: "Week 3-5" },
                    { step: 4, title: "Credibility Interview (If required)", duration: "Week 6-7" },
                    { step: 5, title: "CAS Issuance & Financial Checks", duration: "Week 8-10" },
                    { step: 6, title: "Visa Application & Biometrics", duration: "Week 11-12" },
                    { step: 7, title: "Visa Approval & Travel", duration: "Week 13-15" }
                ],
                intakes: ["September", "January", "May"],
                workRights: {
                    duringStudy: "20 Hours per Week",
                    postStudy: "2 Years Graduate Route Extra Visa (3 Years for PhD)"
                },
                entryRequirements: {
                    bachelors: "HSC 60%+ or A-Levels. IELTS 6.0 (Min 5.5). Duolingo 105",
                    masters: "Bachelors with 55%+. IELTS 6.0/6.5. Duolingo 115"
                },
                averageCost: {
                    tuition: "£15,000 - £30,000 / Year",
                    living: "£9,207 - £12,006 / Year"
                }
            }
        },
    });

    const australia = await prisma.country.create({
        data: {
            name: "Australia",
            slug: "australia",
            description: "Australia offers a world-class education system with universities ranked among the top globally. Known for its excellent quality of life, diverse culture, and strong post-study work rights of 2-4 years depending on qualification level.",
            imageUrl: "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?w=800",
            flagUrl: "🇦🇺",
            currency: "AUD",
            language: "English",
            capitalCity: "Canberra",
            visaRequirements: "Student Visa (Subclass 500): Requires CoE (Confirmation of Enrolment), Genuine Temporary Entrant (GTE) statement, English proficiency proof, Overseas Student Health Cover (OSHC), financial capacity evidence of AUD 24,505/year for living costs, and biometrics. Processing time is typically 4-6 weeks.",
            infographicData: {
                whyStudy: [
                    "World-class Education System",
                    "High Quality of Life",
                    "Global Recognition",
                    "Safe and Welcoming Environment",
                    "Diverse Range of Study Options"
                ],
                timeline: [
                    { step: 1, title: "Counseling & Profile Assessment", duration: "Day 1" },
                    { step: 2, title: "University Selection & Application", duration: "Week 1-2" },
                    { step: 3, title: "Receive Offer Letter", duration: "Week 3-6" },
                    { step: 4, title: "Acceptance & GTE Assessment", duration: "Week 7-9" },
                    { step: 5, title: "Fee Payment & CoE Issuance", duration: "Week 10-11" },
                    { step: 6, title: "Visa Application & Biometrics", duration: "Week 12-14" },
                    { step: 7, title: "Visa Approval & Travel Prep", duration: "Week 15-16" }
                ],
                intakes: ["February", "July", "November"],
                workRights: {
                    duringStudy: "48 Hours per Fortnight",
                    postStudy: "2 to 4 Years Post-Study Work Visa (PSWW)"
                },
                entryRequirements: {
                    bachelors: "HSC 60%+ or A-Levels. IELTS 6.0/PTE 50",
                    masters: "Bachelors with 55%+. IELTS 6.5/PTE 58"
                },
                averageCost: {
                    tuition: "AUD $25,000 - $45,000 / Year",
                    living: "AUD $24,505 / Year"
                }
            }
        },
    });

    const canada = await prisma.country.create({
        data: {
            name: "Canada",
            slug: "canada",
            description: "Canada is known for its welcoming immigration policies, high quality of life, and excellent post-graduation work permit (PGWP) of up to 3 years. The Student Direct Stream (SDS) offers fast-track processing for eligible countries.",
            imageUrl: "https://images.unsplash.com/photo-1517935706615-2717063c2225?w=800",
            flagUrl: "🇨🇦",
            currency: "CAD",
            language: "English, French",
            capitalCity: "Ottawa",
            visaRequirements: "Study Permit: Requires letter of acceptance from a DLI, proof of financial support (CAD 20,635/year + tuition), IELTS score, Provincial Attestation Letter (PAL), medical exam if required. SDS stream takes approximately 20 calendar days. Regular processing takes 8-12 weeks.",
            infographicData: {
                whyStudy: [
                    "Up to 3 Years Post-Graduation Work Permit (PGWP)",
                    "Clear Pathways to Permanent Residency (PR)",
                    "High Quality of Education and Living Standards",
                    "Extremely Welcoming and Multicultural",
                    "Co-op Programs for Work Experience"
                ],
                timeline: [
                    { step: 1, title: "Choose Program & Institution", duration: "Day 1-7" },
                    { step: 2, title: "Submit Admission Application", duration: "Week 2-3" },
                    { step: 3, title: "Receive Letter of Acceptance (LOA)", duration: "Week 6-10" },
                    { step: 4, title: "Pay First Year Tuition Fee", duration: "Week 11" },
                    { step: 5, title: "Medical Check & Document Assembly", duration: "Week 12" },
                    { step: 6, title: "Lodge Visa Application (SDS/Non-SDS)", duration: "Week 13" },
                    { step: 7, title: "Visa Approval & Travel", duration: "Week 20-25" }
                ],
                intakes: ["Fall (September)", "Winter (January)", "Summer (May)"],
                workRights: {
                    duringStudy: "20 Hours per Week (Off-campus)",
                    postStudy: "1 to 3 Years Post-Graduation Work Permit (PGWP)"
                },
                entryRequirements: {
                    bachelors: "HSC 60%+ or A-Levels. IELTS 6.0 (Min 6.0 for SDS)",
                    masters: "Bachelors with 60%+. IELTS 6.5 (Min 6.0)"
                },
                averageCost: {
                    tuition: "CAD $15,000 - $35,000 / Year",
                    living: "CAD $20,635 / Year"
                }
            }
        },
    });

    const malaysia = await prisma.country.create({
        data: {
            name: "Malaysia",
            slug: "malaysia",
            description: "Malaysia is an affordable yet high-quality study destination in Southeast Asia. Home to branch campuses of top UK and Australian universities, Malaysia offers internationally recognized degrees at a fraction of the cost, with a vibrant multicultural environment.",
            imageUrl: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=800",
            flagUrl: "🇲🇾",
            currency: "MYR",
            language: "Malay, English",
            capitalCity: "Kuala Lumpur",
            visaRequirements: "Student Pass (eVAL): Requires acceptance letter from a Malaysian institution, valid passport, medical examination, financial evidence, academic transcripts, and passport-size photographs. Processing time is typically 2-4 weeks. Student Pass is valid for the duration of the course.",
            infographicData: {
                whyStudy: [
                    "Highly Affordable Tuition and Living Costs",
                    "International Branch Campuses (UK/AUS Degrees)",
                    "English is Widely Spoken",
                    "Safe and Peaceful Environment",
                    "Culturally Diverse and Beautiful Country"
                ],
                timeline: [
                    { step: 1, title: "Program Selection & Consultation", duration: "Day 1" },
                    { step: 2, title: "Submit Application & Documents", duration: "Week 1-2" },
                    { step: 3, title: "Receive Offer Letter", duration: "Week 3-4" },
                    { step: 4, title: "Pay EMGS Fee & Medical Check", duration: "Week 5" },
                    { step: 5, title: "EMGS Visa Approval Letter (eVAL)", duration: "Week 7-9" },
                    { step: 6, title: "Single Entry Visa (SEV) Processing", duration: "Week 10" },
                    { step: 7, title: "Travel to Malaysia & Student Pass", duration: "Week 11" }
                ],
                intakes: ["January", "May", "September"],
                workRights: {
                    duringStudy: "20 Hours per Week (During Semester Breaks)",
                    postStudy: "Limited Options (Dependent on Employer Sponsorship)"
                },
                entryRequirements: {
                    bachelors: "HSC 50%+ or A-Levels. IELTS 5.0-6.0 or accepted MOI",
                    masters: "Bachelors with 2.50+ CGPA. IELTS 6.0"
                },
                averageCost: {
                    tuition: "MYR 15,000 - 45,000 / Year",
                    living: "MYR 15,000 - 20,000 / Year"
                }
            }
        },
    });

    const nz = await prisma.country.create({
        data: {
            name: "New Zealand",
            slug: "new-zealand",
            description: "New Zealand offers an exceptional quality of education, stunning natural landscapes, and one of the world's best post-study work visa programs allowing graduates to work for up to 3 years after completing their qualification.",
            imageUrl: "https://images.unsplash.com/photo-1469521669194-babb45599def?w=800",
            flagUrl: "🇳🇿",
            currency: "NZD",
            language: "English, Māori",
            capitalCity: "Wellington",
            visaRequirements: "Student Visa: Requires offer of place from an approved institution, evidence of sufficient funds (NZD 20,000/year living costs), return airfare evidence, medical and police certificates, IELTS score, and full-time enrollment. Processing time is typically 4-6 weeks.",
            infographicData: {
                whyStudy: [
                    "3 Years Post-Study Work Visa",
                    "Institutions offering Scholarships up to NZD 20,000",
                    "Safe, Clean, and Friendly Environment",
                    "Offer Letters accessible in 2 Weeks for Master Courses",
                    "Spouse Visas for Master/PhD Students"
                ],
                timeline: [
                    { step: 1, title: "Assess Eligibility & Select Course", duration: "Day 1" },
                    { step: 2, title: "Submit Admission Application", duration: "Week 1-2" },
                    { step: 3, title: "Receive Offer of Place", duration: "Week 4-6" },
                    { step: 4, title: "Prepare Financials & Medicals", duration: "Week 7-8" },
                    { step: 5, title: "Lodge Visa Application", duration: "Week 9" },
                    { step: 6, title: "AIP (Approval in Principle) & Pay Fees", duration: "Week 13-16" },
                    { step: 7, title: "Final Visa Grant & Travel", duration: "Week 17-18" }
                ],
                intakes: ["February", "July"],
                workRights: {
                    duringStudy: "20 Hours per Week",
                    postStudy: "Up to 3 Years Post-Study Work Visa"
                },
                entryRequirements: {
                    bachelors: "HSC 60%+ or A-Levels. IELTS 6.0 (Min 5.5)",
                    masters: "Bachelors with 55%+. IELTS 6.5 (Min 5.5). PTE 58"
                },
                averageCost: {
                    tuition: "NZD $25,000 - $40,000 / Year",
                    living: "NZD $20,000 / Year"
                }
            }
        },
    });

    const korea = await prisma.country.create({
        data: {
            name: "South Korea",
            slug: "south-korea",
            description: "South Korea is a global hub for technology, innovation, and pop culture. With highly ranked universities and very affordable tuition fees, it offers an incredible mix of traditional heritage and hyper-modern living.",
            imageUrl: "https://images.unsplash.com/photo-1517154421773-0529f29ea451?w=800",
            flagUrl: "🇰🇷",
            currency: "KRW",
            language: "Korean, English",
            capitalCity: "Seoul",
            visaRequirements: "D-2 Student Visa: Requires an acceptable Certificate of Admission from a Korean university, valid passport, financial documents proving sufficient funds (approx. $20,000 USD), and TB test. Processing time is 2-4 weeks.",
            infographicData: {
                whyStudy: [
                    "Global Hub for IT, Engineering & Business",
                    "Affordable Tuition and Living Cost",
                    "Generous Government and University Scholarships (GKS)",
                    "D-10 Visa for Post-Study Job Hunting (Up to 2 Years)",
                    "Safe Environment and Rich Cultural Experience"
                ],
                timeline: [
                    { step: 1, title: "Research & Document Preparation", duration: "Week 1-2" },
                    { step: 2, title: "University Application Submission", duration: "Week 3-4" },
                    { step: 3, title: "Interview (If required) & Acceptance", duration: "Week 6-8" },
                    { step: 4, title: "Tuition Payment & COE Issuance", duration: "Week 9-10" },
                    { step: 5, title: "Submit Visa Application to Embassy", duration: "Week 11" },
                    { step: 6, title: "Visa Grant & Accommodation Search", duration: "Week 13-14" },
                    { step: 7, title: "Travel to South Korea", duration: "Week 15" }
                ],
                intakes: ["March (Spring)", "September (Fall)"],
                workRights: {
                    duringStudy: "20 Hours/Week (undergraduate), 30 Hours/Week (postgraduate) after 6 months of study",
                    postStudy: "D-10 Job Seeker Visa for up to 2 Years. Transfer to E-7 upon employment."
                },
                entryRequirements: {
                    bachelors: "HSC 60%+. TOPIK Level 3 or IELTS 5.5 for English tracks",
                    masters: "Bachelor's 2.5/4.0 GPA. TOPIK 4 or IELTS 6.0/6.5"
                },
                averageCost: {
                    tuition: "KRW 4,000,000 - 8,000,000 / Semester",
                    living: "KRW 10,000,000 - 15,000,000 / Year"
                }
            }
        }
    });

    const japan = await prisma.country.create({
        data: {
            name: "Japan",
            slug: "japan",
            description: "Japan seamlessly blends deep cultural tradition with world-leading technological advancement. With a shrinking workforce, Japan is actively seeking international graduates, offering incredible career pathways through its 'Designated Activities' visa.",
            imageUrl: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800",
            flagUrl: "🇯🇵",
            currency: "JPY",
            language: "Japanese, English",
            capitalCity: "Tokyo",
            visaRequirements: "Student Visa: First requires a Certificate of Eligibility (COE) handled mostly by the university/school. Once the COE is issued, visa processing at the embassy takes about 1-2 weeks. Total timeline is 2-3 months.",
            infographicData: {
                whyStudy: [
                    "World-leading Advanced Technology and Research",
                    "Extremely Safe, Clean, and Highly Developed Infrastructure",
                    "High Demand for Foreign Talent (Excellent Job Prospects)",
                    "Allowed to work 28 hours/week during studies",
                    "Designated Activities Visa for post-study job hunting"
                ],
                timeline: [
                    { step: 1, title: "Choose Program and Apply", duration: "Months 1-2" },
                    { step: 2, title: "Acceptance & Draft COE Form", duration: "Month 3" },
                    { step: 3, title: "School Applies for COE in Japan", duration: "Month 4" },
                    { step: 4, title: "COE Approval & Issuance", duration: "Month 5-6" },
                    { step: 5, title: "Pay First Year Fees", duration: "Month 6" },
                    { step: 6, title: "Apply for Visa at Embassy", duration: "Month 6" },
                    { step: 7, title: "Visa Granted. Fly to Japan", duration: "Month 7" }
                ],
                intakes: ["April (Spring)", "October (Fall)"],
                workRights: {
                    duringStudy: "28 Hours per Week (Maximum)",
                    postStudy: "Designated Activities Visa for 1 Year (Job Hunting)"
                },
                entryRequirements: {
                    bachelors: "12 years of education. JLPT N5-N2 depending on track. IELTS 6.0 for English tracks",
                    masters: "16 years of education. IELTS 6.5 or JLPT N2/N1"
                },
                averageCost: {
                    tuition: "JPY 535,800 (Public) - 1,500,000 (Private) / Year",
                    living: "JPY 1,000,000 - 1,500,000 / Year"
                }
            }
        }
    });

    const italy = await prisma.country.create({
        data: {
            name: "Italy",
            slug: "italy",
            description: "Italy is home to some of the oldest universities in the world. It provides extremely accessible, low-cost European education surrounded by iconic art, history, fashion, and culinary excellence.",
            imageUrl: "https://images.unsplash.com/photo-1516483638261-f40889c28bf3?w=800",
            flagUrl: "🇮🇹",
            currency: "EUR",
            language: "Italian, English",
            capitalCity: "Rome",
            visaRequirements: "Type D National Visa: Requires standard pre-enrollment via the Universitaly portal. Needs proof of accommodation, medical insurance, and minimum financial threshold of around €6,000 per year.",
            infographicData: {
                whyStudy: [
                    "Very Low Tuition Fees (Starting from €900/year at Public Unis)",
                    "Extensive Range of English-Taught Programs",
                    "Gateway to the Schengen Area (Travel 27 European Countries)",
                    "Rich Cultural, Historic, and Scenic Landscapes",
                    "1-Year Stay Back option for Masters/PhD"
                ],
                timeline: [
                    { step: 1, title: "Application & Portfolio Prep", duration: "Week 1-3" },
                    { step: 2, title: "Receive Acceptance Letter", duration: "Week 4-8" },
                    { step: 3, title: "Pre-enrollment on Universitaly", duration: "Week 9-11" },
                    { step: 4, title: "DOV (Declaration of Value) Processing", duration: "Week 12-14" },
                    { step: 5, title: "Visa Appointment & Lodging", duration: "Week 15" },
                    { step: 6, title: "Visa Interview & Grant", duration: "Week 18" },
                    { step: 7, title: "Apply for Permesso di Soggiorno in Italy", duration: "Arrival + 8 days" }
                ],
                intakes: ["September (Fall)"],
                workRights: {
                    duringStudy: "20 Hours per Week (Up to 1,040 hours/year)",
                    postStudy: "1-Year Stay Back (Permesso di Soggiorno per Attesa Occupazione) for Masters/PhD."
                },
                entryRequirements: {
                    bachelors: "12 years of schooling. IELTS 5.5/6.0. SAT/TOLC might be required.",
                    masters: "Bachelors Degree. IELTS 6.0/6.5. Some specific program prerequisites."
                },
                averageCost: {
                    tuition: "€900 - €4,000 (Public) | €6,000 - €20,000 (Private) / Year",
                    living: "€8,000 - €12,000 / Year"
                }
            }
        }
    });

    const malta = await prisma.country.create({
        data: {
            name: "Malta",
            slug: "malta",
            description: "Surrounded by the Mediterranean Sea, Malta is an English-speaking European archipelago. It is rapidly expanding as a European tech, blockchain, and iGaming hub with highly affordable tuition rates and a sunny climate.",
            imageUrl: "https://images.unsplash.com/photo-1543158021-d7d8aed3cbee?w=800",
            flagUrl: "🇲🇹",
            currency: "EUR",
            language: "Maltese, English",
            capitalCity: "Valletta",
            visaRequirements: "National Visa (Type D): Student visa processing takes 4-8 weeks. Standard Schengen requirements apply including acceptance letter, health insurance, and proof of funds.",
            infographicData: {
                whyStudy: [
                    "English is an Official Language (No language barrier issues)",
                    "Schengen Member State (Travel Europe freely)",
                    "Highly Affordable European Education",
                    "Booming Tech, iGaming, and Tourism Job Markets",
                    "9 Months Post-Study Search Visa"
                ],
                timeline: [
                    { step: 1, title: "Course Selection & Application", duration: "Day 1-14" },
                    { step: 2, title: "Conditional/Unconditional Offer", duration: "Week 4" },
                    { step: 3, title: "Payment of Tuition Fees", duration: "Week 5" },
                    { step: 4, title: "Receipt of Final Acceptance", duration: "Week 6" },
                    { step: 5, title: "Document Attestation & VFS Appointment", duration: "Week 8" },
                    { step: 6, title: "Lodge Visa at VFS/Embassy", duration: "Week 10" },
                    { step: 7, title: "Visa Processing & Travel", duration: "Week 14-16" }
                ],
                intakes: ["October", "February", "June"],
                workRights: {
                    duringStudy: "20 Hours per Week (After 3 months of stay)",
                    postStudy: "9 Months Extension to Seek Employment"
                },
                entryRequirements: {
                    bachelors: "HSC 55%+. IELTS 5.5 - 6.0. MOI occasionally accepted.",
                    masters: "Bachelors 55%+. IELTS 6.0 - 6.5. MOI frequently accepted."
                },
                averageCost: {
                    tuition: "€5,000 - €9,000 / Year",
                    living: "€6,000 - €9,000 / Year"
                }
            }
        }
    });

    const cyprus = await prisma.country.create({
        data: {
            name: "Cyprus",
            slug: "cyprus",
            description: "An island nation at the crossroads of Europe, Asia, and Africa. Cyprus offers high-quality international degrees, sunny weather, and a great stepping stone into the European business landscape.",
            imageUrl: "https://images.unsplash.com/photo-1533100657997-7591e1d2110d?w=800",
            flagUrl: "🇨🇾",
            currency: "EUR",
            language: "Greek, Turkish, English",
            capitalCity: "Nicosia",
            visaRequirements: "Student entry visa is processed by the university submitting documents directly to the Migration Department in Cyprus. Requires police clearance, medical test, and bank letter.",
            infographicData: {
                whyStudy: [
                    "No IELTS Required (MOI or Internal Test Accepted)",
                    "Gap Years are Accepted (Less Strict Visa Constraints)",
                    "Very Low Tuition Fees & High Scholarships (up to 50%)",
                    "European Standard of Education & US Dual Degrees",
                    "Beautiful Mediterranean Resort-like Living"
                ],
                timeline: [
                    { step: 1, title: "Application with Scanned Documents", duration: "Day 1" },
                    { step: 2, title: "Conditional Offer Letter Issued", duration: "Day 3-7" },
                    { step: 3, title: "Pay Initial Deposit/First Semester", duration: "Week 2" },
                    { step: 4, title: "University applies for Entry Permit", duration: "Week 3" },
                    { step: 5, title: "MEXT/Immigration Processing", duration: "Week 4-8" },
                    { step: 6, title: "Receive Copy of Visa Entry Permit", duration: "Week 9" },
                    { step: 7, title: "Fly to Cyprus & Process resident permit", duration: "Week 10" }
                ],
                intakes: ["September", "February", "June (Summer)"],
                workRights: {
                    duringStudy: "20 Hours per Week (In specific sectors like Hospitality/Retail)",
                    postStudy: "60 Days to secure a work permit (Employment Visa) after graduation."
                },
                entryRequirements: {
                    bachelors: "HSC Pass. IELTS 5.0 or University English Exam.",
                    masters: "Bachelors Pass. IELTS 5.5 - 6.0 or University English Exam."
                },
                averageCost: {
                    tuition: "€3,000 - €6,500 / Year (After usual scholarships)",
                    living: "€4,000 - €7,000 / Year"
                }
            }
        }
    });

    const finland = await prisma.country.create({
        data: {
            name: "Finland",
            slug: "finland",
            description: "Known for possessing the 'Best Education System in the World'. Finland is a safe, progressive Nordic country with a high standard of living, beautiful nature, and excellent post-study prospects for highly skilled workers.",
            imageUrl: "https://images.unsplash.com/photo-1538332576228-eb5b4c4de6f5?w=800",
            flagUrl: "🇫🇮",
            currency: "EUR",
            language: "Finnish, Swedish, English",
            capitalCity: "Helsinki",
            visaRequirements: "Residence Permit for Studies: Requires acceptance letter, paid tuition fee, health insurance, and proof of €6,720 per year for living expenses. Takes 1-3 months via EnterFinland portal.",
            infographicData: {
                whyStudy: [
                    "World's #1 Most Innovative and Best Education System",
                    "2 Years Post-Study Work Visa (Job Search Visa)",
                    "Spouse and Dependent Visas Available with Full Work Rights",
                    "Extremely Safe, Clean, and High Standard of Living",
                    "High Demand for STEM, Tech, and Nursing Graduates"
                ],
                timeline: [
                    { step: 1, title: "Joint Application Period (Very strict deadlines)", duration: "January" },
                    { step: 2, title: "Entrance Exams / Interviews", duration: "Feb-March" },
                    { step: 3, title: "Admission Results Published", duration: "April-May" },
                    { step: 4, title: "Accept Offer & Pay Tuition Fee", duration: "May" },
                    { step: 5, title: "Submit Residence Permit via EnterFinland", duration: "May-June" },
                    { step: 6, title: "Visit VFS for Biometrics Identification", duration: "June-July" },
                    { step: 7, title: "Receive Permit Card & Relocate", duration: "August" }
                ],
                intakes: ["August / September (Main)", "January (Secondary)"],
                workRights: {
                    duringStudy: "30 Hours per Week",
                    postStudy: "2 Years Extended Residence Permit to look for work."
                },
                entryRequirements: {
                    bachelors: "HSC/Diploma. IELTS 6.0. SAT scores often preferred for business/tech.",
                    masters: "Relevant Bachelors. IELTS 6.5. Motivation Letter & Research Proposal."
                },
                averageCost: {
                    tuition: "€6,000 - €18,000 / Year",
                    living: "€8,000 - €10,000 / Year"
                }
            }
        }
    });

    // ===== UNIVERSITIES =====
    console.log("🏫 Creating universities...");

    // UK Universities
    const ukUnis = await Promise.all([
        prisma.university.create({
            data: {
                name: "University of Oxford", slug: "university-of-oxford", location: "Oxford, England", tuitionEstimate: "£28,000 - £44,000/yr",
                description: "One of the world's oldest and most prestigious universities, consistently ranked in the global top 5.",
                imageUrl: "https://images.unsplash.com/photo-1580337631510-c94f067dbbb0?w=800", website: "https://www.ox.ac.uk", ranking: "1", countryId: uk.id,
            },
        }),
        prisma.university.create({
            data: {
                name: "Imperial College London", slug: "imperial-college-london", location: "London, England", tuitionEstimate: "£25,000 - £40,000/yr",
                description: "A world-leading science, engineering, and medicine institution in the heart of London.",
                imageUrl: "https://images.unsplash.com/photo-1526129318478-62ed807ebdf9?w=800", website: "https://www.imperial.ac.uk", ranking: "6", countryId: uk.id,
            },
        }),
        prisma.university.create({
            data: {
                name: "University of Leeds", slug: "university-of-leeds", location: "Leeds, England", tuitionEstimate: "£19,500 - £26,000/yr",
                description: "A Russell Group university known for research excellence and a vibrant student community.",
                imageUrl: "https://images.unsplash.com/photo-1564981797816-1043664bf78d?w=800", website: "https://www.leeds.ac.uk", ranking: "86", countryId: uk.id,
            },
        }),
        prisma.university.create({
            data: {
                name: "University of Birmingham", slug: "university-of-birmingham", location: "Birmingham, England", tuitionEstimate: "£18,000 - £25,000/yr",
                description: "A Russell Group university with strong industry connections and excellent employability outcomes.",
                imageUrl: "https://images.unsplash.com/photo-1564429238961-bf8e6aace160?w=800", website: "https://www.birmingham.ac.uk", ranking: "90", countryId: uk.id,
            },
        }),
        prisma.university.create({
            data: {
                name: "University of Glasgow", slug: "university-of-glasgow", location: "Glasgow, Scotland", tuitionEstimate: "£18,000 - £28,000/yr",
                description: "Scotland's fourth-oldest university, part of the Russell Group, known for world-changing research.",
                imageUrl: "https://images.unsplash.com/photo-1551250928-cb2dafa2e193?w=800", website: "https://www.gla.ac.uk", ranking: "76", countryId: uk.id,
            },
        }),
    ]);

    // Australia Universities
    const auUnis = await Promise.all([
        prisma.university.create({
            data: {
                name: "University of Melbourne", slug: "university-of-melbourne", location: "Melbourne, Victoria", tuitionEstimate: "AUD 30,000 - 50,000/yr",
                description: "Australia's #1 university, internationally acclaimed for research and teaching across all disciplines.",
                imageUrl: "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?w=800", website: "https://www.unimelb.edu.au", ranking: "13", countryId: australia.id,
            },
        }),
        prisma.university.create({
            data: {
                name: "University of Sydney", slug: "university-of-sydney", location: "Sydney, NSW", tuitionEstimate: "AUD 36,000 - 52,000/yr",
                description: "Australia's first university, renowned for academic excellence and a stunning campus.",
                imageUrl: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=800", website: "https://www.sydney.edu.au", ranking: "19", countryId: australia.id,
            },
        }),
        prisma.university.create({
            data: {
                name: "Deakin University", slug: "deakin-university", location: "Melbourne, Victoria", tuitionEstimate: "AUD 25,000 - 38,000/yr",
                description: "A progressive university known for strong industry partnerships and excellent student satisfaction.",
                imageUrl: "https://images.unsplash.com/photo-1507272931001-fc06c17e4f43?w=800", website: "https://www.deakin.edu.au", ranking: "266", countryId: australia.id,
            },
        }),
    ]);

    // Canada Universities
    const caUnis = await Promise.all([
        prisma.university.create({
            data: {
                name: "University of Toronto", slug: "university-of-toronto", location: "Toronto, Ontario", tuitionEstimate: "CAD 45,000 - 65,000/yr",
                description: "Canada's premier research university, consistently ranked as one of the top universities globally.",
                imageUrl: "https://images.unsplash.com/photo-1517935706615-2717063c2225?w=800", website: "https://www.utoronto.ca", ranking: "21", countryId: canada.id,
            },
        }),
        prisma.university.create({
            data: {
                name: "University of British Columbia", slug: "university-of-british-columbia", location: "Vancouver, BC", tuitionEstimate: "CAD 40,000 - 55,000/yr",
                description: "A globally recognized university set in a stunning campus in Vancouver, BC.",
                imageUrl: "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?w=800", website: "https://www.ubc.ca", ranking: "34", countryId: canada.id,
            },
        }),
        prisma.university.create({
            data: {
                name: "Conestoga College", slug: "conestoga-college", location: "Kitchener, Ontario", tuitionEstimate: "CAD 15,000 - 22,000/yr",
                description: "Ontario's fastest-growing college offering career-focused diploma and degree programs.",
                imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800", website: "https://www.conestogac.on.ca", ranking: "Top College", countryId: canada.id,
            },
        }),
    ]);

    // Malaysia Universities
    const myUnis = await Promise.all([
        prisma.university.create({
            data: {
                name: "University of Malaya", slug: "university-of-malaya", location: "Kuala Lumpur", tuitionEstimate: "MYR 15,000 - 35,000/yr",
                description: "Malaysia's oldest and top-ranked university, offering a wide range of undergraduate and postgraduate programs.",
                imageUrl: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=800", website: "https://www.um.edu.my", ranking: "65", countryId: malaysia.id,
            },
        }),
        prisma.university.create({
            data: {
                name: "UCSI University", slug: "ucsi-university", location: "Kuala Lumpur", tuitionEstimate: "MYR 20,000 - 40,000/yr",
                description: "One of Malaysia's leading private universities with strong international partnerships and vibrant campus life.",
                imageUrl: "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=800", website: "https://www.ucsiuniversity.edu.my", ranking: "284", countryId: malaysia.id,
            },
        }),
        prisma.university.create({
            data: {
                name: "Taylor's University", slug: "taylors-university", location: "Subang Jaya, Selangor", tuitionEstimate: "MYR 25,000 - 45,000/yr",
                description: "Malaysia's top-ranked private university known for hospitality, business, and engineering programs.",
                imageUrl: "https://images.unsplash.com/photo-1562774053-701939374585?w=800", website: "https://www.taylors.edu.my", ranking: "284", countryId: malaysia.id,
            },
        }),
    ]);

    // New Zealand Universities
    const nzUnis = await Promise.all([
        prisma.university.create({
            data: {
                name: "University of Auckland", slug: "university-of-auckland", location: "Auckland", tuitionEstimate: "NZD 28,000 - 42,000/yr",
                description: "New Zealand's leading university, ranked #1 nationally and within the top 100 globally.",
                imageUrl: "https://images.unsplash.com/photo-1469521669194-babb45599def?w=800", website: "https://www.auckland.ac.nz", ranking: "68", countryId: nz.id,
            },
        }),
        prisma.university.create({
            data: {
                name: "University of Otago", slug: "university-of-otago", location: "Dunedin, South Island", tuitionEstimate: "NZD 25,000 - 38,000/yr",
                description: "New Zealand's oldest university, renowned for health sciences, sciences, and humanities.",
                imageUrl: "https://images.unsplash.com/photo-1504893524553-b855bce32c67?w=800", website: "https://www.otago.ac.nz", ranking: "217", countryId: nz.id,
            },
        }),
        prisma.university.create({
            data: {
                name: "Victoria University of Wellington", slug: "victoria-university-wellington", location: "Wellington", tuitionEstimate: "NZD 26,000 - 40,000/yr",
                description: "A research-intensive university in New Zealand's capital, strong in law, political science, and creative arts.",
                imageUrl: "https://images.unsplash.com/photo-1507699622108-4be3abd695ad?w=800", website: "https://www.wgtn.ac.nz", ranking: "241", countryId: nz.id,
            },
        }),
    ]);

    // South Korea Universities
    const koreaUnis = await Promise.all([
        prisma.university.create({
            data: {
                name: "Seoul National University", slug: "seoul-national-university", location: "Seoul", tuitionEstimate: "KRW 6,000,000 - 8,000,000/yr",
                description: "The most prestigious university in South Korea, highly competitive and globally ranked.",
                imageUrl: "https://images.unsplash.com/photo-1548115184-bc6544d06a58?w=800", website: "https://en.snu.ac.kr", ranking: "41", countryId: korea.id,
            },
        }),
        prisma.university.create({
            data: {
                name: "Korea University", slug: "korea-university", location: "Seoul", tuitionEstimate: "KRW 7,000,000 - 9,000,000/yr",
                description: "One of the historic SKY universities known for excellence in business and humanities.",
                imageUrl: "https://images.unsplash.com/photo-1563200030-22c57700afde?w=800", website: "https://en.korea.ac.kr", ranking: "79", countryId: korea.id,
            },
        }),
    ]);

    // Japan Universities
    const japanUnis = await Promise.all([
        prisma.university.create({
            data: {
                name: "University of Tokyo", slug: "university-of-tokyo", location: "Tokyo", tuitionEstimate: "JPY 535,800/yr",
                description: "Japan's premier university renowned for science, technology, and producing numerous Nobel laureates.",
                imageUrl: "https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=800", website: "https://www.u-tokyo.ac.jp/en/", ranking: "28", countryId: japan.id,
            },
        }),
        prisma.university.create({
            data: {
                name: "Osaka University", slug: "osaka-university", location: "Osaka", tuitionEstimate: "JPY 535,800/yr",
                description: "A top-tier national university with a strong focus on research, medicine, and engineering.",
                imageUrl: "https://images.unsplash.com/photo-1590559899731-a382839ce501?w=800", website: "https://www.osaka-u.ac.jp/en", ranking: "80", countryId: japan.id,
            },
        }),
    ]);

    // Italy Universities
    const italyUnis = await Promise.all([
        prisma.university.create({
            data: {
                name: "Politecnico di Milano", slug: "politecnico-di-milano", location: "Milan", tuitionEstimate: "€1,000 - €3,900/yr",
                description: "Italy's largest and highest-ranked technical university specializing in engineering, architecture, and design.",
                imageUrl: "https://images.unsplash.com/photo-1520440229-6469a149ac59?w=800", website: "https://www.polimi.it/en", ranking: "123", countryId: italy.id,
            },
        }),
        prisma.university.create({
            data: {
                name: "Sapienza University of Rome", slug: "sapienza-university-of-rome", location: "Rome", tuitionEstimate: "€1,000 - €2,000/yr",
                description: "One of the oldest and largest universities in Europe, located in the historic heart of Rome.",
                imageUrl: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800", website: "https://www.uniroma1.it/en", ranking: "134", countryId: italy.id,
            },
        }),
    ]);

    // Malta Universities
    const maltaUnis = await Promise.all([
        prisma.university.create({
            data: {
                name: "University of Malta", slug: "university-of-malta", location: "Msida", tuitionEstimate: "€8,000 - €14,000/yr",
                description: "The highest educational institution in Malta offering a wide range of international degrees.",
                imageUrl: "https://images.unsplash.com/photo-1502602898657-3e907fa8ad76?w=800", website: "https://www.um.edu.mt/", ranking: "Top in Malta", countryId: malta.id,
            },
        }),
        prisma.university.create({
            data: {
                name: "Malta College of Arts, Science and Technology (MCAST)", slug: "mcast", location: "Paola", tuitionEstimate: "€5,000 - €8,000/yr",
                description: "The leading vocational education and training institution offering highly practical applied Bachelor degrees.",
                imageUrl: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800", website: "https://mcast.edu.mt/", ranking: "Vocational Leader", countryId: malta.id,
            },
        }),
    ]);

    // Cyprus Universities
    const cyprusUnis = await Promise.all([
        prisma.university.create({
            data: {
                name: "University of Cyprus", slug: "university-of-cyprus", location: "Nicosia", tuitionEstimate: "€3,500 - €6,500/yr",
                description: "Public research university offering top-tier European degrees in a sun-soaked Mediterranean setting.",
                imageUrl: "https://images.unsplash.com/photo-1521911528923-9c3838123480?w=800", website: "https://www.ucy.ac.cy/en/", ranking: "473", countryId: cyprus.id,
            },
        }),
        prisma.university.create({
            data: {
                name: "Eastern Mediterranean University", slug: "eastern-mediterranean-university", location: "Famagusta", tuitionEstimate: "€3,000 - €5,000/yr",
                description: "A highly multicultural institution offering massive international student scholarships out-of-the-box.",
                imageUrl: "https://images.unsplash.com/photo-1507561845558-89c0ea34e565?w=800", website: "https://www.emu.edu.tr/en", ranking: "Top 1000", countryId: cyprus.id,
            },
        }),
    ]);

    // Finland Universities
    const finlandUnis = await Promise.all([
        prisma.university.create({
            data: {
                name: "University of Helsinki", slug: "university-of-helsinki", location: "Helsinki", tuitionEstimate: "€13,000 - €18,000/yr",
                description: "Finland's oldest and largest academic institution focusing heavily on world-class research.",
                imageUrl: "https://images.unsplash.com/photo-1510452399587-8d2629b3ae3e?w=800", website: "https://www.helsinki.fi/en", ranking: "115", countryId: finland.id,
            },
        }),
        prisma.university.create({
            data: {
                name: "Aalto University", slug: "aalto-university", location: "Espoo", tuitionEstimate: "€12,000 - €15,000/yr",
                description: "A multidisciplinary community of bold thinkers where science and art meet technology and business.",
                imageUrl: "https://images.unsplash.com/photo-1498677231914-50faa53a236b?w=800", website: "https://www.aalto.fi/en", ranking: "109", countryId: finland.id,
            },
        }),
    ]);

    // ===== ENGLISH TEST REQUIREMENTS =====
    console.log("📋 Creating English test requirements...");
    const allUnis = [
        ...ukUnis, ...auUnis, ...caUnis, ...myUnis, ...nzUnis,
        ...koreaUnis, ...japanUnis, ...italyUnis, ...maltaUnis, ...cyprusUnis, ...finlandUnis
    ];
    for (const uni of allUnis) {
        await prisma.englishTestRequirement.createMany({
            data: [
                { testName: "IELTS Academic", minimumScore: "6.0 overall (no band below 5.5)", acceptsMOI: false, universityId: uni.id },
                { testName: "PTE Academic", minimumScore: "56 overall", acceptsMOI: false, universityId: uni.id },
            ],
        });
    }
    // Add MOI for select universities
    for (const uni of [
        ukUnis[2], ukUnis[3], ukUnis[4], 
        auUnis[2], 
        caUnis[2], 
        ...myUnis, 
        nzUnis[1], nzUnis[2],
        ...cyprusUnis, ...maltaUnis, italyUnis[1]
    ]) {
        await prisma.englishTestRequirement.create({
            data: { testName: "MOI Letter", minimumScore: "Accepted (from English-medium institution)", acceptsMOI: true, universityId: uni.id },
        });
    }

    // ===== SCHOLARSHIPS =====
    console.log("🏆 Creating scholarships...");
    await prisma.scholarship.createMany({
        data: [
            { name: "Chevening Scholarship", amount: "Full tuition + living expenses", description: "UK government's global scholarship program for future leaders.", criteria: "Minimum 2 years work experience, undergraduate degree", universityId: ukUnis[0].id },
            { name: "Leeds International Scholarship", amount: "Up to £10,000 fee reduction", description: "Merit-based scholarship for international postgraduate students.", criteria: "Strong academic profile, firm offer", universityId: ukUnis[2].id },
            { name: "Birmingham Global Masters Scholarship", amount: "Up to £5,000", description: "Scholarship for international students pursuing taught masters.", criteria: "2:1 or equivalent, conditional offer", universityId: ukUnis[3].id },
            { name: "Melbourne Graduate Scholarship", amount: "Up to 50% fee reduction", description: "For outstanding international students admitted to graduate programs.", criteria: "Exceptional academic record", universityId: auUnis[0].id },
            { name: "Deakin STEM Scholarship", amount: "20% tuition fee reduction", description: "For international students enrolled in STEM programs.", criteria: "Strong academic results in science/math", universityId: auUnis[2].id },
            { name: "Lester B. Pearson Scholarship", amount: "Full tuition + living for 4 years", description: "University of Toronto's most prestigious entrance award.", criteria: "Exceptional academic achievement and leadership", universityId: caUnis[0].id },
            { name: "UM International Student Scholarship", amount: "Up to MYR 10,000", description: "Merit-based scholarship for outstanding international applicants.", criteria: "Strong academic credentials", universityId: myUnis[0].id },
            { name: "Taylor's Excellence Award", amount: "Up to 50% tuition waiver", description: "For academically outstanding students in any program.", criteria: "Minimum GPA 3.5 or equivalent", universityId: myUnis[2].id },
            { name: "Auckland International Student Excellence", amount: "Up to NZD 20,000", description: "For high-achieving international students.", criteria: "Outstanding academic results and strong English proficiency", universityId: nzUnis[0].id },
            { name: "Otago International Excellence", amount: "NZD 10,000", description: "Merit scholarship for new international students.", criteria: "Strong academic profile", universityId: nzUnis[1].id },
        ],
    });

    // ===== COURSES =====
    console.log("📖 Creating courses...");
    const courseData = [
        // UK courses
        { title: "MSc Data Science", level: CourseLevel.MASTERS, duration: "1 year", description: "Advanced data science program covering machine learning, AI, and big data analytics. Tuition: £28,000/yr.", universityId: ukUnis[1].id },
        { title: "MBA", level: CourseLevel.MASTERS, duration: "1 year", description: "Prestigious MBA program for aspiring business leaders. Tuition: £32,000/yr.", universityId: ukUnis[0].id },
        { title: "MSc Finance", level: CourseLevel.MASTERS, duration: "1 year", description: "Finance program blending quantitative and qualitative methods. Tuition: £26,000/yr.", universityId: ukUnis[2].id },
        { title: "BEng Mechanical Engineering", level: CourseLevel.BACHELORS, duration: "3 years", description: "Comprehensive mechanical engineering with practical project work. Tuition: £23,000/yr.", universityId: ukUnis[3].id },
        { title: "LLM International Law", level: CourseLevel.MASTERS, duration: "1 year", description: "Postgraduate law specializing in international legal frameworks. Tuition: £22,000/yr.", universityId: ukUnis[4].id },
        // Australia courses
        { title: "Master of Engineering", level: CourseLevel.MASTERS, duration: "2 years", description: "Advanced engineering program with industry placement. Tuition: AUD 45,000/yr.", universityId: auUnis[0].id },
        { title: "Bachelor of Commerce", level: CourseLevel.BACHELORS, duration: "3 years", description: "Comprehensive commerce degree with specialization options. Tuition: AUD 42,000/yr.", universityId: auUnis[1].id },
        { title: "Master of Nursing", level: CourseLevel.MASTERS, duration: "2 years", description: "Postgraduate nursing program with clinical placements. Tuition: AUD 32,000/yr.", universityId: auUnis[2].id },
        // Canada courses
        { title: "BSc Computer Science", level: CourseLevel.BACHELORS, duration: "4 years", description: "Top-ranked CS program with co-op opportunities. Tuition: CAD 55,000/yr.", universityId: caUnis[0].id },
        { title: "Master of Data Science", level: CourseLevel.MASTERS, duration: "2 years", description: "Cutting-edge data science with industry partnerships. Tuition: CAD 48,000/yr.", universityId: caUnis[1].id },
        { title: "Diploma in IT", level: CourseLevel.DIPLOMA, duration: "2 years", description: "Career-focused IT diploma with hands-on learning. Tuition: CAD 16,000/yr.", universityId: caUnis[2].id },
        // Malaysia courses
        { title: "Bachelor of Business Administration", level: CourseLevel.BACHELORS, duration: "3 years", description: "Affordable BBA with strong industry connections. Tuition: MYR 25,000/yr.", universityId: myUnis[0].id },
        { title: "MSc Computer Science", level: CourseLevel.MASTERS, duration: "1.5 years", description: "Postgraduate CS program with research focus. Tuition: MYR 30,000/yr.", universityId: myUnis[1].id },
        { title: "Bachelor of Hospitality Management", level: CourseLevel.BACHELORS, duration: "3 years", description: "Top-ranked hospitality program with internships. Tuition: MYR 35,000/yr.", universityId: myUnis[2].id },
        // NZ courses
        { title: "Master of Public Health", level: CourseLevel.MASTERS, duration: "2 years", description: "Public health program with practical fieldwork. Tuition: NZD 35,000/yr.", universityId: nzUnis[0].id },
        { title: "BSc Environmental Science", level: CourseLevel.BACHELORS, duration: "3 years", description: "Environmental science with fieldwork in stunning NZ landscapes. Tuition: NZD 28,000/yr.", universityId: nzUnis[1].id },
        { title: "LLB Law", level: CourseLevel.BACHELORS, duration: "4 years", description: "Comprehensive law degree with strong career outcomes. Tuition: NZD 32,000/yr.", universityId: nzUnis[2].id },
        
        // New Destinations Courses
        { title: "Master of Global Business", level: CourseLevel.MASTERS, duration: "2 years", description: "International business program taught fully in English. Tuition: KRW 8,000,000/yr.", universityId: koreaUnis[0].id },
        { title: "BSc Artificial Intelligence", level: CourseLevel.BACHELORS, duration: "4 years", description: "Cutting edge AI and robotics curriculum. Tuition: JPY 600,000/yr.", universityId: japanUnis[0].id },
        { title: "Master of Architecture", level: CourseLevel.MASTERS, duration: "2 years", description: "World-class architectural design in the design capital of the world. Tuition: €3,500/yr.", universityId: italyUnis[0].id },
        { title: "BSc Computer Engineering (iGaming)", level: CourseLevel.BACHELORS, duration: "3 years", description: "Direct pathway to Malta's booming tech sector. Tuition: €6,500/yr.", universityId: maltaUnis[1].id },
        { title: "BBA Tourism Management", level: CourseLevel.BACHELORS, duration: "4 years", description: "Hospitality degree with guaranteed summer internship placements. Tuition: €4,000/yr.", universityId: cyprusUnis[1].id },
        { title: "MSc Clean Energy", level: CourseLevel.MASTERS, duration: "2 years", description: "Focused on sustainability and renewable tech integration. Tuition: €14,000/yr.", universityId: finlandUnis[1].id },
    ];

    await prisma.course.createMany({ data: courseData });

    // ===== SAMPLE LEADS =====
    console.log("📬 Creating sample leads...");
    await prisma.lead.createMany({
        data: [
            { name: "Ali Rahman", email: "ali@example.com", phone: "+880170001", desiredCountry: "United Kingdom", message: "Interested in MSc Data Science programs.", status: LeadStatus.NEW },
            { name: "Nadia Islam", email: "nadia@example.com", phone: "+880170002", desiredCountry: "Canada", message: "Looking for post-study work opportunities.", status: LeadStatus.CONTACTED },
            { name: "Rafiq Ahmed", email: "rafiq@example.com", phone: "+880170003", desiredCountry: "Australia", message: "Want to study engineering.", status: LeadStatus.PROCESSING },
            { name: "Sadia Khan", email: "sadia@example.com", phone: "+880170004", desiredCountry: "Malaysia", message: "Affordable BBA options.", status: LeadStatus.CONVERTED },
            { name: "Imran Hossain", email: "imran@example.com", phone: "+880170005", desiredCountry: "New Zealand", message: "Environmental science programs.", status: LeadStatus.NEW },
        ],
    });

    console.log("✅ Seed completed successfully!");
    console.log("📊 Summary:");
    console.log(`   Countries: 11`);
    console.log(`   Universities: ${allUnis.length}`);
    console.log(`   Courses: ${courseData.length}`);
    console.log(`   Scholarships: 10`);
    console.log(`   Testimonials: 6`);
    console.log(`   FAQs: 12`);
    console.log(`   Services: 6`);
    console.log(`   Counselors: 4`);
}

main()
    .catch((e) => {
        console.error("❌ Seed error:", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
