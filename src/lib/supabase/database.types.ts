import { SupabaseServer } from "../supabase/connection/supabase-server";


export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          query?: string
          operationName?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      activity: {
        Row: {
          created_at: string
          description: string
          duration: number | null
          id: string
          id_operator: string
          img: Json | null
          items: Json | null
          max_age: number | null
          min_age: number | null
          name: string
          price: number | null
          range_time_off: Json | null
          recomendation: string | null
          type_activity: string | null
        }
        Insert: {
          created_at?: string
          description: string
          duration?: number | null
          id?: string
          id_operator: string
          img?: Json | null
          items?: Json | null
          max_age?: number | null
          min_age?: number | null
          name: string
          price?: number | null
          range_time_off?: Json | null
          recomendation?: string | null
          type_activity?: string | null
        }
        Update: {
          created_at?: string
          description?: string
          duration?: number | null
          id?: string
          id_operator?: string
          img?: Json | null
          items?: Json | null
          max_age?: number | null
          min_age?: number | null
          name?: string
          price?: number | null
          range_time_off?: Json | null
          recomendation?: string | null
          type_activity?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "activity_id_operator_fkey"
            columns: ["id_operator"]
            isOneToOne: false
            referencedRelation: "operator"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "activity_type_activity_fkey"
            columns: ["type_activity"]
            isOneToOne: false
            referencedRelation: "type_activity"
            referencedColumns: ["id"]
          },
        ]
      }
      category: {
        Row: {
          created_at: string
          id: number
          name: string
        }
        Insert: {
          created_at?: string
          id?: number
          name: string
        }
        Update: {
          created_at?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
      carousel_items: { // <-- Agregué la tabla 'carousel_items' al esquema
        Row: {
            id: string;
            created_at: string;
            src: string;
            alt: string;
            title: string;
            subtitle: string;
            location: string;
            buttonText: string;
            link: string;
        };
        Insert: {
            src: string;
            alt: string;
            title: string;
            subtitle: string;
            location: string;
            buttonText: string;
            link: string;
        };
        Update: {
            src?: string;
            alt?: string;
            title?: string;
            subtitle?: string;
            location?: string;
            buttonText?: string;
            link?: string;
        };
        Relationships: [];
      }
      details_operator: {
        Row: {
          created_at: string
          id: string
          id_operator: string
          is_favorite: boolean | null
          notes: string
          start: number
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          id_operator?: string
          is_favorite?: boolean | null
          notes: string
          start?: number
          user_id?: string
        }
        Update: {
          created_at?: string
          id?: string
          id_operator?: string
          is_favorite?: boolean | null
          notes?: string
          start?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "details_operator_id_operator_fkey"
            columns: ["id_operator"]
            isOneToOne: false
            referencedRelation: "operator"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "details_operator_user_id_fkey1"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
        ]
      }
      operator: {
        Row: {
          category_id: number
          created_at: string
          description: string
          direction: string | null
          id: string
          img: string[] | null
          lat: number
          lng: number
          logo: string | null
          name: string
          name_company: string | null
          phone: number
          zone_id: number
        }
        Insert: {
          category_id: number
          created_at?: string
          description: string
          direction?: string | null
          id?: string
          img?: string[] | null
          lat: number
          lng: number
          logo?: string | null
          name: string
          name_company?: string | null
          phone: number
          zone_id: number
        }
        Update: {
          category_id?: number
          created_at?: string
          description?: string
          direction?: string | null
          id?: string
          img?: string[] | null
          lat?: number
          lng?: number
          logo?: string | null
          name?: string
          name_company?: string | null
          phone?: number
          zone_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "operator_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "category"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "operator_zone_id_fkey"
            columns: ["zone_id"]
            isOneToOne: false
            referencedRelation: "zone"
            referencedColumns: ["id"]
          },
        ]
      }
      roles: {
        Row: {
          created_at: string
          id: number
          name: string
        }
        Insert: {
          created_at?: string
          id?: number
          name: string
        }
        Update: {
          created_at?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
      type_activity: {
        Row: {
          created_at: string
          id: string
          name: number
        }
        Insert: {
          created_at?: string
          id?: string
          name: number
        }
        Update: {
          created_at?: string
          id?: string
          name?: number
        }
        Relationships: []
      }
      user: {
        Row: {
          created_at: string
          id: string
          name: string
          rol: number
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          rol: number
          user_id?: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          rol?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_rol_fkey"
            columns: ["rol"]
            isOneToOne: false
            referencedRelation: "roles"
            referencedColumns: ["id"]
          },
        ]
      }
      zone: {
        Row: {
          created_at: string
          id: number
          name: string
        }
        Insert: {
          created_at?: string
          id?: number
          name: string
        }
        Update: {
          created_at?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    keyof (PublicSchema["Tables"] & PublicSchema["Views"]) | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
      PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    keyof PublicSchema["Tables"] | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    keyof PublicSchema["Tables"] | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    keyof PublicSchema["Enums"] | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {},
  },
} as const

// ======================================================================
// DEFINICIÓN DE TIPOS PARA LA TABLA 'carousel_items'
//
// Ahora usamos los tipos genéricos de la base de datos para definir
// los tipos específicos de nuestra tabla.
// ======================================================================

export type CarouselTableRow = Tables<"carousel_items">;
export type CarouselTableInsert = TablesInsert<"carousel_items">;
export type CarouselTableUpdate = TablesUpdate<"carousel_items">;

/**
 * Clase de repositorio para manejar las operaciones de la tabla 'carousel_items'.
 * Contiene métodos estáticos para crear, leer, actualizar y eliminar datos.
 */
export class CarouselTable {
  /**
   * Crea un nuevo ítem para el carrusel.
   * @param body Los datos del nuevo ítem.
   * @returns El ítem creado, incluyendo el 'id' y 'created_at'.
   */
  static createCarouselItem = async (
    body: CarouselTableInsert
  ): Promise<CarouselTableRow> => {
    // SupabaseServer() es tu función para obtener el cliente de Supabase en el servidor.
    const supabase = await SupabaseServer();
    const { data, error } = await supabase
      .from("carousel_items")
      .insert(body)
      .select("*")
      .single();

    if (error) {
      throw error;
    }
    return data as unknown as CarouselTableRow;
  };

  /**
   * Obtiene todos los ítems del carrusel.
   * @returns Un array de todos los ítems.
   */
  static getCarouselItems = async (): Promise<CarouselTableRow[]> => {
    const supabase = await SupabaseServer();
    const { data, error } = await supabase
      .from("carousel_items")
      .select("*")
      .order("created_at", { ascending: false }); // Opcional: ordenar por fecha de creación

    if (error) {
      throw error;
    }
    return data as unknown as CarouselTableRow[];
  };

  /**
   * Obtiene un ítem del carrusel por su ID.
   * @param id El ID del ítem a buscar.
   * @returns El ítem encontrado.
   */
  static getCarouselItemById = async (id: string): Promise<CarouselTableRow> => {
    const supabase = await SupabaseServer();
    const { data, error } = await supabase
      .from("carousel_items")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      throw error;
    }
    return data as unknown as CarouselTableRow;
  };

  /**
   * Actualiza un ítem del carrusel por su ID.
   * @param id El ID del ítem a actualizar.
   * @param body Los datos a actualizar.
   * @returns El ítem actualizado.
   */
  static updateCarouselItem = async (
    id: string,
    body: CarouselTableUpdate
  ): Promise<CarouselTableRow> => {
    const supabase = await SupabaseServer();
    const { data, error } = await supabase
      .from("carousel_items")
      .update(body)
      .eq("id", id)
      .select("*")
      .single();

    if (error) {
      throw error;
    }
    return data as unknown as CarouselTableRow;
  };

  /**
   * Elimina un ítem del carrusel por su ID.
   * @param id El ID del ítem a eliminar.
   * @returns 'true' si la operación fue exitosa, 'false' en caso contrario.
   */
  static deleteCarouselItem = async (id: string): Promise<boolean> => {
    const supabase = await SupabaseServer();
    const { error } = await supabase
      .from("carousel_items")
      .delete()
      .eq("id", id);

    if (error) {
      return false;
    }
    return true;
  };
}
