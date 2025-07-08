import { Database } from "@/lib/supabase/database.types";

type Tables = Database["public"]["Tables"];

export type OperatorTable = Tables["operator"]["Row"];

export type OperatorTableInsertBase = Tables["operator"]["Insert"];

export type OperatorTableUpdateBase = Tables["operator"]["Update"];

export interface OperatorTableRow extends OperatorTable {
  type_activity: number;
  category?: { name: string };
  zone?: { name: string };
  activity?: string[];
  rules?: string[];
  indications?: string;
  blog?: string[];
  activityType?: { name: string };
}

export interface OperatorTableInsert extends OperatorTableInsertBase {
  type_activity: number;
  category_id: number;
  zone_id: number;
  activity?: string[];
  rules?: string[];
  indications?: string;
  blog?: string[];
}

export interface OperatorTableUpdate extends OperatorTableUpdateBase {
  type_activity?: number;
  category_id?: number;
  zone_id?: number;
  activity?: string[];
  rules?: string[];
  indications?: string;
  blog?: string[];
}
