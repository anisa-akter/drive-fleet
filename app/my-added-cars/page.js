"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Container from "../components/Container";
import SectionHeader from "../components/SectionHeader";
import PrivateRoute from "../components/PrivateRoute";
import LoadingSpinner from "../components/LoadingSpinner";
import { apiFetch } from "../lib/api";

export default function MyAddedCarsPage() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedCar, setSelectedCar] = useState(null);
  const [actionMessage, setActionMessage] = useState("");

  const loadCars = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await apiFetch("/my-cars");
      setCars(data?.cars || []);
    } catch (err) {
      setError(err.message || "Unable to load your cars.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCars();
  }, []);

  const handleDelete = async () => {
    if (!selectedCar) return;
    const carId = selectedCar.id || selectedCar._id;
    setActionMessage("");
    try {
      await apiFetch(`/delete-car/${carId}`, { method: "DELETE" });
      setActionMessage("Car removed successfully.");
      setSelectedCar(null);
      loadCars();
    } catch (err) {
      setActionMessage(err.message || "Unable to delete the listing.");
    }
  };

  return (
    <PrivateRoute>
      <section className="py-16">
        <Container className="space-y-8">
          <SectionHeader
            title="My Added Cars"
            subtitle="Manage your listings, update pricing, and control availability."
          />
          {loading ? <LoadingSpinner label="Loading listings" /> : null}
          {error ? <p className="text-sm text-error">{error}</p> : null}
          {!loading && cars.length === 0 ? (
            <div className="lux-card rounded-2xl p-6 text-sm text-black/70">
              You have not added any cars yet. Add your first car to start earning.
            </div>
          ) : null}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {cars.map((car) => {
              const carId = car.id || car._id;
              return (
              <div key={carId} className="lux-card flex h-full flex-col rounded-2xl p-5">
                <div className="h-40 overflow-hidden rounded-xl">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={car.imageUrl} alt={car.name} className="h-full w-full object-cover" />
                </div>
                <div className="mt-4 space-y-2">
                  <p className="text-xs uppercase tracking-[0.2em] text-black/60">{car.type}</p>
                  <h3 className="section-title text-xl font-semibold text-black">{car.name}</h3>
                  <p className="text-sm text-black/70">${car.price}/day - {car.location}</p>
                </div>
                <div className="mt-4 flex gap-3">
                  <Link href={`/update-car/${carId}`} className="btn btn-outline-drive btn-sm rounded-full">
                    Update
                  </Link>
                  <button
                    type="button"
                    className="btn btn-drive btn-sm rounded-full"
                    onClick={() => setSelectedCar(car)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
            })}
          </div>

          {selectedCar ? (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
              <div className="lux-card w-full max-w-md rounded-2xl p-6">
                <h3 className="section-title text-xl font-semibold text-black">Delete listing?</h3>
                <p className="mt-2 text-sm text-black/70">
                  This will permanently remove {selectedCar.name} from DriveFleet.
                </p>
                {actionMessage ? <p className="mt-3 text-sm text-error">{actionMessage}</p> : null}
                <div className="mt-6 flex gap-3">
                  <button type="button" className="btn btn-outline-drive rounded-full" onClick={() => setSelectedCar(null)}>
                    Cancel
                  </button>
                  <button type="button" className="btn btn-drive rounded-full" onClick={handleDelete}>
                    Confirm Delete
                  </button>
                </div>
              </div>
            </div>
          ) : null}
        </Container>
      </section>
    </PrivateRoute>
  );
}
