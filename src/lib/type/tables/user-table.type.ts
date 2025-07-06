import { Database } from "@/lib/supabase/database.types";

type Tables = Database["public"]["Tables"];

export type UserTable = Tables["user"]["Row"];

export type UserTableInsertBase = Tables["user"]["Insert"];

export type UserTableUpdateBase = Tables["user"]["Update"];

export interface UserTableWithRole extends UserTable {
  role?: {
    name: string;
  };
  avatar?: string;
}

export interface UserTableInsert extends UserTableInsertBase {
  avatar?: string;
}

export interface UserTableUpdate extends UserTableUpdateBase {
  avatar?: string;
}
