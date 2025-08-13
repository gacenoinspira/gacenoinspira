'use server';

import { revalidatePath } from "next/cache";
import { createClient } from '@supabase/supabase-js';

// Define las variables de entorno para el cliente de Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface CarouselTableRow {
  id: number;
  created_at: string;
  src: string;
  alt: string;
  title: string | null;
  subtitle: string | null;
  buttonText: string | null;
  link: string | null;
}

// Define el tipo de dato para las actualizaciones
export interface CarouselTableUpdate {
  src?: string;
  alt?: string;
  title?: string | null;
  subtitle?: string | null;
  buttonText?: string | null;
  link?: string | null;
}

// Define el tipo de dato para la respuesta de las funciones
export interface ResponseType<T> {
  status: boolean;
  data: T;
  error: string;
}

/**
 * Clase para interactuar con la tabla `carousel_items` de Supabase.
 */
class CarouselTable {

  public static async getCarouselItems(): Promise<CarouselTableRow[]> {
    const { data, error } = await supabase
      .from('carousel_items')
      .select('*')
      .order('created_at', { ascending: true });

    if (error) {
      console.error("Error fetching carousel items:", error);
      return [];
    }
    
    return data || [];
  }


  public static async getCarouselItemById(id: string): Promise<CarouselTableRow | null> {
    const { data, error } = await supabase
      .from('carousel_items')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      console.error("Error fetching carousel item by ID:", error);
      return null;
    }
    
    return data;
  }

  /**
   * Agrega un nuevo ítem del carrusel.
   * @param {Omit<CarouselTableRow, 'id' | 'created_at'>} body El cuerpo del ítem a agregar.
   * @returns {Promise<CarouselTableRow | null>} El ítem agregado o null si hubo un error.
   */
  public static async addCarouselItem(body: Omit<CarouselTableRow, 'id' | 'created_at'>): Promise<CarouselTableRow | null> {
    const { data, error } = await supabase
      .from('carousel_items')
      .insert([body])
      .select();
    
    if (error) {
      console.error("Error adding carousel item:", error);
      return null;
    }
    
    return data ? data[0] : null;
  }

  /**
   * Actualiza un ítem del carrusel.
   * @param {string} id El ID del ítem a actualizar.
   * @param {CarouselTableUpdate} body El cuerpo de la actualización.
   * @returns {Promise<CarouselTableRow | null>} El ítem actualizado o null si hubo un error.
   */
  public static async updateCarouselItem(id: string, body: CarouselTableUpdate): Promise<CarouselTableRow | null> {
    const { data, error } = await supabase
      .from('carousel_items')
      .update(body)
      .eq('id', id)
      .select();

    if (error) {
      console.error("Error updating carousel item:", error);
      return null;
    }

    return data ? data[0] : null;
  }

  /**
   * Elimina un ítem del carrusel.
   * @param {string} id El ID del ítem a eliminar.
   * @returns {Promise<boolean>} True si se eliminó con éxito, de lo contrario False.
   */
  public static async deleteCarouselItem(id: string): Promise<boolean> {
    const { error } = await supabase
      .from('carousel_items')
      .delete()
      .eq('id', id);

    if (error) {
      console.error("Error deleting carousel item:", error);
      return false;
    }

    return true;
  }
}

// Exporta las funciones para ser usadas en los Server Actions
export const getCarouselItems = async (): Promise<
  ResponseType<CarouselTableRow[] | null>
> => {
  const items = await CarouselTable.getCarouselItems();

  if (!items.length) {
    return {
      status: false,
      data: null,
      error: "No se encontraron ítems en el carrusel.",
    };
  }
  return {
    status: true,
    data: items,
    error: "",
  };
};

export const getCarouselItemById = async (
  id: string
): Promise<ResponseType<CarouselTableRow | null>> => {
  const item = await CarouselTable.getCarouselItemById(id);
  if (!item) {
    return {
      status: false,
      data: null,
      error: "Error al obtener el ítem del carrusel",
    };
  }
  return {
    status: true,
    data: item,
    error: "",
  };
};

export const addCarouselItem = async (
  body: Omit<CarouselTableRow, 'id' | 'created_at'>
): Promise<ResponseType<CarouselTableRow | null>> => {
  const item = await CarouselTable.addCarouselItem(body);
  if (!item) {
    return {
      status: false,
      data: null,
      error: "Error al agregar el ítem del carrusel.",
    };
  }
  revalidatePath("/admin");
  return {
    status: true,
    data: item,
    error: "",
  };
};

export const updateCarouselItem = async ({
  id,
  body,
}: {
  id: string;
  body: CarouselTableUpdate;
}): Promise<ResponseType<CarouselTableRow | null>> => {
  const item = await CarouselTable.updateCarouselItem(id, body);
  if (!item) {
    return {
      status: false,
      data: null,
      error: "Error al actualizar el ítem del carrusel",
    };
  }
  revalidatePath("/admin");
  return {
    status: true,
    data: item,
    error: "",
  };
};

export const deleteCarouselItem = async (id: string): Promise<boolean> => {
  const success = await CarouselTable.deleteCarouselItem(id);
  if (!success) {
    return false;
  }
  revalidatePath("/admin");
  return true;
};
