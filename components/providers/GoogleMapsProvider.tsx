"use client";

import { APIProvider } from "@vis.gl/react-google-maps";

/**
 * @vis.gl/react-google-maps's main build doesn't ship a "use client"
 * directive, so importing APIProvider straight into a server component
 * breaks the RSC client boundary (createContext throws). This wrapper
 * carries the directive itself so the whole subtree renders as client.
 */
export function GoogleMapsProvider({ children }: { children: React.ReactNode }) {
  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
      {children}
    </APIProvider>
  );
}
