import { Service } from "@/lib/zapshift";

export const seedServices: Service[] = [
  {
    id: "baby-care",
    name: "Baby Care",
    category: "baby",
    summary: "Gentle babysitting and infant-safe routines at home.",
    description:
      "Certified caregivers who handle feeding, naps, playtime, and bedtime routines with patience and empathy. Perfect for infants and toddlers who thrive on consistency.",
    hourlyRate: 9,
    dailyRate: 70,
    features: [
      "Infant-safe profiles & play-based learning",
      "Photo updates and routine tracking",
      "Flexible hours including evenings",
    ],
  },
  {
    id: "elderly-service",
    name: "Elderly Service",
    category: "elderly",
    summary: "Respectful companionship and mobility support for elders.",
    description:
      "Dignified assistance with medication reminders, movement, hydration, and daily comfort care. Ideal for elders who need reliable, compassionate support.",
    hourlyRate: 10,
    dailyRate: 80,
    features: [
      "Fall-safe awareness and transfer support",
      "Meal prep, hydration, and light housekeeping",
      "Family updates and wellness checklists",
    ],
  },
  {
    id: "sick-care",
    name: "Sick People Service",
    category: "sick",
    summary: "At-home recovery support with hygiene and nutrition care.",
    description:
      "Gentle assistance for recovery or chronic needs—rest monitoring, hygiene, and nutrition guidance with sanitized equipment where needed.",
    hourlyRate: 11,
    dailyRate: 90,
    features: [
      "Care plans prepared with nurses",
      "Sanitized equipment and PPE guidance",
      "Flexible hours and overnight options",
    ],
    notes: "For medical interventions, a licensed nurse will be assigned.",
  },
  {
    id: "post-surgery-care",
    name: "Post-Surgery Care",
    category: "sick",
    summary: "Recovery-focused support with wound care reminders and mobility help.",
    description:
      "Attentive helpers to support recovery at home: medication and wound-care reminders, gentle movement assistance, hydration and nutrition tracking.",
    hourlyRate: 12,
    dailyRate: 95,
    features: [
      "Vitals & medication prompts",
      "Assisted mobility and safe transfers",
      "Rest, hydration, and nutrition monitoring",
    ],
  },
  {
    id: "special-needs-care",
    name: "Special Needs Care",
    category: "baby",
    summary: "Experienced caregivers for neurodiverse children and adults.",
    description:
      "Patient, trained caregivers who understand sensory needs, communication preferences, and structured routines for neurodiverse family members.",
    hourlyRate: 13,
    dailyRate: 100,
    features: [
      "Sensory-aware routines and communication",
      "Behavior support and calm transitions",
      "Family collaboration and daily notes",
    ],
  },
  {
    id: "overnight-care",
    name: "Overnight Care",
    category: "elderly",
    summary: "Through-the-night safety checks and comfort for elders or kids.",
    description:
      "Reliable overnight presence for safety, bathroom support, medication reminders, and reassurance—ideal for elders or kids needing steady supervision.",
    hourlyRate: 14,
    dailyRate: 110,
    features: [
      "Nighttime safety checks",
      "Medication and hydration prompts",
      "Calm companionship and reassurance",
    ],
  },
  {
    id: "hospital-sitter",
    name: "Hospital Sitter",
    category: "sick",
    summary: "At-hospital companionship and advocacy during stays.",
    description:
      "Companions stay with your loved one in hospital, relaying updates to family, advocating for comfort needs, and coordinating with staff where allowed.",
    hourlyRate: 11,
    dailyRate: 85,
    features: [
      "Coordination with nurses (where permitted)",
      "Family updates and notes",
      "Comfort, hydration, and mobility support",
    ],
  },
];
