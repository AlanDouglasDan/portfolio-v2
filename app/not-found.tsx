import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-svh flex-col items-start justify-end gap-6 px-5 pb-16 md:px-10">
      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-mute">Error 404</p>
      <h1 className="text-[22vw] font-medium leading-[0.85] tracking-[-0.06em]">
        Lost<span className="serif italic text-ember">?</span>
      </h1>
      <Link href="/" className="u-link text-lg">
        ← Back home
      </Link>
    </main>
  );
}
