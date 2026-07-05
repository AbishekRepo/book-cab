import { Star } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TESTIMONIALS } from "@/data/testimonials";
import { cn } from "@/lib/utils";

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={cn(
            "size-4",
            i < rating ? "fill-amber-400 text-amber-400" : "fill-gray-100 text-gray-200"
          )}
        />
      ))}
    </div>
  );
}

export function Testimonials() {
  return (
    <section className="bg-gradient-to-b from-slate-50 to-white py-16 lg:py-24">
      <Container>
        <SectionHeading
          eyebrow="Testimonials"
          title="What Our Customers Say"
          subtitle="Real reviews from travellers across Tamil Nadu."
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {TESTIMONIALS.map((t) => (
            <Card 
              key={t.id} 
              className="group relative flex flex-col p-6 bg-white border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:-translate-y-1 transition-all duration-300"
            >
              <Stars rating={t.rating} />
              <p className="mt-5 flex-1 text-sm leading-relaxed text-gray-600">
                &ldquo;{t.review}&rdquo;
              </p>
              
              <div className="mt-6 flex items-center gap-4 pt-4 border-t border-gray-50">
                <span className="grid size-11 place-items-center rounded-full bg-primary/10 font-bold text-primary">
                  {t.name.charAt(0)}
                </span>
                <div>
                  <p className="text-sm font-semibold text-gray-900">{t.name}</p>
                  <p className="text-xs font-medium text-gray-500 mt-0.5">{t.location}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
