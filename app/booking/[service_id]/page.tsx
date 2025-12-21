"use client";

import { FormEvent, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import PrivateRoute from "@/app/components/private-route";
import { useAuth } from "@/app/providers/auth-context";
import { saveBooking } from "@/lib/bookings";
import { estimateCost, getServiceById } from "@/lib/zapshift";

type Props = {
  params: { service_id: string };
};

export default function BookingPage({ params }: Props) {
  const service = useMemo(
    () => getServiceById(params.service_id),
    [params.service_id],
  );
  const { user } = useAuth();
  const router = useRouter();

  const [durationUnit, setDurationUnit] = useState<"hours" | "days">("hours");
  const [durationValue, setDurationValue] = useState(4);
  const [location, setLocation] = useState({
    division: "",
    district: "",
    city: "",
    area: "",
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const totalCost = service
    ? estimateCost(service, { value: durationValue, unit: durationUnit })
    : 0;

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!service || !user) return;
    if (!location.division || !location.district || !location.city || !location.area) {
      setError("Please complete the location fields.");
      return;
    }
    if (durationValue < 1) {
      setError("Duration must be at least 1.");
      return;
    }
    setSaving(true);
    try {
      saveBooking({
        serviceId: service.id,
        serviceName: service.name,
        duration: { value: durationValue, unit: durationUnit },
        location,
        totalCost,
        status: "Pending",
        userEmail: user.email,
      });
      router.push("/my-bookings");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save booking.");
    } finally {
      setSaving(false);
    }
  };

  if (!service) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f6fbff] px-6">
        <div className="max-w-lg rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-lg">
          <p className="text-xl font-semibold text-slate-900">
            Service not found
          </p>
          <p className="mt-2 text-slate-600">
            We could not find this service from the Zapshift resources.
          </p>
          <Link
            href="/"
            className="mt-4 inline-flex items-center justify-center rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
          >
            Go home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <PrivateRoute>
      <div className="min-h-screen bg-[#f6fbff] px-6 py-12">
        <div className="mx-auto max-w-5xl space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">
                Booking
              </p>
              <h1 className="text-3xl font-bold text-slate-900">
                {service.name}
              </h1>
              <p className="text-sm text-slate-600">
                Data pulled from Zapshift resources.
              </p>
            </div>
            <Link
              href={`/service/${service.id}`}
              className="text-sm font-semibold text-emerald-700 hover:text-emerald-800"
            >
              View service details
            </Link>
          </div>

          <form
            onSubmit={onSubmit}
            className="grid gap-8 rounded-3xl border border-slate-200 bg-white p-8 shadow-xl lg:grid-cols-[1.1fr_1fr]"
          >
            <div className="space-y-6">
              <SectionTitle title="1. Select duration" />
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="flex flex-col gap-2 text-sm font-medium text-slate-800">
                  Duration
                  <input
                    type="number"
                    min={1}
                    value={durationValue}
                    onChange={(e) =>
                      setDurationValue(Math.max(1, Number(e.target.value)))
                    }
                    className="rounded-xl border border-slate-200 px-3 py-2 text-base text-slate-900 shadow-sm focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-100"
                    required
                  />
                </label>
                <label className="flex flex-col gap-2 text-sm font-medium text-slate-800">
                  Unit
                  <select
                    value={durationUnit}
                    onChange={(e) =>
                      setDurationUnit(e.target.value as "hours" | "days")
                    }
                    className="rounded-xl border border-slate-200 px-3 py-2 text-base text-slate-900 shadow-sm focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-100"
                  >
                    <option value="hours">Hours</option>
                    <option value="days">Days</option>
                  </select>
                </label>
              </div>

              <SectionTitle title="2. Location" />
              <div className="grid gap-4 sm:grid-cols-2">
                {(["division", "district", "city", "area"] as const).map(
                  (field) => (
                    <label
                      key={field}
                      className="flex flex-col gap-2 text-sm font-medium text-slate-800"
                    >
                      {field.charAt(0).toUpperCase() + field.slice(1)}
                      <input
                        type="text"
                        value={location[field]}
                        onChange={(e) =>
                          setLocation((prev) => ({
                            ...prev,
                            [field]: e.target.value,
                          }))
                        }
                        className="rounded-xl border border-slate-200 px-3 py-2 text-base text-slate-900 shadow-sm focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-100"
                        required
                      />
                    </label>
                  ),
                )}
              </div>
            </div>

            <div className="flex flex-col gap-4 rounded-2xl border border-emerald-100 bg-gradient-to-b from-emerald-50 via-white to-sky-50 p-6 shadow-inner">
              <SectionTitle title="3. Review cost" />
              <div className="space-y-2 text-sm text-slate-700">
                <p>
                  Rate:{" "}
                  <strong className="text-slate-900">
                    ৳
                    {durationUnit === "hours"
                      ? service.hourlyRate
                      : service.dailyRate}{" "}
                    / {durationUnit === "hours" ? "hour" : "day"}
                  </strong>
                </p>
                <p>
                  Duration:{" "}
                  <strong className="text-slate-900">
                    {durationValue} {durationUnit}
                  </strong>
                </p>
              </div>
              <div className="flex items-center justify-between rounded-2xl bg-white px-4 py-3 text-lg font-semibold text-slate-900 shadow">
                <span>Total</span>
                <span className="text-emerald-700">৳{totalCost}</span>
              </div>
              <p className="text-xs text-slate-600">
                A small platform fee is included to cover verification and live
                updates.
              </p>
              {error ? (
                <div className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                  {error}
                </div>
              ) : null}
              <button
                type="submit"
                disabled={saving}
                className="mt-2 inline-flex items-center justify-center rounded-full bg-emerald-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-200 transition hover:-translate-y-0.5 hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {saving ? "Saving..." : "Confirm booking (Pending)"}
              </button>
              <p className="text-xs text-slate-600">
                After confirming, your booking will be saved with status{" "}
                <strong>Pending</strong>. Our team will reach out to confirm
                availability.
              </p>
            </div>
          </form>
        </div>
      </div>
    </PrivateRoute>
  );
}

function SectionTitle({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-slate-700">
      <span className="h-6 w-0.5 rounded-full bg-emerald-500" />
      {title}
    </div>
  );
}
