"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Container from "../../components/Container";
import SectionHeader from "../../components/SectionHeader";
import PrivateRoute from "../../components/PrivateRoute";
import LoadingSpinner from "../../components/LoadingSpinner";
import { apiFetch } from "../../lib/api";

export default function UpdateCarPage() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    const loadCar = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await apiFetch(`/cars/${id}`);
        if (active) {
          setFormData({
            price: data?.car?.price || "",
            description: data?.car?.description || "",
            available: data?.car?.available ? "yes" : "no",
            imageUrl: data?.car?.imageUrl || "",
            type: data?.car?.type || "SUV",
            location: data?.car?.location || "",
            name: data?.car?.name || "",
          });
        }
      } catch (err) {
        if (active) setError(err.message || "Unable to load car details.");
      } finally {
        if (active) setLoading(false);
      }
    };

    if (id) loadCar();
    return () => {
      active = false;
    };
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!formData) return;
    setMessage("");
    setError("");
    try {
      await apiFetch(`/update-car/${id}`, {
        method: "PUT",
        body: JSON.stringify({
          price: Number(formData.price),
          description: formData.description,
          available: formData.available === "yes",
          imageUrl: formData.imageUrl,
          type: formData.type,
          location: formData.location,
        }),
      });
      setMessage("Car updated successfully.");
    } catch (err) {
      setError(err.message || "Unable to update car.");
    }
  };

  return (
    <PrivateRoute>
      <section className="py-16">
        <Container className="max-w-3xl">
          <div className="lux-card rounded-3xl p-8">
            <SectionHeader title="Update Car" subtitle="Adjust pricing, availability, or visuals for your listing." />
            {loading ? <LoadingSpinner label="Loading car" /> : null}
            {error ? <p className="text-sm text-error">{error}</p> : null}
            {formData ? (
              <form className="mt-6 grid gap-4 md:grid-cols-2" onSubmit={handleSubmit}>
                <div className="md:col-span-2">
                  <label className="text-sm font-medium">Car Name</label>
                  <input className="input input-bordered mt-2 w-full" value={formData.name} disabled />
                </div>
                <div>
                  <label className="text-sm font-medium">Price</label>
                  <input
                    type="number"
                    className="input input-bordered mt-2 w-full"
                    value={formData.price}
                    onChange={(event) => setFormData({ ...formData, price: event.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Type</label>
                  <select
                    className="select select-bordered mt-2 w-full"
                    value={formData.type}
                    onChange={(event) => setFormData({ ...formData, type: event.target.value })}
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
                    className="input input-bordered mt-2 w-full"
                    value={formData.imageUrl}
                    onChange={(event) => setFormData({ ...formData, imageUrl: event.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Location</label>
                  <input
                    className="input input-bordered mt-2 w-full"
                    value={formData.location}
                    onChange={(event) => setFormData({ ...formData, location: event.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Availability</label>
                  <select
                    className="select select-bordered mt-2 w-full"
                    value={formData.available}
                    onChange={(event) => setFormData({ ...formData, available: event.target.value })}
                  >
                    <option value="yes">Available</option>
                    <option value="no">Unavailable</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="text-sm font-medium">Description</label>
                  <textarea
                    className="textarea textarea-bordered mt-2 w-full"
                    rows={4}
                    value={formData.description}
                    onChange={(event) => setFormData({ ...formData, description: event.target.value })}
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <button type="submit" className="btn btn-drive w-full rounded-full">
                    Save Changes
                  </button>
                </div>
              </form>
            ) : null}
            {message ? <p className="mt-4 text-sm text-success">{message}</p> : null}
          </div>
        </Container>
      </section>
    </PrivateRoute>
  );
}
