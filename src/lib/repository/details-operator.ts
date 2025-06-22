import { SupabaseServer } from "../supabase/connection/supabase-server";
import { DetailsOperatorTable } from "../type";

export class DetailsOperatorRepository {
  static async getDetailsOperator(
    id: string
  ): Promise<DetailsOperatorTable | null> {
    const supabase = await SupabaseServer();
    const { data, error } = await supabase
      .from("details_operator")
      .select("*")
      .eq("id_operator", id)
      .single();
    if (error) {
      return null;
    }
    return data;
  }
}
