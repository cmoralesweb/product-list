import { useId } from "react";
import type { StorageOption } from "@/domain/models";
import { Select } from "@/presentation/components/atoms";

interface StorageSelectorProps {
  readonly options: readonly StorageOption[];
  readonly selected: number | null;
  readonly onChange: (code: number) => void;
}

export function StorageSelector({
  options,
  selected,
  onChange,
}: StorageSelectorProps) {
  const labelId = useId();
  return (
    <div className="storage-selector">
      <label htmlFor={labelId}>Storage</label>
      <Select
        id={labelId}
        options={options.map((o) => ({ value: String(o.code), label: o.name }))}
        value={selected !== null ? String(selected) : ""}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </div>
  );
}
