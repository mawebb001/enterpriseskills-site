import Link from "next/link";

export function CTA() {
  return (
    <section className="border-t border-gray-200 bg-brand-600 py-20 dark:border-gray-800">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Ship with confidence. Start in 30 seconds.
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-brand-100">
          Install the free community edition, or upgrade to Pro for the full skill library and CLI.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <div className="rounded-lg bg-white/10 px-6 py-3 font-mono text-sm text-white backdrop-blur">
            npm install -g enterprise-skills
          </div>
          <Link
            href="/api/checkout?price=pro_monthly"
            className="rounded-xl bg-white px-8 py-3 font-semibold text-brand-600 hover:bg-brand-50"
          >
            Upgrade to Pro
          </Link>
        </div>
      </div>
    </section>
  );
}
