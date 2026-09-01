import { createClient } from "@supabase/supabase-js";

// ⚠️ HANYA dipakai di server (Server Action / Route Handler).
// Service role key bisa bypass semua Row Level Security — jangan pernah
// diimpor ke komponen client.
export function createAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  );
}

export const STORAGE_BUCKET = "cda-images";
