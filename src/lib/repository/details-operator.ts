import { SupabaseServer } from "../supabase/connection/supabase-server";
import { DetailsOperatorTable, DetailsOperatorTableInsert } from "../type";

export class DetailsOperatorRepository {
  static async getDetailsOperator(
    id: string
  ): Promise<DetailsOperatorTable[] | null> {
    const supabase = await SupabaseServer();
    const { data, error } = await supabase
      .from("details_operator")
      .select("*,userInfo:user_id(name)")
      .eq("id_operator", id);
    if (error) {
      return null;
    }
    return data as DetailsOperatorTable[];
  }

  static async addComment(
    body: DetailsOperatorTableInsert
  ): Promise<DetailsOperatorTable | null> {
    const supabase = await SupabaseServer();
    const { data, error } = await supabase
      .from("details_operator")
      .insert(body)
      .select("*")
      .single();
    if (error) {
      return null;
    }
    return data as DetailsOperatorTable;
  }
}
