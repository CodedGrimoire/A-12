import Link from "next/link";
import { ensureSeededServices, getAllServices } from "@/lib/server/services";
import type { Service } from "@/lib/zapshift";

type Props = {
  limit?: number;
  title?: string;
  description?: string;
  hideCta?: boolean;
};

export default async function Services({
  limit,
  title = "Choose the care that fits your family.",
  description = "Baby sitting, elderly care, or special care at home—book for the hours you need with vetted professionals you can trust.",
  hideCta = false,
}: Props) {
  await ensureSeededServices();
  const services: Service[] = await getAllServices();
  const items = typeof limit === "number" ? services.slice(0, limit) : services;
  return (
    <section
      id="services"
      className="bg-gradient-to-b from-slate-50 to-white py-14 sm:py-16 lg:py-20"
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">
              Services overview
            </p>
            <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
              {title}
            </h2>
            <p className="mt-2 max-w-2xl text-slate-700">
              {description}
            </p>
          </div>
          <div className="flex items-center gap-3">
            {limit ? (
              <Link
                href="/services"
                className="inline-flex items-center justify-center rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-800 transition hover:-translate-y-0.5 hover:border-emerald-200 hover:text-emerald-700"
              >
                View all services
              </Link>
            ) : null}
            {!hideCta ? (
              <a
                href="/booking/baby-care"
                className="inline-flex items-center justify-center rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-slate-300 transition hover:-translate-y-0.5 hover:bg-slate-800"
              >
                Book a caregiver
              </a>
            ) : null}
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {items.map((service) => (
            <article
              key={service.id}
              className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-lg transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="absolute -left-8 -top-8 h-24 w-24 rounded-full bg-emerald-100 opacity-50 blur-3xl transition duration-700 group-hover:opacity-70" />
              <div className="relative space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-xl font-semibold text-slate-900">
                    {service.name}
                  </h3>
                  <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-100">
                    ৳{service.hourlyRate}/hr
                  </span>
                </div>
                <p className="text-sm leading-relaxed text-slate-700">
                  {service.summary}
                </p>
                <ul className="space-y-2 text-sm text-emerald-800">
                  {service.features.slice(0, 3).map((perk) => (
                    <li
                      key={perk}
                      className="flex items-start gap-2 rounded-full bg-emerald-50 px-3 py-2 ring-1 ring-emerald-100"
                    >
                      <span className="mt-0.5 h-1.5 w-1.5 rounded-full bg-emerald-600" />
                      <span>{perk}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/service/${service.id}`}
                  className="inline-flex items-center justify-center rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-800 transition hover:-translate-y-0.5 hover:border-emerald-200 hover:text-emerald-700"
                >
                  View details
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
