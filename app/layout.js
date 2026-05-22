import { Manrope, Playfair_Display } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "./providers/AuthProvider";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const manrope = Manrope({
  variable: "--font-sans",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
});

export const metadata = {
  title: "DriveFleet | Premium Car Rental",
  description: "Explore premium car rentals, curated fleets, and seamless booking with DriveFleet.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      data-theme="drivefleet"
      className={`${manrope.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="page-shell">
        <AuthProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
