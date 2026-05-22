import Link from "next/link";
import Container from "./components/Container";

export default function NotFound() {
  return (
    <section className="py-20">
      <Container className="max-w-xl text-center">
        <div className="lux-card rounded-3xl p-10">
          <p className="text-xs uppercase tracking-[0.4em] text-black/60">404</p>
          <h1 className="section-title mt-4 text-3xl font-semibold text-black">This route took a detour.</h1>
          <p className="mt-3 text-sm text-black/70">
            The page you are looking for is not available. Let us guide you back to the fleet.
          </p>
          <Link href="/" className="btn btn-drive mt-6 rounded-full">
            Back to Home
          </Link>
        </div>
      </Container>
    </section>
  );
}
