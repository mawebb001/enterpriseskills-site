const ides = [
  { name: "Cursor", tier: "Free+", desc: "Native skills + rules" },
  { name: "VS Code", tier: "Pro+", desc: "Snippets + tasks + skills" },
  { name: "Claude Code", tier: "Pro+", desc: "CLAUDE.md + commands" },
  { name: "Terminal/CI", tier: "Pro+", desc: "Shell scripts + env config" },
  { name: "Windsurf", tier: "Team+", desc: "Rules + Cascade memories" },
  { name: "JetBrains", tier: "Team+", desc: "Prompts + context XML" },
  { name: "Neovim", tier: "Team+", desc: "Lua config + system prompt" },
  { name: "Xcode", tier: "Team+", desc: "Swift helpers + context" },
];

export function IDESupport() {
  return (
    <section id="ides" className="border-t border-gray-200 bg-gray-50 py-24 sm:py-32 dark:border-gray-800 dark:bg-gray-900/50">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
            One library. Every IDE.
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
            Skills render natively in your IDE. No extension, no plugin conflict, no lock-in.
          </p>
        </div>

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {ides.map((ide) => (
            <div
              key={ide.name}
              className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-950"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-900 dark:text-white">{ide.name}</h3>
                <span className="rounded-full bg-brand-50 px-2.5 py-0.5 text-xs font-medium text-brand-700 dark:bg-brand-950 dark:text-brand-300">
                  {ide.tier}
                </span>
              </div>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{ide.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
