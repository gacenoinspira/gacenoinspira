import { Database } from "@/lib/supabase/database.types";


type Tables = Database['public']['Tables'];

export type CategoryTableRow = Tables['category']['Row'];

export type CategoryTableInsert = Tables['category']['Insert'];

export type CategoryTableUpdate = Tables['category']['Update'];