interface BadgeProps {
  readonly count: number;
}

export function Badge({ count }: BadgeProps) {
  if (count === 0) return null;
  return <span className="badge">{count}</span>;
}
