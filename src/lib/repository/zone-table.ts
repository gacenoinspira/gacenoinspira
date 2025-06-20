import { SupabaseServer } from "../supabase/connection/supabase-server";
import { ResponseType, ZoneTableInsert, ZoneTableRow } from "../type";

export class ZoneTable {
  static async registerZone(
    body: ZoneTableInsert
  ): Promise<ResponseType<ZoneTableRow | null>> {
    const supabase = await SupabaseServer();
    const { data, error } = await supabase
      .from("zone")
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

  static async getZones(): Promise<ResponseType<ZoneTableRow[] | null>> {
    const supabase = await SupabaseServer();
    const { data, error } = await supabase.from("zone").select();

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
