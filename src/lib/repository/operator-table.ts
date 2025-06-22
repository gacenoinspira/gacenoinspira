import { SupabaseServer } from "../supabase/connection/supabase-server";
import { OperatorTableInsert, OperatorTableRow } from "../type";

export class OperatorTable {
  static createOperator = async (
    body: OperatorTableInsert
  ): Promise<OperatorTableRow> => {
    const supabase = await SupabaseServer();
    const { data, error } = await supabase
      .from("operator")
      .insert(body)
      .select("*")
      .single();
    if (error) {
      throw error;
    }
    return data as OperatorTableRow;
  };

  static getOperators = async (): Promise<OperatorTableRow[]> => {
    const supabase = await SupabaseServer();
    const { data, error } = await supabase
      .from("operator")
      .select("*,category:category_id(name),zone:zone_id(name)");
    if (error) {
      throw error;
    }
    return data as OperatorTableRow[];
  };

  static getOperatorById = async (id: string): Promise<OperatorTableRow> => {
    const supabase = await SupabaseServer();
    const { data, error } = await supabase
      .from("operator")
      .select("*,category:category_id(name),zone:zone_id(name)")
      .eq("id", id)
      .single();
    if (error) {
      throw error;
    }
    return data as OperatorTableRow;
  };
}
