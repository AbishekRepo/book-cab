import { Star, Users, Check } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/Button";
import { QuoteForm } from "@/components/sections/QuoteForm";
import { SITE } from "@/constants/site";

const SERVICES = ["Round Trips", "Local Packages", "Available 24×7"];

export function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden bg-cover bg-[center_80%] bg-no-repeat pt-8 pb-10 lg:pt-16 lg:pb-12"
      style={{ backgroundImage: "url('/shamicabs-heroimage2.png')" }}
    >
      <div className="absolute inset-0 bg-black/60" />
      <Container className="relative grid items-center gap-4 lg:gap-7 lg:grid-cols-12">
        {/* Left */}
        <div className="lg:col-span-7 xl:col-span-7 mt-8 lg:mt-20">
          <span className="hidden lg:inline-flex items-center gap-1.5 rounded-full bg-white/20 backdrop-blur-md px-3 py-1 text-sm font-medium text-white border border-white/10">
            <Star className="size-4 fill-white text-white" />
            {SITE.rating} Google Rating · {SITE.happyCustomers} Happy Customers
          </span>

          <h1 className="text-2xl font-bold leading-tight text-white sm:text-3xl lg:text-3xl lg:mt-5">
            Your Trusted Taxi Partner Across{" "}
            <span className="text-primary">Tamil Nadu</span>
          </h1>

          <ul className="mt-3 lg:mt-6 flex flex-wrap gap-x-3 lg:gap-x-5 gap-y-1 lg:gap-y-2">
            {SERVICES.map((service) => (
              <li
                key={service}
                className="flex items-center gap-1 lg:gap-1.5 text-[10px] lg:text-sm text-gray-200"
              >
                <Check className="size-3 lg:size-4 text-primary" />
                {service}
              </li>
            ))}
          </ul>

          <div className="mt-8 hidden lg:flex flex-wrap items-center gap-3">
            <LinkButton href="#quote" size="lg">
              Check Fare
            </LinkButton>
            <div className="flex items-center gap-2 text-sm text-gray-200">
              <Users className="size-5 text-white" />
              Trusted by {SITE.happyCustomers} travellers
            </div>
          </div>
        </div>

        {/* Right — quote form */}
        <div className="lg:col-span-5 xl:col-span-5 xl:col-start-8 mt-2 lg:mt-0">
          <QuoteForm />
        </div>
      </Container>
    </section>
  );
}
