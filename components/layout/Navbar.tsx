"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, MessageCircle, ArrowRight, ChevronDown } from "lucide-react";
import { NAV_LINKS, FILM_LINK, SITE } from "@/lib/constants";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const waLink = `https://wa.me/${SITE.whatsapp}?text=Hallo%20John%2C%20ik%20wil%20graag%20meer%20informatie.`;
  const linkKleur = scrolled
    ? "text-[#2A2218] hover:text-[#B45F38]"
    : "text-white/90 hover:text-white";
  const linkStijl = `inline-flex items-center gap-1 fc-mono text-xs font-semibold uppercase tracking-[0.15em] transition-colors ${linkKleur}`;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#F3ECE0]/95 backdrop-blur-md border-b border-[#E4D8C6] shadow-sm"
          : "bg-gradient-to-b from-black/50 to-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between gap-6">
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

        {/* Desktop: uitklappen op hover én op toetsenbordfocus (focus-within) */}
        <nav className="hidden lg:flex items-center gap-7">
          {NAV_LINKS.map((link) =>
            link.children ? (
              <div key={link.label} className="group relative flex">
                {link.href ? (
                  <Link href={link.href} className={linkStijl}>
                    {link.label}
                    <ChevronDown size={13} className="transition-transform group-hover:rotate-180" />
                  </Link>
                ) : (
                  <button type="button" className={linkStijl}>
                    {link.label}
                    <ChevronDown size={13} className="transition-transform group-hover:rotate-180" />
                  </button>
                )}
                <div className="invisible absolute left-1/2 top-full -translate-x-1/2 pt-4 opacity-0 transition-opacity duration-150 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                  <ul className="w-80 rounded-xl border border-[#E4D8C6] bg-[#FBF8F2] p-2 shadow-xl">
                    {link.children.map((c) => (
                      <li key={c.href}>
                        <Link
                          href={c.href}
                          className="block rounded-lg px-4 py-3 transition-colors hover:bg-[#F3ECE0] focus:bg-[#F3ECE0] focus:outline-none"
                        >
                          <span className="block text-sm font-semibold text-[#2A2218]">{c.label}</span>
                          <span className="mt-0.5 block text-xs leading-relaxed text-[#6E6151]">{c.desc}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <Link key={link.label} href={link.href!} className={linkStijl}>
                {link.label}
              </Link>
            )
          )}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href={FILM_LINK.href}
            className={`hidden lg:inline fc-mono text-[11px] uppercase tracking-[0.15em] transition-colors ${
              scrolled ? "text-[#6E6151] hover:text-[#B45F38]" : "text-white/60 hover:text-white"
            }`}
          >
            {FILM_LINK.label}
          </Link>
          <Link
            href="/boek"
            className="inline-flex items-center gap-1.5 whitespace-nowrap px-4 py-2 lg:px-5 lg:py-2.5 rounded-full bg-[#B45F38] text-[#F3ECE0] text-xs lg:text-sm font-semibold hover:bg-[#9E3D24] transition-colors"
          >
            Plan een gesprek
            <ArrowRight size={15} className="hidden lg:inline" />
          </Link>
          <button
            className={`lg:hidden p-2 ${scrolled ? "text-[#2A2218]" : "text-white"}`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Menu sluiten" : "Menu openen"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden max-h-[calc(100svh-4rem)] overflow-y-auto bg-[#F3ECE0] border-t border-[#E4D8C6] px-6 py-6 flex flex-col gap-5">
          {NAV_LINKS.map((link) => (
            <div key={link.label}>
              {link.href && !link.children ? (
                <Link
                  href={link.href}
                  className="text-base font-medium text-[#2A2218]"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ) : (
                <>
                  <span className="fc-mono text-[11px] uppercase tracking-[0.2em] text-[#B45F38]">
                    {link.label}
                  </span>
                  <ul className="mt-2 flex flex-col gap-2 border-l border-[#E4D8C6] pl-4">
                    {link.children!.map((c) => (
                      <li key={c.href}>
                        <Link
                          href={c.href}
                          className="text-base font-medium text-[#2A2218]"
                          onClick={() => setMobileOpen(false)}
                        >
                          {c.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          ))}
          <Link
            href={FILM_LINK.href}
            className="text-base font-medium text-[#6E6151]"
            onClick={() => setMobileOpen(false)}
          >
            {FILM_LINK.label}
          </Link>
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
        </div>
      )}
    </header>
  );
}
