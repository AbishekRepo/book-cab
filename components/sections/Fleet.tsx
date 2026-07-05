import { Users, Snowflake, Car } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LinkButton } from "@/components/ui/Button";
import { VEHICLES } from "@/data/vehicles";
import { formatRupees } from "@/lib/whatsapp";

export function Fleet() {
  return (
    <section id="fleet" className="py-16">
      <Container>
        <SectionHeading
          eyebrow="Our Fleet"
          title="Choose the Right Ride"
          subtitle="Clean, well-maintained vehicles for every group size and budget."
        />

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {VEHICLES.map((vehicle) => (
            <Card key={vehicle.id} className="overflow-hidden">
              {/* Image placeholder — swap for a real photo later */}
              <div className="grid h-40 place-items-center bg-surface text-body">
                <Car className="size-14 opacity-40" />
              </div>

              <div className="p-5">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-heading">{vehicle.name}</h3>
                  <span className="rounded-full bg-secondary/10 px-2.5 py-0.5 text-xs font-medium text-secondary">
                    {vehicle.category}
                  </span>
                </div>

                <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm text-body">
                  <span className="flex items-center gap-1.5">
                    <Users className="size-4" />
                    {vehicle.seats} Seats
                  </span>
                  {vehicle.ac && (
                    <span className="flex items-center gap-1.5">
                      <Snowflake className="size-4" />
                      AC
                    </span>
                  )}
                </div>

                <div className="mt-4 flex items-end justify-between">
                  <div>
                    <p className="text-xs text-body">Starting</p>
                    <p className="text-lg font-bold text-primary">
                      {formatRupees(vehicle.startingPrice)}
                      <span className="text-xs font-normal text-body">/km</span>
                    </p>
                  </div>
                  <LinkButton href="#quote" variant="secondary" size="sm">
                    Book
                  </LinkButton>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
