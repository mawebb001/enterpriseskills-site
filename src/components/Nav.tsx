"use client";

import { useState } from "react";
import Link from "next/link";

export function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-gray-200/60 bg-white/80 backdrop-blur-lg dark:border-gray-800/60 dark:bg-gray-950/80">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600 text-sm font-bold text-white">
            ES
          </div>
          <span className="text-lg font-semibold text-gray-900 dark:text-white">
            Enterprise Skills
          </span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <a href="#features" className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
            Features
          </a>
          <a href="#ides" className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
            IDEs
          </a>
          <a href="#pricing" className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
            Pricing
          </a>
          <Link
            href="https://github.com/mawebb001/enterprise-skills-community"
            className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
            target="_blank"
          >
            GitHub
          </Link>
          <Link
            href="/api/checkout?price=pro_monthly"
            className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700"
          >
            Get Started
          </Link>
        </div>

        <button
          className="md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <svg className="h-6 w-6 text-gray-600 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {mobileOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-gray-200 bg-white px-6 py-4 dark:border-gray-800 dark:bg-gray-950 md:hidden">
          <div className="flex flex-col gap-4">
            <a href="#features" className="text-sm text-gray-600 dark:text-gray-400" onClick={() => setMobileOpen(false)}>Features</a>
            <a href="#ides" className="text-sm text-gray-600 dark:text-gray-400" onClick={() => setMobileOpen(false)}>IDEs</a>
            <a href="#pricing" className="text-sm text-gray-600 dark:text-gray-400" onClick={() => setMobileOpen(false)}>Pricing</a>
            <Link
              href="/api/checkout?price=pro_monthly"
              className="rounded-lg bg-brand-600 px-4 py-2 text-center text-sm font-medium text-white"
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
