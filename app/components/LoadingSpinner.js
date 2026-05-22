export default function LoadingSpinner({ label = "Loading" }) {
  return (
    <div className="flex items-center justify-center gap-3 py-10 text-sm text-black/60">
      <span className="loading loading-ring loading-sm" />
      <span>{label}...</span>
    </div>
  );
}
