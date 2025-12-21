const services = [
  {
    name: "Baby Care",
    description:
      "Playful engagement, feeding, naps, and bedtime routines handled with patience and empathy.",
    perks: ["Infant-safe profiles", "Photo & note updates", "Routine tracking"],
  },
  {
    name: "Elderly Service",
    description:
      "Respectful companionship, medication reminders, mobility support, and daily comfort care.",
    perks: ["Fall-safe awareness", "Meal prep & hydration", "Family check-ins"],
  },
  {
    name: "Sick People Service",
    description:
      "Gentle at-home support for recovery or chronic needs with hygiene, rest, and nutrition assistance.",
    perks: ["Care plans with nurses", "Sanitized equipment", "Flexible hours"],
  },
];

export default function Services() {
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
              Choose the care that fits your family.
            </h2>
            <p className="mt-2 max-w-2xl text-slate-700">
              Baby sitting, elderly care, or special care at home—book for the
              hours you need with vetted professionals you can trust.
            </p>
          </div>
          <a
            href="#book"
            className="inline-flex items-center justify-center rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-slate-300 transition hover:-translate-y-0.5 hover:bg-slate-800"
          >
            Book a caregiver
          </a>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {services.map((service) => (
            <article
              key={service.name}
              className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-lg transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="absolute -left-8 -top-8 h-24 w-24 rounded-full bg-emerald-100 opacity-50 blur-3xl transition duration-700 group-hover:opacity-70" />
              <div className="relative space-y-3">
                <h3 className="text-xl font-semibold text-slate-900">
                  {service.name}
                </h3>
                <p className="text-sm leading-relaxed text-slate-700">
                  {service.description}
                </p>
                <ul className="space-y-2 text-sm text-emerald-800">
                  {service.perks.map((perk) => (
                    <li
                      key={perk}
                      className="flex items-start gap-2 rounded-full bg-emerald-50 px-3 py-2 ring-1 ring-emerald-100"
                    >
                      <span className="mt-0.5 h-1.5 w-1.5 rounded-full bg-emerald-600" />
                      <span>{perk}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
