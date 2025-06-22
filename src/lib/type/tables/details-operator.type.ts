import { Database } from "@/lib/supabase/database.types";

type Tables = Database["public"]["Tables"];

export type DetailsOperatorTable = Tables["details_operator"]["Row"];

export type DetailsOperatorTableInsert = Tables["details_operator"]["Insert"];

export type DetailsOperatorTableUpdate = Tables["details_operator"]["Update"];
