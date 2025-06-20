import { SupabaseServer } from "../supabase/connection/supabase-server";
import { CategoryTableRow } from "../type";

export class CategoryTable {
  static async getCategories(): Promise<CategoryTableRow[]> {
    const supabase = await SupabaseServer();
    const { data, error } = await supabase.from("category").select();
    if (error) {
      return [];
    }
    return data;
  }
}
