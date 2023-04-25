import { createClient } from "@supabase/supabase-js";

// export const client = createClient(
//     "https://zjhmrnstdyhghaqupqxr.supabase.co", 
//     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpqaG1ybnN0ZHloZ2hhcXVwcXhyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODEyNDYzMDMsImV4cCI6MTk5NjgyMjMwM30.ISWgU3QCPb73DsPphHPNpWAMT_xUKA25UvYXc8IqeWs"
//     )
export const client = createClient(import.meta.env.VITE_APP_SUPABASE_URL, import.meta.env.VITE_APP_SUPABASE_API_KEY)