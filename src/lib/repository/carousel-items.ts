import { SupabaseServer } from "../supabase/connection/supabase-server";

// Define las interfaces de tipo para asegurar que los datos
// que se envían y se reciben de la base de datos
// tengan la estructura correcta.

// Tipo para una fila completa de la tabla 'carousel_items'.
// Esto incluye los campos que Supabase crea automáticamente.
export type CarouselTableRow = {
  id: string; // El ID de la fila, generado por Supabase.
  created_at: string; // La fecha y hora de creación, generada por Supabase.
  src: string;
  alt: string;
  title: string;
  subtitle: string;
  location: string;
  buttonText: string;
  link: string;
};

// Tipo para insertar una nueva fila. No necesita 'id' ni 'created_at'.
export type CarouselTableInsert = Omit<CarouselTableRow, "id" | "created_at">;

// Tipo para actualizar una fila. Todos los campos son opcionales.
export type CarouselTableUpdate = Partial<CarouselTableInsert>;


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
