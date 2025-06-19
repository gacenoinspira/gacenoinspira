"use server";

import { SupabaseServer } from "../supabase/connection/supabase-server";


export const logoutAction = async () => {
    const supabase = await SupabaseServer();
    await supabase.auth.signOut();
  };
  