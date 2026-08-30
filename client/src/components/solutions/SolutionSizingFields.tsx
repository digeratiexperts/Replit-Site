import { Minus, Plus } from "lucide-react";
import type { SizingField } from "@/data/solutionSizingFields";

interface SolutionSizingFieldsProps {
  fields: SizingField[];
  values: Record<string, string>;
  onChange: (key: string, value: string) => void;
}

/**
 * Renders the "help us size this" fields for a Solution Request — real
 * scope variables (seat count, sites, coverage hours, etc.), never a
 * dollar figure. See client/src/data/solutionSizingFields.ts for why.
 */
export function SolutionSizingFields({ fields, values, onChange }: SolutionSizingFieldsProps) {
  if (fields.length === 0) return null;

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {fields.map((field) => {
        if (field.type === "select") {
          return (
            <div key={field.key} className="space-y-2">
              <label htmlFor={`sizing-${field.key}`} className="block text-sm text-white/80">
                {field.label}
              </label>
              <select
                id={`sizing-${field.key}`}
                value={values[field.key] ?? field.options?.[0]?.value ?? ""}
                onChange={(event) => onChange(field.key, event.target.value)}
                className="h-11 w-full rounded-md border border-white/15 bg-de-raised px-3 text-sm text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D3126A]"
                data-testid={`sizing-select-${field.key}`}
              >
                {field.options?.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          );
        }

        const min = field.min ?? 0;
        const max = field.max ?? Number.MAX_SAFE_INTEGER;
        const current = Number(values[field.key]);
        const numeric = Number.isFinite(current) ? current : min;

        const setValue = (next: number) => {
          onChange(field.key, String(Math.min(max, Math.max(min, next))));
        };

        return (
          <div key={field.key} className="space-y-2">
            <label htmlFor={`sizing-${field.key}`} className="block text-sm text-white/80">
              {field.label}
            </label>
            <div className="flex h-11 items-stretch overflow-hidden rounded-md border border-white/15 bg-de-raised">
              <button
                type="button"
                onClick={() => setValue(numeric - 1)}
                aria-label={`Decrease ${field.label}`}
                className="flex w-11 shrink-0 items-center justify-center text-white/70 transition-colors hover:bg-white/5 hover:text-white"
                data-testid={`sizing-decrement-${field.key}`}
              >
                <Minus className="h-4 w-4" aria-hidden="true" />
              </button>
              <input
                id={`sizing-${field.key}`}
                type="number"
                inputMode="numeric"
                min={min}
                max={max}
                value={numeric}
                onChange={(event) => {
                  const raw = Number(event.target.value);
                  if (Number.isNaN(raw)) return;
                  setValue(raw);
                }}
                className="w-full min-w-0 bg-transparent text-center text-sm text-white focus-visible:outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                data-testid={`sizing-count-${field.key}`}
              />
              <button
                type="button"
                onClick={() => setValue(numeric + 1)}
                aria-label={`Increase ${field.label}`}
                className="flex w-11 shrink-0 items-center justify-center text-white/70 transition-colors hover:bg-white/5 hover:text-white"
                data-testid={`sizing-increment-${field.key}`}
              >
                <Plus className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
            {field.unit ? <p className="text-xs text-white/40">{field.unit}</p> : null}
          </div>
        );
      })}
    </div>
  );
}
