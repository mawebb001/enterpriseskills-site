"use client";

import { useState } from "react";

const tiers = [
  {
    name: "Community",
    id: "free",
    price: { monthly: "$0", annual: "$0" },
    period: "",
    description: "Core skills for individual developers",
    features: [
      "6 core skills",
      "Cursor adapter",
      "Community support",
      "Personal use license",
    ],
    cta: "Install Free",
    href: "https://github.com/mawebb001/enterprise-skills-community",
    highlighted: false,
  },
  {
    name: "Pro",
    id: "pro",
    price: { monthly: "$29", annual: "$24" },
    period: "/seat/mo",
    description: "Full library for professional developers",
    features: [
      "30+ skills",
      "CLI tool + skill compiler",
      "4 IDE adapters (Cursor, VS Code, Claude, CLI)",
      "Standard governance",
      "Email support (48h SLA)",
      "Annual billing: $290/year (save $58)",
    ],
    cta: "Start Pro",
    priceKey: "pro",
    highlighted: true,
  },
  {
    name: "Team",
    id: "team",
    price: { monthly: "$49", annual: "$41" },
    period: "/seat/mo",
    description: "For engineering teams of 5-50",
    features: [
      "Everything in Pro",
      "All 8 IDE adapters",
      "Team governance dashboard",
      "Cross-project intelligence",
      "Execution logging + feedback capture",
      "Priority support (24h SLA)",
      "Min 5 seats",
    ],
    cta: "Start Team",
    priceKey: "team",
    highlighted: false,
  },
  {
    name: "Enterprise",
    id: "enterprise",
    price: { monthly: "Custom", annual: "Custom" },
    period: "",
    description: "For regulated industries and large orgs",
    features: [
      "Everything in Team",
      "Execution Integrity Protocol (EIP)",
      "Compliance mapping + incident response",
      "IP scanning + audit log export",
      "SSO + on-premise deployment",
      "Custom skill development",
      "Dedicated support (4h SLA)",
    ],
    cta: "Contact Sales",
    href: "mailto:sales@arcfusiontechnologies.com?subject=Enterprise Skills - Enterprise Inquiry",
    highlighted: false,
  },
];

export function Pricing() {
  const [annual, setAnnual] = useState(false);

  return (
    <section id="pricing" className="py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
            Simple, transparent pricing
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
            Start free. Upgrade when you need more skills, IDEs, or governance.
          </p>

          <div className="mt-8 inline-flex items-center rounded-full border border-gray-200 bg-gray-100 p-1 dark:border-gray-700 dark:bg-gray-800">
            <button
              className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                !annual
                  ? "bg-white text-gray-900 shadow-sm dark:bg-gray-700 dark:text-white"
                  : "text-gray-500 dark:text-gray-400"
              }`}
              onClick={() => setAnnual(false)}
            >
              Monthly
            </button>
            <button
              className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                annual
                  ? "bg-white text-gray-900 shadow-sm dark:bg-gray-700 dark:text-white"
                  : "text-gray-500 dark:text-gray-400"
              }`}
              onClick={() => setAnnual(true)}
            >
              Annual
              <span className="ml-1.5 text-xs text-brand-600 dark:text-brand-400">Save 17%</span>
            </button>
          </div>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-4">
          {tiers.map((tier) => (
            <div
              key={tier.id}
              className={`relative rounded-2xl border p-8 ${
                tier.highlighted
                  ? "border-brand-500 shadow-xl shadow-brand-100/50 dark:border-brand-600 dark:shadow-brand-950/50"
                  : "border-gray-200 dark:border-gray-800"
              }`}
            >
              {tier.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brand-600 px-3 py-1 text-xs font-medium text-white">
                  Most Popular
                </div>
              )}

              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{tier.name}</h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{tier.description}</p>

              <div className="mt-6">
                <span className="text-4xl font-bold text-gray-900 dark:text-white">
                  {annual ? tier.price.annual : tier.price.monthly}
                </span>
                {tier.period && (
                  <span className="text-sm text-gray-500 dark:text-gray-400">{tier.period}</span>
                )}
              </div>

              <a
                href={tier.href ?? `/api/checkout?price=${tier.priceKey}_${annual ? "annual" : "monthly"}`}
                className={`mt-6 block w-full rounded-lg py-2.5 text-center text-sm font-semibold ${
                  tier.highlighted
                    ? "bg-brand-600 text-white hover:bg-brand-700"
                    : "border border-gray-300 text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-900"
                }`}
              >
                {tier.cta}
              </a>

              <ul className="mt-8 space-y-3">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-400">
                    <svg className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
          Volume discounts available: 15% off for 6-20 seats, 25% off for 21-50 seats, 35% off for 51-100 seats.
        </p>
      </div>
    </section>
  );
}
