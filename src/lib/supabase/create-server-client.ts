export const runtime = "nodejs";

import { createClient } from "@supabase/supabase-js";

export const createServerClient = () => {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SERVICE_ROLE_KEY!,
  );
};
