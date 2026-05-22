"use client";

import { useEffect, useState } from "react";
import Container from "../components/Container";
import SectionHeader from "../components/SectionHeader";
import PrivateRoute from "../components/PrivateRoute";
import LoadingSpinner from "../components/LoadingSpinner";
import { apiFetch } from "../lib/api";

function formatDate(value) {
  try {
    return new Date(value).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  } catch {
    return "--";
  }
}

export default function MyBookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    const loadBookings = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await apiFetch("/my-bookings");
        if (active) setBookings(data?.bookings || []);
      } catch (err) {
        if (active) setError(err.message || "Unable to load bookings.");
      } finally {
        if (active) setLoading(false);
      }
    };

    loadBookings();
    return () => {
      active = false;
    };
  }, []);

  return (
    <PrivateRoute>
      <section className="py-16">
        <Container className="space-y-8">
          <SectionHeader
            title="My Bookings"
            subtitle="Track upcoming trips, review pricing, and confirm booking details."
          />
          {loading ? <LoadingSpinner label="Loading bookings" /> : null}
          {error ? <p className="text-sm text-error">{error}</p> : null}
          {!loading && bookings.length === 0 ? (
            <div className="lux-card rounded-2xl p-6 text-sm text-black/70">
              No bookings yet. Explore cars and reserve your first ride.
            </div>
          ) : null}
          <div className="grid gap-6 md:grid-cols-2">
            {bookings.map((booking) => (
              <div key={booking.id || booking._id} className="lux-card rounded-2xl p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-black/60">{booking.carType}</p>
                    <p className="section-title text-xl font-semibold text-black">{booking.carName}</p>
                    <p className="mt-1 text-sm text-black/70">Booking Date: {formatDate(booking.createdAt)}</p>
                  </div>
                  <p className="text-lg font-semibold text-black">${booking.totalPrice}</p>
                </div>
                <div className="mt-4 flex flex-wrap gap-3 text-xs text-black/60">
                  <span className="soft-border rounded-full px-3 py-1">Driver: {booking.driverNeeded ? "Yes" : "No"}</span>
                  <span className="soft-border rounded-full px-3 py-1">Pickup: {booking.pickupLocation}</span>
                </div>
                {booking.note ? <p className="mt-3 text-sm text-black/70">Note: {booking.note}</p> : null}
              </div>
            ))}
          </div>
        </Container>
      </section>
    </PrivateRoute>
  );
}
