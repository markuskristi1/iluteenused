require("dotenv").config();

const { createClient } = require("@supabase/supabase-js");

const supabaseKey = process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_KEY;

if (!process.env.SUPABASE_URL || !supabaseKey) {
    throw new Error("Supabase env variables are missing.");
}

const supabase = createClient(process.env.SUPABASE_URL, supabaseKey);

module.exports = supabase;