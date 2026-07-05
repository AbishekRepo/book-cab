import { Phone, Mail, MapPin, Globe, Share2 } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { NAV_LINKS, SITE, SOCIAL_LINKS, PHONE_DISPLAY } from "@/constants/site";
import { whatsAppLink } from "@/lib/whatsapp";

export function Footer() {
  return (
    <footer id="footer" className="mt-20 bg-secondary text-white/80">
      <Container className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        {/* Company */}
        <div>
          <div className="flex items-center">
            <img src="/shami_logo.png" alt={SITE.name} className="h-24 w-auto object-contain" />
          </div>
          <p className="mt-4 text-sm leading-relaxed">
            {SITE.tagline}. Airport transfers, one-way taxis, round trips and
            local packages — available 24×7.
          </p>
        </div>

        {/* Quick links */}
        <div>
          <h3 className="font-semibold text-white">Quick Links</h3>
          <ul className="mt-4 space-y-2 text-sm">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="hover:text-white">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-semibold text-white">Contact</h3>
          <ul className="mt-4 space-y-3 text-sm">
            <li>
              <a
                href={`tel:+${SITE.phone}`}
                className="flex items-center gap-2 hover:text-white"
              >
                <Phone className="size-4 shrink-0" />
                {PHONE_DISPLAY}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${SITE.email}`}
                className="flex items-center gap-2 hover:text-white"
              >
                <Mail className="size-4 shrink-0" />
                {SITE.email}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="size-4 shrink-0" />
              {SITE.address}
            </li>
          </ul>
        </div>

        {/* WhatsApp + social */}
        <div>
          <h3 className="font-semibold text-white">Stay Connected</h3>
          <a
            href={whatsAppLink(`Hi ${SITE.name}, I'd like to book a cab.`)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 rounded-btn bg-whatsapp px-4 py-2.5 text-sm font-medium text-white hover:bg-whatsapp/90"
          >
            Chat on WhatsApp
          </a>
          <div className="mt-5 flex gap-3">
            <a
              href={SOCIAL_LINKS.facebook}
              aria-label="Facebook"
              className="grid size-9 place-items-center rounded-full bg-white/10 hover:bg-white/20"
            >
              <Share2 className="size-4" />
            </a>
            <a
              href={SOCIAL_LINKS.instagram}
              aria-label="Instagram"
              className="grid size-9 place-items-center rounded-full bg-white/10 hover:bg-white/20"
            >
              <Globe className="size-4" />
            </a>
            <a
              href={SOCIAL_LINKS.googleMaps}
              aria-label="Google Maps"
              className="grid size-9 place-items-center rounded-full bg-white/10 hover:bg-white/20"
            >
              <MapPin className="size-4" />
            </a>
          </div>
        </div>
      </Container>

      <div className="border-t border-white/10 py-5 text-center text-xs text-white/60">
        © {new Date().getFullYear()} {SITE.name}. All rights reserved.
      </div>
    </footer>
  );
}
