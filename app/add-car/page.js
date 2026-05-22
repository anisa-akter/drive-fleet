"use client";

import { useState } from "react";
import Container from "../components/Container";
import SectionHeader from "../components/SectionHeader";
import PrivateRoute from "../components/PrivateRoute";
import { apiFetch } from "../lib/api";

const defaultForm = {
  name: "",
  price: "",
  type: "SUV",
  imageUrl: "",
  seats: "",
  location: "",
  description: "",
  available: "yes",
};

export default function AddCarPage() {
  const [formData, setFormData] = useState(defaultForm);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");
    try {
      await apiFetch("/add-car", {
        method: "POST",
        body: JSON.stringify({
          ...formData,
          price: Number(formData.price),
          seats: Number(formData.seats),
          available: formData.available === "yes",
        }),
      });
      setMessage("Car added successfully.");
      setFormData(defaultForm);
    } catch (err) {
      setError(err.message || "Unable to add car.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PrivateRoute>
      <section className="py-16">
        <Container className="max-w-3xl">
          <div className="lux-card rounded-3xl p-8">
            <SectionHeader
              title="Add Car"
              subtitle="Showcase your vehicle to DriveFleet guests with clear details and quality imagery."
            />
            <form
              className="mt-8 grid gap-4 md:grid-cols-2"
              onSubmit={handleSubmit}
            >
              <div className="md:col-span-2">
                <label className="text-sm font-medium">Car Name</label>
                <input
                  className="input border-gray-300 rounded-lg mt-2 w-full"
                  value={formData.name}
                  onChange={(event) =>
                    setFormData({ ...formData, name: event.target.value })
                  }
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium">Daily Rent Price</label>
                <input
                  type="number"
                  className="input border border-gray-300 rounded-lg mt-2 w-full"
                  value={formData.price}
                  onChange={(event) =>
                    setFormData({ ...formData, price: event.target.value })
                  }
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium">Car Type</label>
                <select
                  className="select select-bordered mt-2 w-full"
                  value={formData.type}
                  onChange={(event) =>
                    setFormData({ ...formData, type: event.target.value })
                  }
                >
                  <option>SUV</option>
                  <option>Sedan</option>
                  <option>Hatchback</option>
                  <option>Luxury</option>
                  <option>Coupe</option>
                  <option>Hybrid</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="text-sm font-medium">Image URL</label>
                <input
                  type="url"
                  className="input border border-gray-300 rounded-lg mt-2 w-full"
                  value={formData.imageUrl}
                  onChange={(event) =>
                    setFormData({ ...formData, imageUrl: event.target.value })
                  }
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium">Seat Capacity</label>
                <input
                  type="number"
                  className="input border border-gray-300 rounded-lg mt-2 w-full"
                  value={formData.seats}
                  onChange={(event) =>
                    setFormData({ ...formData, seats: event.target.value })
                  }
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium">Pickup Location</label>
                <input
                  className="input border border-gray-300 rounded-lg mt-2 w-full"
                  value={formData.location}
                  onChange={(event) =>
                    setFormData({ ...formData, location: event.target.value })
                  }
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label className="text-sm font-medium">Description</label>
                <textarea
                  className="textarea textarea-bordered mt-2 w-full"
                  rows={4}
                  value={formData.description}
                  onChange={(event) =>
                    setFormData({
                      ...formData,
                      description: event.target.value,
                    })
                  }
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium">
                  Availability Status
                </label>
                <select
                  className="select select-bordered mt-2 w-full"
                  value={formData.available}
                  onChange={(event) =>
                    setFormData({ ...formData, available: event.target.value })
                  }
                >
                  <option value="yes">Available</option>
                  <option value="no">Unavailable</option>
                </select>
              </div>
              <div className="flex items-end">
                <button
                  type="submit"
                  className="btn btn-drive w-full rounded-full"
                  disabled={loading}
                >
                  {loading ? "Saving..." : "Add Car"}
                </button>
              </div>
            </form>
            {error ? <p className="mt-4 text-sm text-error">{error}</p> : null}
            {message ? (
              <p className="mt-4 text-sm text-success">{message}</p>
            ) : null}
          </div>
        </Container>
      </section>
    </PrivateRoute>
  );
}
