import { Database } from "@/lib/supabase/database.types";


type Tables = Database['public']['Tables'];

export type UserTable = Tables['user']['Row'];

export type UserTableInsert = Tables['user']['Insert'];

export type UserTableUpdate = Tables['user']['Update'];


 export interface UserTableWithRole extends UserTable {
    role?: {
        name: string;
    };
}