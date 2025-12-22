"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "../providers/auth-context";
import toast from "react-hot-toast";

export default function RegisterPage() {
  const { user, loading, register } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/booking/baby-care";

  const [form, setForm] = useState({
    nid: "",
    name: "",
    email: "",
    contact: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!loading && user) {
      router.replace(redirect);
    }
  }, [loading, user, redirect, router]);

  const validatePassword = (value: string) => {
    const hasLength = value.length >= 6;
    const hasUpper = /[A-Z]/.test(value);
    const hasLower = /[a-z]/.test(value);
    return hasLength && hasUpper && hasLower;
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    if (!validatePassword(form.password)) {
      const msg =
        "Password must be 6+ characters with at least 1 uppercase and 1 lowercase letter.";
      setError(msg);
      toast.error(msg);
      return;
    }
    setSubmitting(true);
    try {
      await register(form);
      toast.success("Account created and signed in");
      router.replace(redirect);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Unable to register.";
      setError(msg);
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f6fbff] px-6 py-12">
      <div className="w-full max-w-2xl space-y-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-xl">
        <div className="space-y-2 text-center">
          <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">
            Create account
          </p>
          <h1 className="text-3xl font-bold text-slate-900">
            Register for Care.xyz
          </h1>
          <p className="text-sm text-slate-600">
            Provide your details to book services for your family.
          </p>
        </div>

        <form onSubmit={onSubmit} className="grid gap-4 sm:grid-cols-2">
          {(
            [
              ["nid", "NID No"],
              ["name", "Full Name"],
              ["email", "Email"],
              ["contact", "Contact Number"],
            ] as const
          ).map(([field, label]) => (
            <label
              key={field}
              className="flex flex-col gap-2 text-sm font-medium text-slate-800"
            >
              {label}
              <input
                type={field === "email" ? "email" : "text"}
                value={form[field]}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, [field]: e.target.value }))
                }
                required
                className="rounded-xl border border-slate-200 px-3 py-2 text-base text-slate-900 shadow-sm focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-100"
              />
            </label>
          ))}
          <label className="flex flex-col gap-2 text-sm font-medium text-slate-800 sm:col-span-2">
            Password
            <input
              type="password"
              value={form.password}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, password: e.target.value }))
              }
              required
              className="rounded-xl border border-slate-200 px-3 py-2 text-base text-slate-900 shadow-sm focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-100"
            />
            <span className="text-xs text-slate-600">
              Must be 6+ characters with at least 1 uppercase and 1 lowercase
              letter.
            </span>
          </label>
          {error ? (
            <div className="sm:col-span-2 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
              {error}
            </div>
          ) : null}
          <button
            type="submit"
            disabled={submitting}
            className="sm:col-span-2 rounded-full bg-emerald-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-200 transition hover:-translate-y-0.5 hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {submitting ? "Creating account..." : "Register & continue"}
          </button>
        </form>

        <p className="text-center text-sm text-slate-700">
          Already have an account?{" "}
          <Link
            href={`/login?redirect=${encodeURIComponent(redirect)}`}
            className="font-semibold text-emerald-700 hover:text-emerald-800"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
