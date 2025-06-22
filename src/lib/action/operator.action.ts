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

export const getOperatorById = async (
  id: string
): Promise<ResponseType<OperatorTableRow | null>> => {
  const operator = await OperatorTable.getOperatorById(id);
  if (!operator.id) {
    return {
      status: false,
      data: null,
      error: "Error al obtener el operador",
    };
  }
  return {
    status: true,
    data: operator,
    error: "",
  };
};
