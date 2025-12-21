import { Booking, createBookingRecord } from "./zapshift";

const BOOKINGS_KEY = "carexyz_bookings";

export function loadBookings(userEmail?: string): Booking[] {
  const all: Booking[] = JSON.parse(localStorage.getItem(BOOKINGS_KEY) || "[]");
  if (!userEmail) return all;
  return all.filter(
    (booking) => booking.userEmail.toLowerCase() === userEmail.toLowerCase(),
  );
}

export function saveBooking(booking: Omit<Booking, "id" | "createdAt">) {
  const record = createBookingRecord(booking);
  const existing: Booking[] = JSON.parse(
    localStorage.getItem(BOOKINGS_KEY) || "[]",
  );
  const next = [...existing, record];
  localStorage.setItem(BOOKINGS_KEY, JSON.stringify(next));
  return record;
}

export function cancelBooking(id: string) {
  const existing: Booking[] = JSON.parse(
    localStorage.getItem(BOOKINGS_KEY) || "[]",
  );
  const next = existing.map((booking) =>
    booking.id === id ? { ...booking, status: "Cancelled" as const } : booking,
  );
  localStorage.setItem(BOOKINGS_KEY, JSON.stringify(next));
}
