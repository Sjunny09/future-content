"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, MessageCircle, ArrowRight } from "lucide-react";
import { NAV_LINKS, SITE } from "@/lib/constants";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const waLink = `https://wa.me/${SITE.whatsapp}?text=Hallo%20John%2C%20ik%20wil%20graag%20meer%20informatie.`;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#F3ECE0]/95 backdrop-blur-md border-b border-[#E4D8C6] shadow-sm"
          : "bg-gradient-to-b from-black/50 to-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo / wordmark (terug naar de poort) */}
        <Link href="/" className="flex items-center shrink-0">
          <span
            className={`fc-wordmark text-lg font-black tracking-tight transition-colors ${
              scrolled ? "text-[#2A2218]" : "text-[#F3ECE0]"
            }`}
          >
            FUTURE<span className="font-light"> CONTENT</span>
            <span className="text-[#B45F38]">.</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-7">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`fc-mono text-xs font-semibold uppercase tracking-[0.15em] transition-colors ${
                scrolled
                  ? "text-[#2A2218] hover:text-[#B45F38]"
                  : "text-white/90 hover:text-white"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Primary CTA + Mobile Toggle */}
        <div className="flex items-center gap-3">
          <Link
            href="/boek"
            className="hidden md:inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-[#B45F38] text-[#F3ECE0] text-sm font-semibold hover:bg-[#9E3D24] transition-colors"
          >
            Plan een gesprek
            <ArrowRight size={15} />
          </Link>
          <button
            className={`md:hidden p-2 ${scrolled ? "text-[#2A2218]" : "text-white"}`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu openen"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-[#F3ECE0] border-t border-[#E4D8C6] px-6 py-6 flex flex-col gap-5">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-base font-medium text-[#2A2218]"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#25D366] text-white text-sm font-semibold"
            onClick={() => setMobileOpen(false)}
          >
            <MessageCircle size={15} />
            WhatsApp
          </Link>
          <Link
            href="/boek"
            className="inline-flex items-center justify-center px-5 py-3 rounded-full bg-[#B45F38] text-[#F3ECE0] text-sm font-semibold"
            onClick={() => setMobileOpen(false)}
          >
            Plan een gesprek
          </Link>
        </div>
      )}
    </header>
  );
}
