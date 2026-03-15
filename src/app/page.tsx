import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { Pricing } from "@/components/Pricing";
import { IDESupport } from "@/components/IDESupport";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";

export default function Home() {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-950">
      <Nav />
      <Hero />
      <Features />
      <IDESupport />
      <Pricing />
      <CTA />
      <Footer />
    </main>
  );
}
