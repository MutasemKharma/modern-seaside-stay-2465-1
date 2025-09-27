export const BRAND_NAME = import.meta.env.VITE_BRAND_NAME ?? "BRAND_NAME";

export const PLATFORM_CONTACT_EMAIL = import.meta.env.VITE_SUPPORT_EMAIL ?? "support@example.com";

export const DEFAULT_CASHBACK_PERCENT = Number(import.meta.env.VITE_CASHBACK_PERCENT ?? 7);

export const COD_PROVINCES = (import.meta.env.VITE_COD_PROVINCES ?? "")
  .split(",")
  .map((province) => province.trim())
  .filter(Boolean);
