import { Database } from "@/lib/supabase/database.types";

type Tables = Database["public"]["Tables"];

export type OperatorTable = Tables["operator"]["Row"];

export type OperatorTableInsert = Tables["operator"]["Insert"];

export interface OperatorTableRow extends OperatorTable {
  type_activity: number;
  category?: { name: string };
  zone?: { name: string };
}
