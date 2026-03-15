"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="flex min-h-screen items-center justify-center bg-white px-6 dark:bg-gray-950">
      <div className="max-w-md text-center">
        {loading ? (
          <div className="flex flex-col items-center gap-4">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-brand-200 border-t-brand-600" />
            <p className="text-gray-500 dark:text-gray-400">Setting up your license...</p>
          </div>
        ) : (
          <>
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
              <svg className="h-8 w-8 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Welcome to Enterprise Skills Pro
            </h1>

            <p className="mt-4 text-gray-600 dark:text-gray-400">
              Your license key has been generated and sent to your email.
              Check your inbox for activation instructions.
            </p>

            <div className="mt-8 rounded-xl border border-gray-200 bg-gray-50 p-6 text-left dark:border-gray-800 dark:bg-gray-900">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Next steps:</h3>
              <ol className="mt-3 space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li className="flex gap-2">
                  <span className="font-mono text-brand-600">1.</span>
                  Check your email for the license key
                </li>
                <li className="flex gap-2">
                  <span className="font-mono text-brand-600">2.</span>
                  Install the CLI: <code className="rounded bg-gray-200 px-1 dark:bg-gray-800">npm i -g enterprise-skills</code>
                </li>
                <li className="flex gap-2">
                  <span className="font-mono text-brand-600">3.</span>
                  Activate: <code className="rounded bg-gray-200 px-1 dark:bg-gray-800">enterprise-skills license activate YOUR_KEY</code>
                </li>
                <li className="flex gap-2">
                  <span className="font-mono text-brand-600">4.</span>
                  Init your project: <code className="rounded bg-gray-200 px-1 dark:bg-gray-800">enterprise-skills init --tier pro</code>
                </li>
              </ol>
            </div>

            {sessionId && (
              <p className="mt-4 text-xs text-gray-400 dark:text-gray-500">
                Session: {sessionId.slice(0, 20)}...
              </p>
            )}

            <Link
              href="/"
              className="mt-8 inline-block text-sm text-brand-600 hover:text-brand-700 dark:text-brand-400"
            >
              &larr; Back to home
            </Link>
          </>
        )}
      </div>
    </main>
  );
}
