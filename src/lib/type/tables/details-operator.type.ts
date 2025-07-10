import { Database } from "@/lib/supabase/database.types";

type Tables = Database["public"]["Tables"];

export type DetailsOperatorTableBase = Tables["details_operator"]["Row"];

export type DetailsOperatorTableInsert = Tables["details_operator"]["Insert"];

export type DetailsOperatorTableUpdate = Tables["details_operator"]["Update"];

export interface DetailsOperatorTable extends DetailsOperatorTableBase {
  userInfo?: {
    name: string;
  };
  operator?: {
    name_company: string;
    logo: string;
    type_activity: number;
    id: string;
    name: string;
  };
}
