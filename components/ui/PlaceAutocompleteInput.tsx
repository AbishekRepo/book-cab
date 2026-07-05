"use client";

import { useEffect, useId, useRef, useState } from "react";
import { usePlaceAutocomplete, type PlaceSuggestion } from "@/lib/hooks/usePlaceAutocomplete";
import { cn } from "@/lib/utils";

const controlBase =
  "w-full rounded-input border border-line bg-white px-3.5 py-2.5 text-sm text-heading " +
  "placeholder:text-body/60 transition-colors focus:border-primary focus:outline-none " +
  "focus:ring-4 focus:ring-primary/15 disabled:opacity-60 aria-[invalid=true]:border-red-400";

/**
 * Controlled Google Places autocomplete text input. Mirrors the
 * VehicleSelector value/onChange contract so it plugs into react-hook-form
 * via a Controller. Only ever hands the parent a plain formatted-address
 * string, so QuoteInput/quoteSchema need no changes.
 *
 * Uses the new Places API (AutocompleteSuggestion + Place.fetchFields) via
 * the usePlaceAutocomplete hook – no longer touches the deprecated
 * AutocompleteService or PlacesService classes.
 */
export function PlaceAutocompleteInput({
  id,
  value,
  onChange,
  placeholder,
  invalid,
}: {
  id?: string;
  value?: string;
  onChange: (address: string) => void;
  placeholder?: string;
  invalid?: boolean;
}) {
  const { fetchPredictions, fetchPlaceDetails } = usePlaceAutocomplete();
  const listboxId = useId();

  const [inputValue, setInputValue] = useState(value ?? "");
  const [suggestions, setSuggestions] = useState<PlaceSuggestion[]>([]);
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  // Resync internal text from an external value change (e.g. form reset)
  // during render rather than in an effect — avoids an extra render pass.
  const [prevValue, setPrevValue] = useState(value);
  if (value !== prevValue) {
    setPrevValue(value);
    setInputValue(value ?? "");
  }

  const containerRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    function onClickOutside(event: MouseEvent) {
      if (!containerRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  function handleInputChange(text: string) {
    setInputValue(text);
    onChange(text);
    setActiveIndex(-1);

    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      const results = await fetchPredictions(text);
      setSuggestions(results);
      setOpen(results.length > 0);
    }, 300);
  }

  async function selectSuggestion(suggestion: PlaceSuggestion) {
    setOpen(false);
    setSuggestions([]);
    const details = await fetchPlaceDetails(suggestion.placeId);
    const address = details?.formattedAddress ?? suggestion.description;
    setInputValue(address);
    onChange(address);
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (!open || suggestions.length === 0) return;

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((i) => (i + 1) % suggestions.length);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((i) => (i - 1 + suggestions.length) % suggestions.length);
    } else if (event.key === "Enter") {
      if (activeIndex >= 0) {
        event.preventDefault();
        void selectSuggestion(suggestions[activeIndex]);
      }
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }

  return (
    <div ref={containerRef} className="relative">
      <input
        id={id}
        type="text"
        role="combobox"
        aria-expanded={open}
        aria-controls={listboxId}
        aria-autocomplete="list"
        aria-invalid={invalid}
        autoComplete="off"
        placeholder={placeholder}
        className={cn(controlBase)}
        value={inputValue}
        onChange={(e) => handleInputChange(e.target.value)}
        onFocus={() => suggestions.length > 0 && setOpen(true)}
        onKeyDown={handleKeyDown}
      />
      {open && (
        <ul
          id={listboxId}
          role="listbox"
          className="absolute z-20 mt-1.5 w-full overflow-hidden rounded-input border border-line bg-white shadow-card"
        >
          {suggestions.map((suggestion, index) => (
            <li key={suggestion.placeId} role="option" aria-selected={index === activeIndex}>
              <button
                type="button"
                className={cn(
                  "w-full px-3.5 py-2.5 text-left text-sm text-heading transition-colors",
                  index === activeIndex ? "bg-primary/10" : "hover:bg-primary/5"
                )}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => void selectSuggestion(suggestion)}
                onMouseEnter={() => setActiveIndex(index)}
              >
                <span className="font-medium">{suggestion.mainText}</span>{" "}
                <span className="text-body/70">{suggestion.secondaryText}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
