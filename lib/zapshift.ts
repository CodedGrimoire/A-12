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
export const zapshiftServices: Service[] = [];

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
