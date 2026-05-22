import Link from "next/link";
import Container from "./Container";

function XIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M18.244 2.25h3.308l-7.223 8.255L22.5 21.75h-6.18l-4.84-6.33-5.54 6.33H2.632l7.73-8.832L1.5 2.25h6.336l4.37 5.79zm-1.157 17.04h1.83L7.008 4.59H5.05z"
      />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="border-t border-black/10 bg-[#efe7dc]">
      <Container className="grid gap-10 py-12 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-sm font-semibold text-[#f7f3ee]">
              DF
            </div>
            <div>
              <p className="section-title text-lg font-semibold text-black">DriveFleet</p>
              <p className="text-xs uppercase tracking-[0.3em] text-black/60">Car Rental</p>
            </div>
          </div>
          <p className="text-sm text-black/70">
            Premium mobility for city breaks, business trips, and weekend escapes. Curated cars with seamless booking.
          </p>
        </div>

        <div className="space-y-3 text-sm">
          <p className="font-semibold text-black">Useful Links</p>
          <ul className="space-y-2 text-black/70">
            <li><Link href="/explore">Explore Cars</Link></li>
            <li><Link href="/add-car">Add Car</Link></li>
            <li><Link href="/my-bookings">My Bookings</Link></li>
            <li><Link href="/login">Login</Link></li>
          </ul>
        </div>

        <div className="space-y-3 text-sm">
          <p className="font-semibold text-black">Contact</p>
          <ul className="space-y-2 text-black/70">
            <li>DriveFleet HQ</li>
            <li>72 Fleet Street, Dhaka</li>
            <li>+880 1700 000 000</li>
            <li>support@drivefleet.com</li>
          </ul>
        </div>

        <div className="space-y-3 text-sm">
          <p className="font-semibold text-black">Social</p>
          <div className="flex items-center gap-3 text-black/70">
            <a className="btn btn-outline-drive btn-sm" href="https://x.com" target="_blank" rel="noreferrer">
              <XIcon />
            </a>
            <a className="btn btn-outline-drive btn-sm" href="https://instagram.com" target="_blank" rel="noreferrer">
              IG
            </a>
            <a className="btn btn-outline-drive btn-sm" href="https://www.linkedin.com" target="_blank" rel="noreferrer">
              IN
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
