import { createClient } from '@supabase/supabase-js';

export const supabaseUrl = 'https://mnciloaqtpfggmanhbwy.supabase.co';
 const supabase = createClient(
  supabaseUrl,
  import.meta.env.VITE_SUPABASE_API_KEY
);

export default supabase;
