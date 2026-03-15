import Link from "next/link";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(45%_40%_at_50%_60%,rgba(99,102,241,0.12),transparent)]" />

      <div className="mx-auto max-w-6xl px-6 text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-4 py-1.5 text-sm text-brand-700 dark:border-brand-800 dark:bg-brand-950 dark:text-brand-300">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-brand-500" />
          v3.0 — Now supporting 8 IDEs
        </div>

        <h1 className="mx-auto max-w-4xl text-5xl font-bold tracking-tight text-gray-900 sm:text-7xl dark:text-white">
          AI skills your team{" "}
          <span className="bg-gradient-to-r from-brand-600 to-purple-600 bg-clip-text text-transparent">
            can actually trust
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600 sm:text-xl dark:text-gray-400">
          40+ enterprise-grade agent skills with governance, session management,
          and structured workflows. One skill library, every IDE.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/api/checkout?price=pro_monthly"
            className="rounded-xl bg-brand-600 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-brand-600/25 hover:bg-brand-700 hover:shadow-brand-600/30"
          >
            Start Free Trial
          </Link>
          <a
            href="#pricing"
            className="rounded-xl border border-gray-300 px-8 py-3.5 text-base font-semibold text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-900"
          >
            View Pricing
          </a>
        </div>

        <div className="mt-16 overflow-hidden rounded-xl border border-gray-200 bg-gray-950 p-1 shadow-2xl dark:border-gray-800">
          <div className="flex items-center gap-2 px-4 py-2">
            <div className="h-3 w-3 rounded-full bg-red-500/80" />
            <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
            <div className="h-3 w-3 rounded-full bg-green-500/80" />
            <span className="ml-3 text-xs text-gray-500">terminal</span>
          </div>
          <pre className="overflow-x-auto px-6 py-4 text-left font-mono text-sm text-gray-300">
            <code>{`$ npm install -g enterprise-skills
$ cd my-project
$ enterprise-skills init --tier pro

  Detected stack:
    Language:  TypeScript
    Framework: Next.js
    Database:  Supabase
    Auth:      Supabase Auth

  Loading 32 skills (tier: pro)
  Rendering for cursor... 12 files written
  Rendering for vscode...  8 files written
  Rendering for claude...  4 files written

  Init complete: 24 files across 3 adapter(s)

$ enterprise-skills license activate es-pro-a1b2c3d4-...
  License activated: Pro (expires 2027-03-06)`}</code>
          </pre>
        </div>
      </div>
    </section>
  );
}
