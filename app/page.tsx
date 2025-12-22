import Hero from "./components/hero";
import About from "./components/about";
import Services from "./components/services";
import Testimonials from "./components/terstimonials";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#f8fbff] text-slate-900">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-10 top-16 h-48 w-48 rounded-full bg-emerald-100 blur-3xl" />
        <div className="absolute right-4 top-32 h-64 w-64 rounded-full bg-sky-100 blur-3xl" />
        <div className="absolute bottom-20 left-1/3 h-52 w-52 rounded-full bg-emerald-50 blur-3xl" />
      </div>
      <main className="relative">
        <Hero />
        <About />
        <Services
          limit={3}
          title="Top services we deliver best"
          description="Explore our most-booked care options—tap View all to see every service we offer."
        />
        <Testimonials />
      </main>
    </div>
  );
}
