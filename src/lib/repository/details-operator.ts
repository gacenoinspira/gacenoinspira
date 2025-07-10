import { SupabaseServer } from "../supabase/connection/supabase-server";
import {
  DetailsOperatorTable,
  DetailsOperatorTableInsert,
  DetailsOperatorTableUpdate,
} from "../type";

export class DetailsOperatorRepository {
  static async getDetailsOperator(
    id: string
  ): Promise<DetailsOperatorTable[] | null> {
    const supabase = await SupabaseServer();
    const { data, error } = await supabase
      .from("details_operator")
      .select("*,userInfo:user_id(name),operator:id_operator(name_company)")
      .eq("id_operator", id);
    console.log("data error details", error?.message);
    if (error) {
      return null;
    }
    return data as unknown as DetailsOperatorTable[];
  }

  static async getDetailsOperatorByUser(
    id: string
  ): Promise<DetailsOperatorTable[] | null> {
    const supabase = await SupabaseServer();
    const { data, error } = await supabase
      .from("details_operator")
      .select(
        "*,userInfo:user_id(name),operator:id_operator(name_company,logo,type_activity,id,name)"
      )
      .eq("user_id", id)
      .order("created_at", { ascending: false });
    console.log("data error perfil", error?.message);
    if (error) {
      return null;
    }
    return data as unknown as DetailsOperatorTable[];
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
    console.log("data error", error?.message);
    if (error) {
      return null;
    }
    return data as DetailsOperatorTable;
  }

  static async updateDetails(
    body: DetailsOperatorTableUpdate,
    id: string,
    user_id: string
  ): Promise<DetailsOperatorTable | null> {
    console.log("body", body);
    console.log("id", id);
    console.log("user_id", user_id);
    const supabase = await SupabaseServer();
    const { data, error } = await supabase
      .from("details_operator")
      .update(body)
      .eq("id_operator", id)
      .eq("user_id", user_id)
      .select("*")
      .single();
    console.log("data error", error?.message);
    if (error) {
      return null;
    }
    return data as DetailsOperatorTable;
  }
}
