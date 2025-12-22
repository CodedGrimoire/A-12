import { connectDB } from "@/lib/db";
import { ServiceModel } from "@/lib/models/Service";
import { seedServices } from "@/lib/seed/services-data";

export async function getAllServices() {
  if (process.env.USE_SEED_SERVICES_ONLY === "1") {
    return seedServices.map(toServiceDtoFromSeed);
  }
  try {
    await connectDB();
    const services = await ServiceModel.find().lean();
    return services.map(toServiceDto);
  } catch (error) {
    // Fallback to seed data when Mongo is unreachable (e.g., build/prerender).
    return seedServices.map(toServiceDtoFromSeed);
  }
}

export async function getServiceBySlug(slug: string) {
  if (process.env.USE_SEED_SERVICES_ONLY === "1") {
    const fallback = seedServices.find((s) => s.id === slug);
    return fallback ? toServiceDtoFromSeed(fallback) : null;
  }
  try {
    await connectDB();
    const service = await ServiceModel.findOne({ slug }).lean();
    return service ? toServiceDto(service) : null;
  } catch (error) {
    const fallback = seedServices.find((s) => s.id === slug);
    return fallback ? toServiceDtoFromSeed(fallback) : null;
  }
}

export async function ensureSeededServices() {
  if (process.env.USE_SEED_SERVICES_ONLY === "1") {
    return;
  }
  try {
    await connectDB();
    const count = await ServiceModel.countDocuments();
    if (count > 0) return;
    await ServiceModel.insertMany(
      seedServices.map((s) => ({
        slug: s.id,
        name: s.name,
        category: s.category,
        summary: s.summary,
        description: s.description,
        hourlyRate: s.hourlyRate,
        dailyRate: s.dailyRate,
        features: s.features,
        notes: s.notes,
      })),
    );
  } catch {
    // Swallow seeding errors when DB is unreachable; seed data will be served from memory.
    return;
  }
}

function toServiceDto(doc: any) {
  return {
    id: doc.slug,
    name: doc.name,
    category: doc.category,
    summary: doc.summary,
    description: doc.description,
    hourlyRate: doc.hourlyRate,
    dailyRate: doc.dailyRate,
    features: doc.features || [],
    notes: doc.notes,
  };
}

function toServiceDtoFromSeed(doc: any) {
  return {
    id: doc.id,
    name: doc.name,
    category: doc.category,
    summary: doc.summary,
    description: doc.description,
    hourlyRate: doc.hourlyRate,
    dailyRate: doc.dailyRate,
    features: doc.features || [],
    notes: doc.notes,
  };
}
