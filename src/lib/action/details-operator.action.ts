"use server";

import { revalidatePath } from "next/cache";
import { DetailsOperatorRepository } from "../repository/details-operator";
import {
  DetailsOperatorTable,
  DetailsOperatorTableInsert,
  DetailsOperatorTableUpdate,
  ResponseType,
} from "../type";

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

export const addComment = async (
  body: DetailsOperatorTableInsert
): Promise<ResponseType<DetailsOperatorTable | null>> => {
  const detailsOperator = await DetailsOperatorRepository.addComment(body);
  
  if (!detailsOperator?.id) {
    return {
      status: false,
      data: null,
      error: "Error al obtener el detalle del operador",
    };
  }
  revalidatePath(`/operator/${body.id_operator}`);
  return {
    status: true,
    data: detailsOperator,
    error: "",
  };
};

export const updateDetails = async (
  body: DetailsOperatorTableUpdate,
  id: string,
  accountId: string,
  user_id: string
): Promise<ResponseType<DetailsOperatorTable | null>> => {
  const detailsOperator = await DetailsOperatorRepository.updateDetails(
    body,
    id,
    user_id
  );
  if (!detailsOperator?.id) {
    return {
      status: false,
      data: null,
      error: "Error al obtener el detalle del operador",
    };
  }
  revalidatePath(`/operator/${accountId}`);
  return {
    status: true,
    data: detailsOperator,
    error: "",
  };
};

export const getDetailsOperatorByUser = async (
  id: string
): Promise<ResponseType<DetailsOperatorTable[] | null>> => {
  const detailsOperator =
    await DetailsOperatorRepository.getDetailsOperatorByUser(id);
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
};
