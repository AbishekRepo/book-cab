import { ArrowRight, MapPin } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { POPULAR_ROUTES } from "@/data/routes";
import { bookingLinkForRoute } from "@/lib/whatsapp";
import { formatINR } from "@/lib/utils";

export function PopularRoutes() {
  return (
    <section id="routes" className="py-16">
      <Container>
        <SectionHeading
          eyebrow="Outstation"
          title="Popular Routes"
          subtitle="Frequently booked trips at transparent starting fares."
        />

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {POPULAR_ROUTES.map((route) => (
            <Card key={route.id} className="flex flex-col p-5">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 size-5 shrink-0 text-primary" />
                <div className="text-heading">
                  <p className="font-semibold">{route.from}</p>
                  <p className="text-sm text-body">to</p>
                  <p className="font-semibold">{route.to}</p>
                </div>
              </div>

              <div className="mt-4 flex items-end justify-between">
                <div>
                  <p className="text-xs text-body">Starting</p>
                  <p className="text-xl font-bold text-primary">
                    {formatINR(route.startingPrice)}
                  </p>
                </div>
                <a
                  href={bookingLinkForRoute(route.from, route.to)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm font-semibold text-secondary hover:text-primary"
                >
                  Book Now
                  <ArrowRight className="size-4" />
                </a>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
