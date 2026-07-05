import { Phone, MessageCircle } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/Button";
import { SITE } from "@/constants/site";
import { whatsAppLink } from "@/lib/whatsapp";

export function CtaBanner() {
  return (
    <section className="py-16">
      <Container>
        <div className="overflow-hidden rounded-card bg-secondary px-6 py-12 text-center text-white sm:px-12">
          <h2 className="text-2xl font-bold sm:text-3xl">Need a Cab Today?</h2>
          <p className="mx-auto mt-3 max-w-xl text-white/80">
            Call us or message on WhatsApp — we&apos;ll get you moving in
            minutes, any time of day.
          </p>

          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <LinkButton href={`tel:+${SITE.phone}`} size="lg">
              <Phone className="size-5" />
              Call Us
            </LinkButton>
            <LinkButton
              href={whatsAppLink(`Hi ${SITE.name}, I'd like to book a cab.`)}
              target="_blank"
              rel="noopener noreferrer"
              variant="whatsapp"
              size="lg"
            >
              <MessageCircle className="size-5" />
              WhatsApp Us
            </LinkButton>
          </div>
        </div>
      </Container>
    </section>
  );
}
