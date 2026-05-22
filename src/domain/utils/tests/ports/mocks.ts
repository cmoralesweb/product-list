import type { CacheService } from "@/domain/ports";

export function createMockCache(): CacheService {
  const store = new Map<string, string>();
  return {
    get: vi.fn((key: string) => {
      const raw = store.get(key);
      return raw ? JSON.parse(raw).data : null;
    }),
    set: vi.fn((key: string, value: unknown) => {
      store.set(key, JSON.stringify({ data: value }));
    }),
  };
}
