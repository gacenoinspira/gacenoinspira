import { SupabaseServer } from "../supabase/connection/supabase-server";
import {
  OperatorTableInsert,
  OperatorTableRow,
  OperatorTableUpdate,
} from "../type";

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
    return data as unknown as OperatorTableRow;
  };

  static getOperators = async (): Promise<OperatorTableRow[]> => {
    const supabase = await SupabaseServer();
    const { data, error } = await supabase
      .from("operator")
      .select(
        "*,category:category_id(name),zone:zone_id(name),activityType:type_activity(name)"
      )
      .order("created_at", { ascending: false });
    if (error) {
      throw error;
    }
    return data as unknown as OperatorTableRow[];
  };

  static getOperatorById = async (id: string): Promise<OperatorTableRow> => {
    const supabase = await SupabaseServer();
    const { data, error } = await supabase
      .from("operator")
      .select(
        "*,category:category_id(name),zone:zone_id(name),activityType:type_activity(name)"
      )
      .eq("id", id)
      .single();
    if (error) {
      throw error;
    }
    return data as unknown as OperatorTableRow;
  };

  static updateOperator = async (
    id: string,
    body: OperatorTableUpdate
  ): Promise<OperatorTableRow> => {
    const supabase = await SupabaseServer();
    const { data, error } = await supabase
      .from("operator")
      .update(body)
      .eq("id", id)
      .select("*")
      .single();
    if (error) {
      throw error;
    }
    return data as unknown as OperatorTableRow;
  };

  static deleteOperator = async (id: string): Promise<boolean> => {
    const supabase = await SupabaseServer();
    const { error } = await supabase.from("operator").delete().eq("id", id);
    if (error) {
      return false;
    }
    return true;
  };
}
