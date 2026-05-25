import { Input } from "@/presentation/components/atoms";

interface SearchInputProps {
  readonly value: string;
  readonly onChange: (value: string) => void;
}

export function SearchInput({ value, onChange }: SearchInputProps) {
  return (
    <div className="search-input">
      <label htmlFor="search">Search by brand or model</label>
      <Input
        id="search"
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
