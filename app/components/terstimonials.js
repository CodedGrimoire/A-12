const stories = [
  {
    name: "Nusrat, Dhaka",
    role: "Working parent",
    quote:
      "Booking a trusted sitter took minutes. She followed our bedtime routine perfectly and shared photo updates throughout the evening.",
    stat: "4 nights / week",
  },
  {
    name: "Farid, Chattogram",
    role: "Son & caregiver",
    quote:
      "The elderly care team treats my mother with patience and dignity. I get timely notes on her meals, meds, and mobility.",
    stat: "Daily check-ins",
  },
];

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="mx-auto max-w-6xl px-6 py-14 sm:py-16 lg:py-20"
    >
      <div className="mb-8 flex flex-col gap-2">
        <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">
          Testimonials & success metrics
        </p>
        <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
          Families feel supported and informed.
        </h2>
        <p className="max-w-2xl text-slate-700">
          Real stories and measurable outcomes from bookings on Care.xyz.
        </p>
      </div>
      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <div className="grid gap-4 md:grid-cols-2">
          {stories.map((story) => (
            <figure
              key={story.name}
              className="flex h-full flex-col justify-between rounded-3xl border border-slate-200 bg-white p-6 shadow-lg"
            >
              <blockquote className="text-base leading-relaxed text-slate-800">
                “{story.quote}”
              </blockquote>
              <figcaption className="mt-4 flex items-center justify-between text-sm font-semibold text-slate-900">
                <div>
                  <div>{story.name}</div>
                  <div className="text-slate-600">{story.role}</div>
                </div>
                <div className="rounded-full bg-emerald-50 px-3 py-1 text-xs text-emerald-700 ring-1 ring-emerald-100">
                  {story.stat}
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
        <div className="rounded-3xl border border-emerald-100 bg-gradient-to-br from-emerald-50 via-white to-sky-50 p-6 shadow-inner">
          <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
            At a glance
          </p>
          <dl className="mt-4 space-y-4 text-slate-900">
            <Metric label="Avg. caregiver rating" value="4.9 / 5" />
            <Metric label="Repeat bookings" value="72% families return" />
            <Metric label="Emergency coverage" value="Under 60 mins in city" />
            <Metric label="Languages supported" value="Bengali, English, Hindi" />
          </dl>
        </div>
      </div>
    </section>
  );
}

function Metric({ label, value }) {
  return (
    <div className="flex items-center justify-between rounded-2xl bg-white px-4 py-3 text-sm shadow">
      <dt className="text-slate-700">{label}</dt>
      <dd className="font-semibold text-emerald-700">{value}</dd>
    </div>
  );
}
