import { createBrowserClient } from "@supabase/ssr";

const PLACEHOLDER_URL = "https://placeholder.supabase.co";
const PLACEHOLDER_KEY = "placeholder-key";

export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  return createBrowserClient(
    url && url !== "your-url-here" ? url : PLACEHOLDER_URL,
    key && key !== "your-key-here" ? key : PLACEHOLDER_KEY
  );
}
