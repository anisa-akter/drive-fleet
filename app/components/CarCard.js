import Link from "next/link";

export default function CarCard({ car }) {
  const carId = car.id || car._id;
  return (
    <div className="lux-card flex h-full flex-col overflow-hidden rounded-2xl">
      <div className="h-48 w-full overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={car.imageUrl}
          alt={car.name}
          className="h-full w-full object-cover transition duration-500 hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col gap-4 p-5">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-black/60">
            <span>{car.type}</span>
            <span>{car.seats} Seats</span>
          </div>
          <h3 className="section-title text-xl font-semibold text-black">
            {car.name}
          </h3>
          <p className="text-sm text-black/70">{car.location}</p>
        </div>
        <div className="mt-auto flex items-center justify-between">
          <p className="text-lg font-semibold text-black">${car.price}/day</p>
          <Link
            href={`/cars/${carId}`}
            className="btn px-2 btn-outline-drive btn-sm rounded-full"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
