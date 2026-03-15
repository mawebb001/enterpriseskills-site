import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white py-12 dark:border-gray-800 dark:bg-gray-950">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-8 sm:grid-cols-4">
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-md bg-brand-600 text-xs font-bold text-white">
                ES
              </div>
              <span className="font-semibold text-gray-900 dark:text-white">Enterprise Skills</span>
            </div>
            <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
              Governance-first AI development across every IDE.
            </p>
            <p className="mt-2 text-xs text-gray-400 dark:text-gray-500">
              Built by Arcfusion Technologies
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white">Product</h4>
            <ul className="mt-3 space-y-2">
              <li><a href="#features" className="text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">Features</a></li>
              <li><a href="#pricing" className="text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">Pricing</a></li>
              <li><a href="#ides" className="text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">IDE Support</a></li>
              <li><Link href="https://github.com/mawebb001/enterprise-skills-community" className="text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">GitHub</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white">Resources</h4>
            <ul className="mt-3 space-y-2">
              <li><Link href="/docs" className="text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">Documentation</Link></li>
              <li><Link href="https://cursor.com/marketplace" className="text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">Cursor Marketplace</Link></li>
              <li><Link href="https://www.npmjs.com/package/enterprise-skills" className="text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">npm Package</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white">Company</h4>
            <ul className="mt-3 space-y-2">
              <li><a href="mailto:sales@arcfusiontechnologies.com" className="text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">Contact Sales</a></li>
              <li><a href="mailto:support@arcfusiontechnologies.com" className="text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">Support</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-200 pt-6 text-center text-xs text-gray-400 dark:border-gray-800 dark:text-gray-500">
          &copy; {new Date().getFullYear()} Arcfusion Technologies. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
