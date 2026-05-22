"use client";

import Link from "next/link";
import { useAuth } from "../providers/AuthProvider";
import Container from "./Container";

export default function Navbar() {
  const { user, logout, loading } = useAuth();

  return (
    <header className="sticky top-0 z-40 border-b border-black/10 bg-[#f7f3ee]/90 backdrop-blur">
      <Container className="flex items-center justify-between py-4">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-sm font-semibold text-[#f7f3ee]">
            DF
          </div>
          <div>
            <p className="section-title text-lg font-semibold text-black">DriveFleet</p>
            <p className="text-xs uppercase tracking-[0.3em] text-black/60">Car Rental</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium text-black/70 lg:flex">
          <Link href="/" className="hover:text-black">Home</Link>
          <Link href="/explore" className="hover:text-black">Explore Cars</Link>
          <Link href="/add-car" className="hover:text-black">Add Car</Link>
          <Link href="/my-bookings" className="hover:text-black">My Bookings</Link>
          {!user ? <Link href="/register" className="hover:text-black">Register</Link> : null}
        </nav>

        <div className="flex items-center gap-3">
          <div className="dropdown dropdown-end lg:hidden">
            <label tabIndex={0} className="btn btn-outline-drive btn-sm rounded-full">
              Menu
            </label>
            <ul tabIndex={0} className="menu dropdown-content mt-3 w-48 rounded-box bg-white p-2 shadow">
              <li><Link href="/">Home</Link></li>
              <li><Link href="/explore">Explore Cars</Link></li>
              <li><Link href="/add-car">Add Car</Link></li>
              <li><Link href="/my-bookings">My Bookings</Link></li>
              {!user ? <li><Link href="/register">Register</Link></li> : null}
            </ul>
          </div>
          {loading ? (
            <div className="h-10 w-24 animate-pulse rounded-full bg-black/10" />
          ) : user ? (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-outline-drive btn-sm rounded-full">
                <span className="mr-2 h-6 w-6 overflow-hidden rounded-full bg-black/10">
                  {user.photoUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={user.photoUrl} alt={user.name || "Profile"} />
                  ) : null}
                </span>
                <span className="hidden sm:inline">{user.name || "Account"}</span>
              </label>
              <ul tabIndex={0} className="menu dropdown-content mt-3 w-52 rounded-box bg-white p-2 shadow">
                <li><Link href="/add-car">Add Car</Link></li>
                <li><Link href="/my-bookings">My Bookings</Link></li>
                <li><Link href="/my-added-cars">My Added Cars</Link></li>
                <li>
                  <button type="button" onClick={logout}>Logout</button>
                </li>
              </ul>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/login" className="btn btn-drive btn-sm rounded-full">
                Login
              </Link>
            </div>
          )}
        </div>
      </Container>
    </header>
  );
}
