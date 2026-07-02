import Link from "next/link";
import Image from "next/image";
import { Instagram } from "lucide-react";
import { NAV_LINKS, SITE, REGIONS, SOCIALS } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="bg-[#221C14] text-[#F3ECE0]">
      <div className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand */}
        <div className="md:col-span-1">
          <Image
            src="/logo/logo.png"
            alt="Future Content"
            width={130}
            height={38}
            className="h-8 w-auto object-contain brightness-0 invert mb-4"
          />
          <p className="text-sm text-[#6E6151] leading-relaxed">
            AI, automatisering en video voor MKB-bedrijven in De Kempen en omstreken. Gebouwd én beheerd.
          </p>
          <div className="mt-6 flex flex-col gap-1 text-sm text-[#6E6151]">
            <span>{SITE.address}</span>
            <a href={`mailto:${SITE.email}`} className="hover:text-[#B45F38] transition-colors">
              {SITE.email}
            </a>
            <a href={`tel:${SITE.phone}`} className="hover:text-[#B45F38] transition-colors">
              {SITE.phone}
            </a>
          </div>
          <div className="mt-5 flex items-center gap-3">
            <a
              href={SOCIALS.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Future Content op ${SOCIALS.instagram.label}`}
              className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-[#6E6151] hover:text-[#B45F38] hover:border-[#B45F38] transition-colors"
            >
              <Instagram size={15} />
            </a>
          </div>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-widest text-[#6E6151] mb-4">
            Navigatie
          </h3>
          <ul className="flex flex-col gap-3">
            {[
              ...NAV_LINKS,
              { href: "/portfolio", label: "Portfolio" },
              { href: "/werkwijze", label: "Werkwijze" },
              { href: "/over", label: "Over" },
              { href: "/blog", label: "Blog" },
              { href: "/contact", label: "Contact" },
            ].map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-[#F3ECE0]/80 hover:text-[#B45F38] transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-widest text-[#6E6151] mb-4">
            Diensten
          </h3>
          <ul className="flex flex-col gap-3 text-sm">
            {[
              { href: "/makelaars", label: "Vastgoedvideo's" },
              { href: "/social-media", label: "Social media abonnement" },
              { href: "/videografie", label: "Zakelijke video's" },
              { href: "/trouwen", label: "Bruiloftsvideo's" },
              { href: "/film", label: "Aftermovies" },
            ].map((s) => (
              <li key={s.href}>
                <Link
                  href={s.href}
                  className="text-[#F3ECE0]/80 hover:text-[#B45F38] transition-colors"
                >
                  {s.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Service Area */}
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-widest text-[#6E6151] mb-4">
            Werkgebied
          </h3>
          <ul className="flex flex-col gap-2 text-sm text-[#F3ECE0]/80">
            {REGIONS.map((region) => (
              <li key={region.name}>
                <span className="text-[#B45F38] font-medium">{region.name}</span>
                <br />
                <span className="text-xs text-[#6E6151]">{region.cities.join(", ")}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-[#6E6151]">
          <span>© {new Date().getFullYear()} Future Content, {SITE.address}</span>
          <div className="flex items-center gap-4">
            <Link href="/voorwaarden" className="hover:text-[#B45F38] transition-colors">
              Algemene voorwaarden
            </Link>
            <Link href="/privacy" className="hover:text-[#B45F38] transition-colors">
              Privacy
            </Link>
            <span>KvK: {SITE.kvk}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
