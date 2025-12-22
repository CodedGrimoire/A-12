import { NextResponse } from "next/server";
import {
  ensureSeededServices,
  getServiceBySlug,
} from "@/lib/server/services";

type Params = {
  params: Promise<{ id: string }>;
};

export async function GET(_: Request, { params }: Params) {
  try {
    const { id } = await params;
    await ensureSeededServices();
    const service = await getServiceBySlug(id);
    if (!service) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json({ service });
  } catch (error) {
    console.error("Service fetch failed", error);
    return NextResponse.json({ error: "Failed to load service" }, { status: 500 });
  }
}
