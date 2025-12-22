import { connectDB } from "@/lib/db";
import { ServiceModel } from "@/lib/models/Service";
import { seedServices } from "@/lib/seed/services-data";

export async function getAllServices() {
  await connectDB();
  const services = await ServiceModel.find().lean();
  return services.map(toServiceDto);
}

export async function getServiceBySlug(slug: string) {
  await connectDB();
  const service = await ServiceModel.findOne({ slug }).lean();
  return service ? toServiceDto(service) : null;
}

export async function ensureSeededServices() {
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
