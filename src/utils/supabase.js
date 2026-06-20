import { createClient } from "@supabase/supabase-js";

// Create a single supabase client for interacting with your database
// eslint-disable-next-line no-unused-vars
export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
//   import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
);
