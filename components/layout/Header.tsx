"use client";

import { useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/Button";
import { NAV_LINKS, SITE } from "@/constants/site";
import { cn } from "@/lib/utils";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/60 backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between">
        <a href="#home" className="flex items-center">
          <img src="/shami_logo.png" alt={SITE.name} className="h-12 w-auto object-contain scale-110 origin-left" />
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 lg:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-white/80 transition-colors hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <LinkButton
            href={`tel:+${SITE.phone}`}
            size="sm"
            className="hidden sm:inline-flex"
          >
            <Phone className="size-4" />
            Call Now
          </LinkButton>

          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="grid size-10 place-items-center rounded-btn text-white hover:bg-white/10 lg:hidden"
          >
            {open ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </Container>

      {/* Mobile drawer */}
      <div
        className={cn(
          "overflow-hidden border-t border-white/10 bg-black/60 backdrop-blur-md transition-[max-height] duration-300 lg:hidden",
          open ? "max-h-96" : "max-h-0"
        )}
      >
        <Container className="flex flex-col gap-1 py-3">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-btn px-3 py-2.5 text-sm font-medium text-white/80 hover:bg-white/10 hover:text-white"
            >
              {link.label}
            </a>
          ))}
          <LinkButton href={`tel:+${SITE.phone}`} className="mt-2">
            <Phone className="size-4" />
            Call Now
          </LinkButton>
        </Container>
      </div>
    </header>
  );
}
