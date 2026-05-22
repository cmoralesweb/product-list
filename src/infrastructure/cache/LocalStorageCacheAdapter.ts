import type { CacheService } from "@/domain/ports";

interface CacheEntry<T> {
  data: T;
  expiresAt: number;
}

export class LocalStorageCacheAdapter implements CacheService {
  private readonly prefix: string;

  constructor(prefix = "app_cache_") {
    this.prefix = prefix;
  }

  get<T>(key: string): T | null {
    const raw = localStorage.getItem(this.prefix + key);
    if (!raw) return null;

    try {
      const entry: CacheEntry<T> = JSON.parse(raw);
      if (Date.now() > entry.expiresAt) {
        localStorage.removeItem(this.prefix + key);
        return null;
      }
      return entry.data;
    } catch {
      localStorage.removeItem(this.prefix + key);
      return null;
    }
  }

  set<T>(key: string, value: T, ttlMs: number): void {
    const entry: CacheEntry<T> = {
      data: value,
      expiresAt: Date.now() + ttlMs,
    };
    localStorage.setItem(this.prefix + key, JSON.stringify(entry));
  }
}
