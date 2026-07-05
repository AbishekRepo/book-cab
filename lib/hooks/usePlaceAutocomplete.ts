import { useCallback, useMemo, useState } from "react";
import { useMapsLibrary } from "@vis.gl/react-google-maps";

export interface PlaceDetails {
  formattedAddress: string;
  lat: number;
  lng: number;
}

/**
 * Suggestion shape returned by the new
 * `google.maps.places.AutocompleteSuggestion` API (Places API: New).
 * We expose only the fields our UI needs so components never touch
 * `google.maps.*` directly.
 */
export interface PlaceSuggestion {
  /** Unique stable place id */
  placeId: string;
  /** Primary text, e.g. "Chennai Airport" */
  mainText: string;
  /** Secondary text, e.g. "Chennai, Tamil Nadu, India" */
  secondaryText: string;
  /** Full human-readable description for display / fallback */
  description: string;
}

/**
 * Wraps the new Google Places `AutocompleteSuggestion.fetchAutocompleteSuggestions()`
 * API behind a small promise-based interface.
 *
 * Migration from the legacy `AutocompleteService`:
 *   OLD: new placesLib.AutocompleteService()
 *   NEW: placesLib.AutocompleteSuggestion.fetchAutocompleteSuggestions(request)
 *        (static async method, no instantiation required)
 *
 * Session tokens are still created and rotated the same way — one token
 * per autocomplete session (series of keystrokes → one place selection).
 *
 * Restricts suggestions to India for this Tamil Nadu taxi service.
 */
export function usePlaceAutocomplete() {
  const placesLib = useMapsLibrary("places");

  // Bumping this counter causes useMemo to create a fresh session token,
  // rotating it after each place-details fetch (Google billing guidance).
  const [tokenGeneration, setTokenGeneration] = useState(0);

  const sessionToken = useMemo(
    () => (placesLib ? new placesLib.AutocompleteSessionToken() : undefined),
    // eslint-disable-next-line react-hooks/exhaustive-deps -- tokenGeneration is a deliberate rotation trigger
    [placesLib, tokenGeneration]
  );

  /**
   * Fetch autocomplete suggestions using the new Places API.
   * Returns an empty array on any error or when the library isn't ready.
   */
  const fetchPredictions = useCallback(
    async (input: string): Promise<PlaceSuggestion[]> => {
      if (!placesLib || !input.trim()) return [];

      try {
        const { suggestions } =
          await placesLib.AutocompleteSuggestion.fetchAutocompleteSuggestions({
            input,
            sessionToken,
            includedRegionCodes: ["in"],
          });

        return suggestions
          .filter((s) => s.placePrediction !== null)
          .map((s) => {
            const pred = s.placePrediction!;
            return {
              placeId: pred.placeId,
              mainText: pred.mainText?.toString() ?? "",
              secondaryText: pred.secondaryText?.toString() ?? "",
              description: pred.text?.toString() ?? "",
            };
          });
      } catch {
        return [];
      }
    },
    [placesLib, sessionToken]
  );

  /**
   * Fetch the formatted address and coordinates for a selected place.
   * Uses the new `google.maps.places.Place` class with `fetchFields()`.
   *
   * Migration from the legacy `PlacesService.getDetails()`:
   *   OLD: placesService.getDetails({ placeId, sessionToken, fields: [...] }, callback)
   *   NEW: new Place({ id: placeId }).fetchFields({ fields: [...] })  (promise-based)
   */
  const fetchPlaceDetails = useCallback(
    async (placeId: string): Promise<PlaceDetails | null> => {
      if (!placesLib) return null;

      try {
        const place = new placesLib.Place({ id: placeId });
        await place.fetchFields({
          fields: ["formattedAddress", "location"],
        });

        // Rotate session token after a completed session (one place selected).
        setTokenGeneration((g) => g + 1);

        const location = place.location;
        if (!location) return null;

        return {
          formattedAddress: place.formattedAddress ?? "",
          lat: location.lat(),
          lng: location.lng(),
        };
      } catch {
        // Rotate even on failure so a stale token doesn't persist.
        setTokenGeneration((g) => g + 1);
        return null;
      }
    },
    [placesLib]
  );

  return {
    fetchPredictions,
    fetchPlaceDetails,
    isReady: !!placesLib,
  };
}
