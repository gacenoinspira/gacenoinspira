"use server";

import { OperatorTable } from "@/lib/repository/operator-table";
import {
  OperatorTableInsert,
  OperatorTableRow,
  ResponseType,
} from "@/lib/type";

export const createOperator = async (
  body: OperatorTableInsert
): Promise<ResponseType<OperatorTableRow | null>> => {
  const data = await OperatorTable.createOperator(body);

  if (!data.id) {
    return {
      status: false,
      data: null,
      error: "Error al crear el operador",
    };
  }

  return {
    status: true,
    data,
    error: "",
  };
};
