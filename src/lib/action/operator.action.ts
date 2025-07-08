"use server";

import { revalidatePath } from "next/cache";
import { OperatorTable } from "../repository/operator-table";
import { OperatorTableRow, OperatorTableUpdate, ResponseType } from "../type";

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

export const updateOperator = async ({
  id,
  body,
}: {
  id: string;
  body: OperatorTableUpdate;
}): Promise<ResponseType<OperatorTableRow | null>> => {
  const operator = await OperatorTable.updateOperator(id, body);
  if (!operator.id) {
    return {
      status: false,
      data: null,
      error: "Error al actualizar el operador",
    };
  }
  revalidatePath("/admin");
  return {
    status: true,
    data: operator,
    error: "",
  };
};

export const deleteOperator = async (id: string): Promise<boolean> => {
  const operator = await OperatorTable.deleteOperator(id);
  if (!operator) {
    return false;
  }
  revalidatePath("/admin");
  return true;
};
