import { SupabaseServer } from "../supabase/connection/supabase-server";
import { UserTableInsert, ResponseType, UserTableWithRole } from "../type";

export class UserTable {
  static async registerUser(
    body: UserTableInsert
  ): Promise<ResponseType<UserTableWithRole | null>> {
    const supabase = await SupabaseServer();
    const { data, error } = await supabase
      .from("user")
      .insert([body])
      .select("*")
      .single();
    if (error) {
      return {
        status: false,
        data: null,
        error: error.message,
      };
    }
    return {
      status: true,
      data: data,
      error: "",
    };
  }

  static async getUserById(
    id: string
  ): Promise<ResponseType<UserTableWithRole | null>> {
    const supabase = await SupabaseServer();
    const { data, error } = await supabase
      .from("user")
      .select("*")
      .eq("user_id", id)
      .single();
    if (error) {
      return {
        status: false,
        data: null,
        error: error.message,
      };
    }
    return {
      status: true,
      data: data,
      error: "",
    };
  }
}
