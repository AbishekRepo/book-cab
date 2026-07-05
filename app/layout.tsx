import type { Metadata } from "next";
import { Poppins, Geist } from "next/font/google";
import { GoogleMapsProvider } from "@/components/providers/GoogleMapsProvider";
import "./globals.css";
import { SITE } from "@/constants/site";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${SITE.name} — Trusted Taxi Service Across Tamil Nadu`,
    template: `%s | ${SITE.name}`,
  },
  description:
    "Book airport transfers, one-way taxis, round trips and local packages across Tamil Nadu. Transparent pricing, safe drivers, available 24×7. Check fare & book on WhatsApp.",
  keywords: [
    "taxi Tamil Nadu",
    "airport transfer",
    "one way taxi",
    "outstation cab",
    "Chennai taxi",
  ],
  openGraph: {
    title: `${SITE.name} — Trusted Taxi Service Across Tamil Nadu`,
    description:
      "Airport transfers, one-way taxis, round trips & local packages. Available 24×7.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", poppins.variable, "font-sans", geist.variable)}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <GoogleMapsProvider>{children}</GoogleMapsProvider>
      </body>
    </html>
  );
}
