"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Container from "./components/Container";
import SectionHeader from "./components/SectionHeader";
import CarCard from "./components/CarCard";
import LoadingSpinner from "./components/LoadingSpinner";
import { apiFetch } from "./lib/api";

const fallbackCars = [
  {
    id: "fleet-1",
    name: "Aurora LX",
    type: "Luxury",
    seats: 5,
    price: 180,
    location: "Gulshan, Dhaka",
    imageUrl:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "fleet-2",
    name: "Eclipse Sport",
    type: "SUV",
    seats: 7,
    price: 140,
    location: "Banani, Dhaka",
    imageUrl:
      "https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "fleet-3",
    name: "Crescent Prime",
    type: "Sedan",
    seats: 5,
    price: 95,
    location: "Dhanmondi, Dhaka",
    imageUrl:
      "https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "fleet-4",
    name: "Summit X",
    type: "SUV",
    seats: 7,
    price: 160,
    location: "Uttara, Dhaka",
    imageUrl:
      "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "fleet-5",
    name: "Midnight SE",
    type: "Hatchback",
    seats: 4,
    price: 70,
    location: "Tejgaon, Dhaka",
    imageUrl:
      "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "fleet-6",
    name: "Vantage Elite",
    type: "Luxury",
    seats: 5,
    price: 220,
    location: "Baridhara, Dhaka",
    imageUrl:
      "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=1200&q=80",
  },
];

export default function Home() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    const fetchCars = async () => {
      try {
        const data = await apiFetch("/cars?limit=6");
        if (active) {
          setCars(data?.cars || []);
        }
      } catch (err) {
        if (active) {
          setError(err.message || "Unable to load cars right now.");
          setCars(fallbackCars);
        }
      } finally {
        if (active) setLoading(false);
      }
    };

    fetchCars();
    return () => {
      active = false;
    };
  }, []);

  const visibleCars = useMemo(() => {
    if (cars.length >= 6) return cars.slice(0, 6);
    return cars.length ? cars : fallbackCars;
  }, [cars]);

  return (
    <div>
      <section className="relative overflow-hidden py-20">
        <Container className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <p className="text-xs uppercase tracking-[0.5em] text-black/60">
              Premium Car Rental
            </p>
            <h1 className="section-title text-4xl font-semibold leading-tight text-black md:text-5xl">
              Drive the fleet that matches your next ambition.
            </h1>
            <p className="max-w-xl text-base text-black/70">
              Explore curated luxury, SUV, and city-ready vehicles. Transparent
              pricing, instant booking, and concierge-level support.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/explore" className="btn btn-drive rounded-full px-6">
                Explore Cars
              </Link>
              <Link
                href="/add-car"
                className="btn btn-outline-drive rounded-full px-6"
              >
                List Your Car
              </Link>
            </div>
            <div className="grid gap-4 text-sm text-black/70 sm:grid-cols-3">
              <div>
                <p className="text-2xl font-semibold text-black">120+</p>
                <p>Verified listings</p>
              </div>
              <div>
                <p className="text-2xl font-semibold text-black">30 min</p>
                <p>Average delivery</p>
              </div>
              <div>
                <p className="text-2xl font-semibold text-black">98%</p>
                <p>Repeat customers</p>
              </div>
            </div>
          </div>
          <div className="lux-card rounded-3xl p-6">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=1400&q=80"
              alt="Luxury car"
              className="h-80 w-full rounded-2xl object-cover"
            />
            <div className="mt-6 grid gap-4 text-sm text-black/70 sm:grid-cols-2">
              <div>
                <p className="font-semibold text-black">Concierge Delivery</p>
                <p>Pickup and drop at your preferred location.</p>
              </div>
              <div>
                <p className="font-semibold text-black">Curated Protection</p>
                <p>Insured, inspected, and sanitized after every ride.</p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container className="space-y-10">
          <SectionHeader
            title="Available Cars"
            subtitle="A rotating selection of premium vehicles ready for your next trip. Book instantly or compare details first."
          />
          {loading ? <LoadingSpinner label="Loading fleet" /> : null}
          {error ? <p className="text-sm text-error">{error}</p> : null}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {visibleCars.map((car) => (
              <CarCard key={car.id || car._id} car={car} />
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container className="grid gap-10 lg:grid-cols-[1fr_1fr]">
          <div className="lux-card rounded-3xl p-8">
            <SectionHeader
              title="How DriveFleet Works"
              subtitle="Select a fleet, confirm your dates, and receive a curated handover. We keep the experience polished from start to finish."
            />
            <div className="mt-8 space-y-5 text-sm text-black/70">
              <div className="flex items-start gap-4">
                <span className="mt-1 h-2 w-2 rounded-full bg-black" />
                <p>
                  Filter by car type, seat capacity, and neighborhood pickup
                  points.
                </p>
              </div>
              <div className="flex items-start gap-4">
                <span className="mt-1 h-2 w-2 rounded-full bg-black" />
                <p>
                  Confirm booking with a transparent daily rate and total cost.
                </p>
              </div>
              <div className="flex items-start gap-4">
                <span className="mt-1 h-2 w-2 rounded-full bg-black" />
                <p>Enjoy real-time updates and a dedicated concierge line.</p>
              </div>
            </div>
          </div>
          <div className="lux-card rounded-3xl p-8">
            <SectionHeader
              title="Why Hosts Choose Us"
              subtitle="List your car with confidence. We prioritize security, pricing clarity, and standout exposure."
            />
            <div className="mt-8 grid gap-6 text-sm text-black/70 sm:grid-cols-2">
              <div>
                <p className="font-semibold text-black">Smart Pricing</p>
                <p>
                  See competitive benchmarks and adjust your rate instantly.
                </p>
              </div>
              <div>
                <p className="font-semibold text-black">Verified Guests</p>
                <p>
                  Every booking is authenticated and protected by secure
                  payments.
                </p>
              </div>
              <div>
                <p className="font-semibold text-black">Fleet Insights</p>
                <p>Monitor booking trends, earnings, and repeat guests.</p>
              </div>
              <div>
                <p className="font-semibold text-black">Priority Support</p>
                <p>Dedicated assistance for updates, claims, and logistics.</p>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
