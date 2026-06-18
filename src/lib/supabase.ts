import { createClient } from "@supabase/supabase-js";

// Server-only Supabase-Client mit Service-Role-Key.
// Der Service-Role-Key umgeht RLS und darf NIEMALS in einer Client-Komponente
// importiert oder an den Browser ausgeliefert werden.
export function getSupabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    throw new Error("Supabase-Umgebungsvariablen fehlen.");
  }

  return createClient(url, key, {
    auth: { persistSession: false },
  });
}
