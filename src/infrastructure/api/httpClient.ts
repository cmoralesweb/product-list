import { API_CONFIG } from "@/infrastructure/config/apiConfig";

export class HttpClient {
  private readonly baseUrl: string;

  constructor(baseUrl?: string) {
    this.baseUrl = baseUrl ?? API_CONFIG.baseUrl;
  }

  async get<T>(path: string): Promise<T> {
    const res = await fetch(`${this.baseUrl}${path}`);
    if (!res.ok) throw new Error(`GET ${path} failed: ${res.status}`);
    return res.json() as Promise<T>;
  }

  async post<TBody, TResponse>(path: string, body: TBody): Promise<TResponse> {
    const res = await fetch(`${this.baseUrl}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!res.ok) throw new Error(`POST ${path} failed: ${res.status}`);
    return res.json() as Promise<TResponse>;
  }
}

export const httpClient = new HttpClient();
