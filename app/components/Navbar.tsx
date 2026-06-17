"use client";

import { useState } from "react";

export default function Navbar({ expandProgress }: { expandProgress: number }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 bg-black/90 backdrop-blur-md border-b border-zinc-900/60 py-4 ${
        expandProgress === 1 ? "opacity-100 pointer-events-auto translate-y-0" : "opacity-0 pointer-events-none -translate-y-4"
      }`}
    >
      <div className="w-full px-6 md:px-12 lg:px-20 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 group">
          <span className="text-2xl font-light tracking-[0.3em] text-white transition-colors duration-300 group-hover:text-accent font-serif">
            AURA
          </span>
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-10">
          {["Design", "Portfolio", "About", "Studio", "Contact"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="relative text-xs tracking-widest text-zinc-400 hover:text-white uppercase transition-colors duration-300 py-2 group"
            >
              {item}
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-accent transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* Header CTA */}
        <div className="hidden md:flex">
          <a
            href="#contact"
            className="px-5 py-2 text-[10px] tracking-widest uppercase font-semibold border border-zinc-800 rounded-none bg-transparent text-white hover:text-accent-foreground hover:bg-accent hover:border-accent transition-all duration-500"
          >
            Book Consultation
          </a>
        </div>

        {/* Mobile Menu Trigger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden flex flex-col justify-between w-6 h-4 text-zinc-400 hover:text-white transition-colors duration-300"
          aria-label="Toggle Menu"
        >
          <span className={`h-[1px] w-full bg-current transform transition-all duration-300 ${mobileMenuOpen ? "rotate-45 translate-y-[7.5px]" : ""}`} />
          <span className={`h-[1px] w-full bg-current transition-all duration-300 ${mobileMenuOpen ? "opacity-0" : ""}`} />
          <span className={`h-[1px] w-full bg-current transform transition-all duration-300 ${mobileMenuOpen ? "-rotate-45 -translate-y-[7.5px]" : ""}`} />
        </button>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`fixed inset-0 top-[70px] bg-zinc-950/98 backdrop-blur-lg z-40 transition-all duration-500 md:hidden flex flex-col items-center justify-center gap-8 ${
          mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {["Design", "Portfolio", "About", "Studio", "Contact"].map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            onClick={() => setMobileMenuOpen(false)}
            className="text-lg tracking-widest text-zinc-300 hover:text-accent uppercase transition-all duration-300 font-light"
          >
            {item}
          </a>
        ))}
        <a
          href="#contact"
          onClick={() => setMobileMenuOpen(false)}
          className="mt-4 px-8 py-3 text-xs tracking-widest uppercase font-medium bg-accent text-accent-foreground transition-all duration-300"
        >
          Book Consultation
        </a>
      </div>
    </header>
  );
}
