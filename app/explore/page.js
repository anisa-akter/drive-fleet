"use client";

import { useEffect, useMemo, useState } from "react";
import Container from "../components/Container";
import SectionHeader from "../components/SectionHeader";
import CarCard from "../components/CarCard";
import LoadingSpinner from "../components/LoadingSpinner";
import { apiFetch, buildQuery } from "../lib/api";

const carTypes = ["SUV", "Sedan", "Hatchback", "Luxury", "Coupe", "Hybrid"];

export default function ExplorePage() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [type, setType] = useState("");

  useEffect(() => {
    let active = true;
    const loadCars = async () => {
      setLoading(true);
      setError("");
      try {
        const query = buildQuery({ search, type });
        const data = await apiFetch(`/cars${query}`);
        if (active) {
          setCars(data?.cars || []);
        }
      } catch (err) {
        if (active) {
          setError(err.message || "Unable to fetch cars right now.");
          setCars([]);
        }
      } finally {
        if (active) setLoading(false);
      }
    };

    loadCars();
    return () => {
      active = false;
    };
  }, [search, type]);

  const filteredCars = useMemo(() => cars, [cars]);

  return (
    <section className="py-16">
      <Container className="space-y-8">
        <SectionHeader
          title="Explore Cars"
          subtitle="Search by name or refine by type to find the perfect match for your route."
        />

        <div className="flex flex-col gap-4 rounded-2xl bg-white/80 p-4 shadow-sm md:flex-row md:items-center">
          <input
            type="text"
            placeholder="Search by car name"
            className="input input-bordered w-full md:max-w-sm"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
          <select
            className="select select-bordered w-full md:max-w-xs"
            value={type}
            onChange={(event) => setType(event.target.value)}
          >
            <option value="">All Types</option>
            {carTypes.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        {loading ? <LoadingSpinner label="Loading cars" /> : null}
        {error ? <p className="text-sm text-error">{error}</p> : null}
        {!loading && !error && filteredCars.length === 0 ? (
          <div className="lux-card rounded-2xl p-6 text-sm text-black/70">
            No cars found yet. Try another search or add a new car listing.
          </div>
        ) : null}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredCars.map((car) => (
            <CarCard key={car.id || car._id} car={car} />
          ))}
        </div>
      </Container>
    </section>
  );
}
