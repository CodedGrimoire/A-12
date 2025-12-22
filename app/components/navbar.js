"use client";

import Link from "next/link";
import { useAuth } from "../providers/auth-context";

export default function Navbar() {
  const { user, logout } = useAuth();
  const links = [
    { href: "#about", label: "About", external: false },
    { href: "#services", label: "Services", external: false },
    { href: "/my-bookings", label: "My Bookings", external: true },
  ];

  return (
    <header className="sticky top-0 z-30 backdrop-blur bg-white/80 border-b border-slate-200">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2 text-slate-900">
          <div className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-semibold text-emerald-700 shadow-sm">
            Care.xyz
          </div>
          <span className="text-lg font-semibold tracking-tight">
            Baby & Elderly Care
          </span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium text-slate-700 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-emerald-700"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          {user ? (
            <>
              <div className="flex items-center gap-3 rounded-full border border-slate-200 bg-white px-3 py-2 shadow-sm">
                <Avatar name={user.name || user.email} photoUrl={user.photoUrl} />
                <div className="text-left">
                  <div className="text-sm font-semibold text-slate-900 line-clamp-1">
                    {user.name || user.email}
                  </div>
                  <div className="text-[12px] text-slate-500 line-clamp-1">
                    Signed in
                  </div>
                </div>
              </div>
              <button
                onClick={logout}
                className="rounded-full border border-slate-200 bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-slate-800"
              >
                Log out
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="hidden rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-800 transition hover:-translate-y-0.5 hover:border-emerald-200 hover:text-emerald-700 sm:inline-flex"
              >
                Sign in
              </Link>
              <Link
                href="/register"
                className="hidden rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-800 shadow-sm transition hover:-translate-y-0.5 hover:bg-emerald-100 sm:inline-flex"
              >
                Register
              </Link>
              <Link
                href="/booking/baby-care"
                className="rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-emerald-200 transition hover:-translate-y-0.5 hover:bg-emerald-700"
              >
                Book Care
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

function Avatar({ name, photoUrl }) {
  if (photoUrl) {
    return (
      <span className="inline-flex h-9 w-9 overflow-hidden rounded-full border border-slate-200 bg-slate-100">
        <img
          src={photoUrl}
          alt={name}
          className="h-full w-full object-cover"
        />
      </span>
    );
  }
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  return (
    <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-emerald-100 text-sm font-semibold text-emerald-700">
      {initials}
    </span>
  );
}
