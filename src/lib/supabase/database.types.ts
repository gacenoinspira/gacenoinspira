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
          operationName?: string
          extensions?: Json
          variables?: Json
          query?: string
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
          id: string
          name: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
        }
        Relationships: []
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
        ]
      }
      operator: {
        Row: {
          category_id: string
          created_at: string
          description: string
          id: string
          lat: number
          lng: number
          name: string
          phone: number
          zone_id: number
        }
        Insert: {
          category_id: string
          created_at?: string
          description: string
          id?: string
          lat: number
          lng: number
          name: string
          phone: number
          zone_id: number
        }
        Update: {
          category_id?: string
          created_at?: string
          description?: string
          id?: string
          lat?: number
          lng?: number
          name?: string
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
          rol: number
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          rol: number
          user_id?: string
        }
        Update: {
          created_at?: string
          id?: string
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

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {},
  },
} as const

