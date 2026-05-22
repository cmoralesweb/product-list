export const API_CONFIG = {
  baseUrl:
    import.meta.env.VITE_API_BASE_URL ??
    "https://itx-frontend-test.onrender.com",
} as const;
