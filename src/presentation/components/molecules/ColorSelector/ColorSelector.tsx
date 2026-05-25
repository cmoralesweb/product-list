import { useId } from "react";
import type { ColorOption } from "@/domain/models";
import { Select } from "@/presentation/components/atoms";

interface ColorSelectorProps {
  readonly options: readonly ColorOption[];
  readonly selected: number | null;
  readonly onChange: (code: number) => void;
}

export function ColorSelector({
  options,
  selected,
  onChange,
}: ColorSelectorProps) {
  const labelId = useId();
  return (
    <div className="color-selector">
      <label htmlFor={labelId}>Color</label>
      <Select
        id={labelId}
        options={options.map((o) => ({ value: String(o.code), label: o.name }))}
        value={selected !== null ? String(selected) : ""}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </div>
  );
}
