
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://xbusvsdvuwevwcjhwhsk.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhidXN2c2R2dXdldndjamh3aHNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU1MTUyNDIsImV4cCI6MjA2MTA5MTI0Mn0.EUeITxR_CRwremC8M6mb-ZTlEvkPDl5moznyGq7iAHk';




export const supabase = createClient(supabaseUrl, supabaseAnonKey);
