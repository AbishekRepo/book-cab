import {
  ShieldCheck,
  BadgeIndianRupee,
  Clock,
  Headset,
  MapPin,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FEATURES } from "@/data/features";

const ICONS: Record<string, LucideIcon> = {
  ShieldCheck,
  BadgeIndianRupee,
  Clock,
  Headset,
  MapPin,
};

export function WhyChooseUs() {
  return (
    <section id="why-us" className="bg-white py-16">
      <Container>
        <SectionHeading
          eyebrow="Why Choose Us"
          title="Travel With Complete Peace of Mind"
          subtitle="Everything you need for a safe, comfortable and reliable journey."
        />

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature) => {
            const Icon = ICONS[feature.icon] ?? ShieldCheck;
            return (
              <Card key={feature.title} className="p-6">
                <span className="grid size-12 place-items-center rounded-btn bg-primary/10 text-primary">
                  <Icon className="size-6" />
                </span>
                <h3 className="mt-4 font-semibold text-heading">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm text-body">{feature.description}</p>
              </Card>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
