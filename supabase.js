const SUPABASE_URL = "https://hsddoiwnuccnkdnczfkm.supabase.co";

const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_F768ZU_xS18ydRLCKEYvDg_z5zdhvlL";

const { createClient } = window.supabase;

const supabaseClient = createClient(
    SUPABASE_URL,
    SUPABASE_PUBLISHABLE_KEY
);


console.log("Supabase client:", supabaseClient);
console.log("Supabase connection file loaded!");