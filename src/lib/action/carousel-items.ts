"use server";

import { revalidatePath } from "next/cache";
import { CarouselTable, CarouselTableInsert, CarouselTableUpdate, CarouselTableRow } from "../repository/carousel-items";

// Define un tipo de respuesta genérico para manejar errores de forma consistente.
// Este tipo de respuesta es ideal para manejar las respuestas del servidor.
type ResponseType<T> = {
  status: boolean;
  data: T;
  error: string;
};

/**
 * Obtiene todos los ítems del carrusel.
 * @returns Una respuesta con una lista de ítems o un error.
 */
export async function getCarouselItems(): Promise<ResponseType<CarouselTableRow[] | null>> {
  try {
    const items = await CarouselTable.getCarouselItems();
    return {
      status: true,
      data: items,
      error: "",
    };
  } catch (error: any) {
    return {
      status: false,
      data: null,
      error: error.message || "Error al obtener los ítems del carrusel.",
    };
  }
}

/**
 * Obtiene un ítem del carrusel por su ID.
 * @param id El ID del ítem a buscar.
 * @returns Una respuesta con un solo ítem o un error.
 */
export async function getCarouselItemById(id: string): Promise<ResponseType<CarouselTableRow | null>> {
  try {
    const item = await CarouselTable.getCarouselItemById(id);
    return {
      status: true,
      data: item,
      error: "",
    };
  } catch (error: any) {
    return {
      status: false,
      data: null,
      error: error.message || "Error al obtener el ítem por ID.",
    };
  }
}

/**
 * Crea un nuevo ítem en el carrusel.
 * @param body Los datos del nuevo ítem.
 * @returns Una respuesta con el ítem creado o un error.
 */
export async function createCarouselItem(
  body: CarouselTableInsert
): Promise<ResponseType<CarouselTableRow | null>> {
  try {
    const newItem = await CarouselTable.createCarouselItem(body);
    // Revalida la ruta principal para mostrar los cambios.
    revalidatePath("/");
    return {
      status: true,
      data: newItem,
      error: "",
    };
  } catch (error: any) {
    return {
      status: false,
      data: null,
      error: error.message || "Error al crear el ítem del carrusel.",
    };
  }
}

/**
 * Actualiza un ítem del carrusel.
 * @param id El ID del ítem a actualizar.
 * @param body Los datos a actualizar.
 * @returns Una respuesta con el ítem actualizado o un error.
 */
export async function updateCarouselItem(
  id: string,
  body: CarouselTableUpdate
): Promise<ResponseType<CarouselTableRow | null>> {
  try {
    const updatedItem = await CarouselTable.updateCarouselItem(id, body);
    // Revalida la ruta principal para mostrar los cambios.
    revalidatePath("/");
    return {
      status: true,
      data: updatedItem,
      error: "",
    };
  } catch (error: any) {
    return {
      status: false,
      data: null,
      error: error.message || "Error al actualizar el ítem del carrusel.",
    };
  }
}

/**
 * Elimina un ítem del carrusel por su ID.
 * @param id El ID del ítem a eliminar.
 * @returns Una respuesta indicando si la eliminación fue exitosa.
 */
export async function deleteCarouselItem(id: string): Promise<ResponseType<boolean>> {
  try {
    const success = await CarouselTable.deleteCarouselItem(id);
    if (!success) {
      throw new Error("No se pudo eliminar el ítem.");
    }
    // Revalida la ruta principal para mostrar los cambios.
    revalidatePath("/");
    return {
      status: true,
      data: true,
      error: "",
    };
  } catch (error: any) {
    return {
      status: false,
      data: false,
      error: error.message || "Error al eliminar el ítem del carrusel.",
    };
  }
}
