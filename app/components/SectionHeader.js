export default function SectionHeader({ title, subtitle }) {
  return (
    <div className="space-y-3">
      <p className="text-xs uppercase tracking-[0.4em] text-black/60">DriveFleet</p>
      <h2 className="section-title text-3xl font-semibold text-black md:text-4xl">
        {title}
      </h2>
      {subtitle ? <p className="max-w-2xl text-base text-black/70">{subtitle}</p> : null}
    </div>
  );
}
