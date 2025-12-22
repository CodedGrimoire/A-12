"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "../providers/auth-context";
import toast from "react-hot-toast";

export default function LoginPage() {
  const { user, loading, login, loginWithGoogle } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/my-bookings";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!loading && user) {
      router.replace(redirect);
    }
  }, [loading, user, redirect, router]);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const logged = await login(email, password);
      await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          uid: logged.uid,
          email: logged.email,
          name: logged.name,
          contact: logged.contact,
          nid: logged.nid,
          photoUrl: logged.photoUrl,
        }),
      }).catch(() => {});
      toast.success("Logged in");
      router.replace(redirect);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Unable to login.";
      setError(msg);
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f6fbff] px-6 py-12">
      <div className="w-full max-w-lg space-y-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-xl">
        <div className="space-y-2 text-center">
          <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">
            Welcome back
          </p>
          <h1 className="text-3xl font-bold text-slate-900">Log in</h1>
          <p className="text-sm text-slate-600">
            Access your Care.xyz bookings and continue your request.
          </p>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <label className="flex flex-col gap-2 text-sm font-medium text-slate-800">
            Email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="rounded-xl border border-slate-200 px-3 py-2 text-base text-slate-900 shadow-sm focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-100"
            />
          </label>
          <label className="flex flex-col gap-2 text-sm font-medium text-slate-800">
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="rounded-xl border border-slate-200 px-3 py-2 text-base text-slate-900 shadow-sm focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-100"
            />
          </label>
          {error ? (
            <div className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
              {error}
            </div>
          ) : null}
          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-full bg-emerald-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-200 transition hover:-translate-y-0.5 hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {submitting ? "Signing in..." : "Login"}
          </button>
        </form>

        <button
          type="button"
          onClick={async () => {
            setSubmitting(true);
            setError(null);
            try {
              await loginWithGoogle();
              router.replace(redirect);
            } catch (err) {
              const msg =
                err instanceof Error ? err.message : "Unable to login with Google.";
              setError(msg);
              toast.error(msg);
            } finally {
              setSubmitting(false);
            }
          }}
          className="flex w-full items-center justify-center gap-2 rounded-full border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-800 shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-200 hover:text-emerald-700 disabled:cursor-not-allowed disabled:opacity-70"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            className="h-4 w-4"
          >
            <path
              fill="#4285F4"
              d="M23.52 12.273c0-.851-.076-1.67-.218-2.455H12v4.64h6.484c-.28 1.5-1.123 2.773-2.39 3.623v3.01h3.87c2.266-2.086 3.556-5.156 3.556-8.818Z"
            />
            <path
              fill="#34A853"
              d="M12 24c3.24 0 5.956-1.073 7.941-2.909l-3.87-3.01c-1.073.72-2.449 1.148-4.07 1.148-3.131 0-5.784-2.114-6.734-4.947H1.258v3.11C3.231 21.408 7.302 24 12 24Z"
            />
            <path
              fill="#FBBC05"
              d="M5.266 14.282A7.213 7.213 0 0 1 4.87 12c0-.792.136-1.563.396-2.282V6.608H1.258A11.996 11.996 0 0 0 0 12c0 1.938.464 3.77 1.258 5.392l4.008-3.11Z"
            />
            <path
              fill="#EA4335"
              d="M12 4.75c1.764 0 3.348.607 4.597 1.798l3.448-3.449C17.952 1.13 15.237 0 12 0 7.302 0 3.231 2.592 1.258 6.608l4.008 3.11C6.216 6.864 8.869 4.75 12 4.75Z"
            />
          </svg>
          Continue with Google
        </button>

        <p className="text-center text-sm text-slate-700">
          New here?{" "}
          <Link
            href={`/register?redirect=${encodeURIComponent(redirect)}`}
            className="font-semibold text-emerald-700 hover:text-emerald-800"
          >
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}
