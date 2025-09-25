import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// Public client for browser usage (anon key only)
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

let supabase: SupabaseClient | null = null;

if (SUPABASE_URL && SUPABASE_ANON_KEY) {
  supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
} else {
  if (import.meta.env.DEV) {
    // eslint-disable-next-line no-console
    console.error(
      "Supabase is not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env. See .env.example."
    );
  }
}

export { supabase };

export function getSupabase(): SupabaseClient {
  if (!supabase) {
    throw new Error(
      "Supabase client not initialized. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY (see .env.example) and rebuild."
    );
  }
  return supabase;
}