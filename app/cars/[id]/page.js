"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Container from "../../components/Container";
import SectionHeader from "../../components/SectionHeader";
import LoadingSpinner from "../../components/LoadingSpinner";
import { apiFetch } from "../../lib/api";
import { useAuth } from "../../providers/AuthProvider";

export default function CarDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [bookingError, setBookingError] = useState("");
  const [bookingSuccess, setBookingSuccess] = useState("");
  const [formData, setFormData] = useState({ driverNeeded: "no", note: "" });

  useEffect(() => {
    let active = true;
    const loadCar = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await apiFetch(`/cars/${id}`);
        if (active) setCar(data?.car || null);
      } catch (err) {
        if (active) setError(err.message || "Unable to load this car.");
      } finally {
        if (active) setLoading(false);
      }
    };

    if (id) loadCar();
    return () => {
      active = false;
    };
  }, [id]);

  const handleBook = async (event) => {
    event.preventDefault();
    if (!user) {
      router.push("/login");
      return;
    }
    setBookingError("");
    setBookingSuccess("");
    try {
      await apiFetch("/bookings", {
        method: "POST",
        body: JSON.stringify({
          carId: id,
          driverNeeded: formData.driverNeeded === "yes",
          note: formData.note,
        }),
      });
      setBookingSuccess("Booking confirmed. Check My Bookings for details.");
    } catch (err) {
      setBookingError(err.message || "Unable to complete booking.");
    }
  };

  if (loading) {
    return <LoadingSpinner label="Loading car" />;
  }

  if (!car) {
    return (
      <Container className="py-16">
        <div className="lux-card rounded-2xl p-6">
          <p className="text-sm text-black/70">{error || "Car not found."}</p>
        </div>
      </Container>
    );
  }

  return (
    <section className="py-16">
      <Container className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6">
          <SectionHeader
            title={car.name}
            subtitle={`${car.type} - ${car.seats} seats - ${car.location}`}
          />
          <div className="lux-card overflow-hidden rounded-3xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={car.imageUrl} alt={car.name} className="h-96 w-full object-cover" />
          </div>
          <p className="text-sm text-black/70">{car.description}</p>
          <div className="flex flex-wrap gap-4 text-sm text-black/70">
            <div className="soft-border rounded-full px-4 py-2">Pickup: {car.location}</div>
            <div className="soft-border rounded-full px-4 py-2">Availability: {car.available ? "Available" : "Unavailable"}</div>
            <div className="soft-border rounded-full px-4 py-2">Daily Rate: ${car.price}</div>
          </div>
        </div>

        <div className="lux-card rounded-3xl p-6">
          <p className="section-title text-2xl font-semibold text-black">Book this car</p>
          <p className="mt-2 text-sm text-black/70">Reserve your vehicle in minutes. We will confirm availability right away.</p>

          <form className="mt-6 space-y-4" onSubmit={handleBook}>
            <div>
              <label className="text-sm font-medium">Driver Needed</label>
              <select
                className="select select-bordered mt-2 w-full"
                value={formData.driverNeeded}
                onChange={(event) => setFormData({ ...formData, driverNeeded: event.target.value })}
              >
                <option value="no">No</option>
                <option value="yes">Yes</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium">Special Note</label>
              <textarea
                className="textarea textarea-bordered mt-2 w-full"
                rows={4}
                placeholder="Any pickup instructions or timing requests"
                value={formData.note}
                onChange={(event) => setFormData({ ...formData, note: event.target.value })}
              />
            </div>
            {bookingError ? <p className="text-sm text-error">{bookingError}</p> : null}
            {bookingSuccess ? <p className="text-sm text-success">{bookingSuccess}</p> : null}
            <button type="submit" className="btn btn-drive w-full rounded-full">
              Book Now
            </button>
            {!user ? (
              <p className="text-xs text-black/60">Login is required to confirm bookings.</p>
            ) : null}
          </form>
        </div>
      </Container>
    </section>
  );
}
