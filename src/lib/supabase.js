import { createClient } from '@supabase/supabase-js';

// TODO: Replace with your actual Supabase project credentials
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://xxxxxxxxxxxxxxxxxxxx.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI...';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
