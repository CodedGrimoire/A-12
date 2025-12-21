export default function About() {
  return (
    <section
      id="about"
      className="mx-auto max-w-6xl px-6 py-14 sm:py-16 lg:py-20"
    >
      <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-center">
        <div className="space-y-4">
          <p className="inline-flex rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-700 ring-1 ring-emerald-100">
            Our mission
          </p>
          <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
            Caregiving made easy, secure, and accessible for every household.
          </h2>
          <p className="text-lg leading-relaxed text-slate-700">
            Care.xyz (Care.IO) helps families quickly book trusted caregivers
            for babysitting, elderly support, or recovery care at home. Each
            profile is verified, schedules are flexible, and communication stays
            transparent from booking to follow-up.
          </p>
          <div className="rounded-2xl border border-slate-200 bg-white p-4 text-slate-800 shadow-sm">
            <p className="font-semibold text-emerald-700">বাংলা সারাংশ</p>
            <p className="text-sm leading-relaxed">
              Care.IO একটি ওয়েব অ্যাপ্লিকেশন যা ব্যবহারকারীদের শিশু, বৃদ্ধ বা
              অসুস্থ ব্যক্তির জন্য নির্ভরযোগ্য ও trusted care service বুক করতে
              সাহায্য করে। ব্যবহারকারী সহজেই প্রয়োজনীয় সময়কাল ও অবস্থান অনুযায়ী
              সার্ভিস বুক করতে পারে।
            </p>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <KeyPoint title="Verified caregivers" detail="ID checks, background review, and community ratings keep every visit safe." />
          <KeyPoint title="Flexible scheduling" detail="One-time sits, recurring visits, or overnight support tailored to your routine." />
          <KeyPoint title="Family-first approach" detail="Care plans capture routines, preferences, medications, and cultural needs." />
          <KeyPoint title="Live updates" detail="Stay connected with visit notes, checklists, and secure messaging." />
        </div>
      </div>
    </section>
  );
}

function KeyPoint({ title, detail }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-white via-slate-50 to-emerald-50/50 p-5 shadow-sm">
      <h3 className="text-base font-semibold text-slate-900">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-700">{detail}</p>
    </div>
  );
}
