"use server";

import { CategoryTable } from "../repository/category-table";
import { ResponseType, CategoryTableRow } from "../type";

export const getCategories = async (): Promise<
  ResponseType<CategoryTableRow[] | null>
> => {
  const categories = await CategoryTable.getCategories();

  if (!categories.length) {
    return {
      status: false,
      data: null,
      error: "Error al obtener las categorías",
    };
  }
  return {
    status: true,
    data: categories,
    error: "",
  };
};
