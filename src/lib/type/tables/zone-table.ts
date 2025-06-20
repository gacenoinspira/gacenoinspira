import { Database } from "@/lib/supabase/database.types";


type Tables = Database['public']['Tables'];

export type ZoneTableRow = Tables['zone']['Row'];

export type ZoneTableInsert = Tables['zone']['Insert'];

export type ZoneTableUpdate = Tables['zone']['Update'];
