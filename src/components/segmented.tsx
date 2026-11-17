"use client";

import type { Messages } from "@/i18n/vi";
import type { PricedService } from "@/data/pricing";

interface SegmentedProps<V extends string> {
  /** Group label for screen readers. */
  label: string;
  options: readonly { id: V; label: string }[];
  value: V;
  onChange: (v: V) => void;
  className?: string;
}

/** Row of toggle buttons (one pressed at a time), styled by `.seg`. */
export function Segmented<V extends string>({ label, options, value, onChange, className = "seg" }: SegmentedProps<V>) {
  return (
    <div className={className} role="group" aria-label={label}>
      {options.map((o) => (
        <button key={o.id} type="button" aria-pressed={value === o.id} onClick={() => onChange(o.id)}>
          {o.label}
        </button>
      ))}
    </div>
  );
}

/** The two services offered by the estimator and the process stepper. */
export const serviceOptions = (m: Messages): { id: PricedService; label: string }[] => [
  { id: "look", label: m.common.lookbook },
  { id: "cat", label: m.common.catalog },
];
