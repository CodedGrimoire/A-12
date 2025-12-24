"use client";

import { FormEvent, use, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import PrivateRoute from "@/app/components/private-route";
import { useAuth } from "@/app/providers/auth-context";
import toast from "react-hot-toast";

type Props = {
  params: Promise<{ service_id: string }>;
};

export default function BookingPage({ params }: Props) {
  const { service_id } = use(params);
  const [service, setService] = useState<any | null>(null);
  const [loadingService, setLoadingService] = useState(true);
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
    ? (() => {
        const rate =
          durationUnit === "hours" ? service.hourlyRate : service.dailyRate;
        const subtotal = rate * durationValue;
        const platformFee = Math.max(5, subtotal * 0.05);
        return Math.round((subtotal + platformFee) * 100) / 100;
      })()
    : 0;

  useEffect(() => {
    let mounted = true;
    setLoadingService(true);
    fetch(`/api/services/${service_id}`)
      .then((res) => res.json())
      .then((data) => {
        if (mounted) setService(data.service);
      })
      .catch(() => {
        if (mounted) setService(null);
      })
      .finally(() => mounted && setLoadingService(false));
    return () => {
      mounted = false;
    };
  }, [service_id]);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!service || !user) return;
    if (!location.division || !location.district || !location.city || !location.area) {
      const msg = "Please complete the location fields.";
      setError(msg);
      toast.error(msg);
      return;
    }
    if (durationValue < 1) {
      const msg = "Duration must be at least 1.";
      setError(msg);
      toast.error(msg);
      return;
    }
    setSaving(true);
    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userUid: user.uid,
          userEmail: user.email,
          serviceId: service.id,
          duration: { value: durationValue, unit: durationUnit },
          location,
        }),
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Could not save booking.");
      }
      const data = await response.json();
      const record = data.booking;
      toast.success("Booking saved as Pending. View it in My Bookings.");
      void fetch("/api/send-invoice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: user.email,
          serviceName: record.serviceName,
          duration: `${record.duration.value} ${record.duration.unit}`,
          totalCost: record.totalCost,
          location: `${record.location.city}, ${record.location.district}, ${record.location.division} (${record.location.area})`,
          subject: `Invoice for ${record.serviceName}`,
        }),
      }).catch(() => {
        // fire-and-forget; errors handled silently
      });
      router.push("/my-bookings");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Could not save booking.";
      setError(msg);
      toast.error(msg);
    } finally {
      setSaving(false);
    }
  };

  if (!service && !loadingService) {
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

  if (loadingService) {
    return (
      <PrivateRoute>
        <div className="flex min-h-screen items-center justify-center bg-[#f6fbff] px-6">
          <div className="max-w-lg rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-lg">
            <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
              Booking
            </p>
            <h1 className="mt-2 text-2xl font-bold text-slate-900">
              Loading service…
            </h1>
            <p className="mt-2 text-slate-600">
              Please wait while we load the service details.
            </p>
          </div>
        </div>
      </PrivateRoute>
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
              <p className="text-sm text-slate-600">Pulled from Care.xyz services.</p>
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
