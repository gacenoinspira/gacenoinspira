"use server";

import { OperatorTable } from "../repository/operator-table";
import { OperatorTableRow, ResponseType } from "../type";

export const getOperators = async (): Promise<
  ResponseType<OperatorTableRow[] | null>
> => {
  const operators = await OperatorTable.getOperators();

  if (!operators.length) {
    return {
      status: false,
      data: null,
      error: "Error al obtener los operadores",
    };
  }
  return {
    status: true,
    data: operators,
    error: "",
  };
};
