export type Service = {
  id: string;
  name: string;
  category: "baby" | "elderly" | "sick";
  summary: string;
  description: string;
  hourlyRate: number;
  dailyRate: number;
  features: string[];
  notes?: string;
};

export type Booking = {
  id: string;
  serviceId: string;
  serviceName: string;
  duration: { value: number; unit: "hours" | "days" };
  location: { division: string; district: string; city: string; area: string };
  totalCost: number;
  status: "Pending" | "Confirmed" | "Completed" | "Cancelled";
  userEmail: string;
  createdAt: string;
};

// Simulated Zapshift resources available locally for this prototype.
export const zapshiftServices: Service[] = [
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
];

export function listServices() {
  return zapshiftServices;
}

export function getServiceById(id: string) {
  return zapshiftServices.find((service) => service.id === id);
}

export function estimateCost(
  service: Service,
  duration: { value: number; unit: "hours" | "days" },
) {
  const rate = duration.unit === "hours" ? service.hourlyRate : service.dailyRate;
  const subtotal = rate * duration.value;
  const platformFee = Math.max(5, subtotal * 0.05);
  return Math.round((subtotal + platformFee) * 100) / 100;
}

export function createBookingRecord(input: Omit<Booking, "id" | "createdAt">) {
  const id = `bk_${Math.random().toString(36).slice(2, 8)}`;
  const createdAt = new Date().toISOString();
  return { ...input, id, createdAt };
}
