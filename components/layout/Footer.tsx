import Link from "next/link";
import Image from "next/image";
import { NAV_LINKS, SITE, REGIONS } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="bg-[#0F0F0D] text-[#FAFAF8]">
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
          <p className="text-sm text-[#6B7280] leading-relaxed">
            Video content die werkt. Voor makelaars, bedrijven en merken in De Kempen en omstreken.
          </p>
          <div className="mt-6 flex flex-col gap-1 text-sm text-[#6B7280]">
            <span>{SITE.address}</span>
            <a href={`mailto:${SITE.email}`} className="hover:text-[#C9A96E] transition-colors">
              {SITE.email}
            </a>
            <a href={`tel:${SITE.phone}`} className="hover:text-[#C9A96E] transition-colors">
              {SITE.phone}
            </a>
          </div>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-widest text-[#6B7280] mb-4">
            Navigatie
          </h3>
          <ul className="flex flex-col gap-3">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-[#FAFAF8]/80 hover:text-[#C9A96E] transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/contact"
                className="text-sm text-[#FAFAF8]/80 hover:text-[#C9A96E] transition-colors"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Services */}
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-widest text-[#6B7280] mb-4">
            Diensten
          </h3>
          <ul className="flex flex-col gap-3 text-sm text-[#FAFAF8]/80">
            <li>Vastgoedvideo's</li>
            <li>Social media abonnement</li>
            <li>Zakelijke video's</li>
            <li>Drone opnames</li>
            <li>Bruiloftsvideo's</li>
            <li>After movies</li>
          </ul>
        </div>

        {/* Service Area */}
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-widest text-[#6B7280] mb-4">
            Werkgebied
          </h3>
          <ul className="flex flex-col gap-2 text-sm text-[#FAFAF8]/80">
            {REGIONS.map((region) => (
              <li key={region.name}>
                <span className="text-[#C9A96E] font-medium">{region.name}</span>
                <br />
                <span className="text-xs text-[#6B7280]">{region.cities.join(", ")}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-[#6B7280]">
          <span>© {new Date().getFullYear()} Future Content — {SITE.address}</span>
          <span>KvK: {SITE.kvk}</span>
        </div>
      </div>
    </footer>
  );
}
