import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { PopularRoutes } from "@/components/sections/PopularRoutes";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { Fleet } from "@/components/sections/Fleet";
import { Testimonials } from "@/components/sections/Testimonials";
import { CtaBanner } from "@/components/sections/CtaBanner";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        {/* <PopularRoutes /> */}
        {/* <WhyChooseUs /> */}
        {/* <Fleet /> */}
        <Testimonials />
        <CtaBanner />
      </main>
      <Footer />
    </>
  );
}
