"use server";

import { DetailsOperatorRepository } from "../repository/details-operator";
import { DetailsOperatorTable, ResponseType } from "../type";

export async function getDetailsOperator(
  id: string
): Promise<ResponseType<DetailsOperatorTable[] | null>> {
  const detailsOperator = await DetailsOperatorRepository.getDetailsOperator(
    id
  );
  if (!detailsOperator?.length) {
    return {
      status: false,
      data: null,
      error: "Error al obtener el detalle del operador",
    };
  }
  return {
    status: true,
    data: detailsOperator,
    error: "",
  };
}
