/* eslint-disable @typescript-eslint/no-explicit-any */
import { SupabaseServer } from "../supabase/connection/supabase-server";
import { ResponseType } from "../type";

export class ImagePageTable {
  static async insertImagePageTable(imagePageTable: {
    home: string;
    discovery: string;
  }): Promise<ResponseType<any>> {
    const supabase = await SupabaseServer();
    const { data, error } = await supabase
      .from("img-page" as any)
      .insert(imagePageTable as any)
      .select("*")
      .single();
    console.log("error", error);
    console.log("data", data);
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

  static async getImagePageTable(): Promise<ResponseType<any>> {
    const supabase = await SupabaseServer();
    const { data, error } = await supabase.from("img-page" as any).select().single();
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

  static async updateImagePageTable(imagePageTable: {
    home?: string;
    discovery?: string;
  }): Promise<ResponseType<any>> {
    const supabase = await SupabaseServer();
    const { data, error } = await supabase
      .from("img-page" as any)
      .update(imagePageTable as any)
      .eq("id", 1)
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
}
