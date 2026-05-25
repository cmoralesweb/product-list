import type { SelectHTMLAttributes } from "react";

interface SelectOption {
  readonly value: string;
  readonly label: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  readonly options: readonly SelectOption[];
}

export function Select({ options, className = "", ...props }: SelectProps) {
  return (
    <select className={`select ${className}`} {...props}>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}
