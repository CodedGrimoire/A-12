import { NextResponse } from "next/server";
import { ensureSeededServices, getAllServices } from "@/lib/server/services";

export async function GET() {
  try {
    await ensureSeededServices();
    const services = await getAllServices();
    return NextResponse.json({ services });
  } catch (error) {
    console.error("Services fetch failed", error);
    return NextResponse.json({ error: "Failed to load services" }, { status: 500 });
  }
}
