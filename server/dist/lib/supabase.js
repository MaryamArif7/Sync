"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const supabase_js_1 = require("@supabase/supabase-js");
const supabaseUrl = process.env.SUPABASE_URL || "https://yvubopfunxlwrqraxtxd.supabase.co";
const supabaseKey = process.env.SUPABASE_KEY;
if (!supabaseKey) {
    throw new Error('SUPABASE_KEY  is required');
}
const supabase = (0, supabase_js_1.createClient)(supabaseUrl, supabaseKey);
