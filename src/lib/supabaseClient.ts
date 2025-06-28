import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://dhtffsdywnapcrfyyyml.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRodGZmc2R5d25hcGNyZnl5eW1sIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA5MjQ5NjUsImV4cCI6MjA2NjUwMDk2NX0.3pEMBwS9sjbp1AUkpS5y4RaOt8OoYMlwOEz16x3iEFQ';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase; 