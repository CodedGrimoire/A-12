export default function Navbar() {
  const links = [
    { href: "#about", label: "About" },
    { href: "#services", label: "Services" },
    { href: "#testimonials", label: "Stories" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <header className="sticky top-0 z-30 backdrop-blur bg-white/80 border-b border-slate-200">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#" className="flex items-center gap-2 text-slate-900">
          <div className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-semibold text-emerald-700 shadow-sm">
            Care.xyz
          </div>
          <span className="text-lg font-semibold tracking-tight">
            Baby & Elderly Care
          </span>
        </a>
        <nav className="hidden items-center gap-7 text-sm font-medium text-slate-700 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-emerald-700"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <a
          href="#book"
          className="rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-emerald-200 transition hover:-translate-y-0.5 hover:bg-emerald-700"
        >
          Book Care
        </a>
      </div>
    </header>
  );
}
