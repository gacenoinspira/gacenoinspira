/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { revalidatePath } from "next/cache";
import { ImagePageTable } from "../repository/imag-page-table";
import { ResponseType } from "../type";

export async function insertImagePageTable(body: {
  home: string;
  discovery: string;
}): Promise<ResponseType<any>> {
  const { data, error, status } = await ImagePageTable.insertImagePageTable(
    body
  );
  if (!status) {
    return {
      status: false,
      data: null,
      error: error,
    };
  }
  revalidatePath("/");
  revalidatePath("/discovery");
  return {
    status: true,
    data: data,
    error: "",
  };
}

export async function getImagePageTable(): Promise<ResponseType<any>> {
  const { data, error, status } = await ImagePageTable.getImagePageTable();
  if (!status) {
    return {
      status: false,
      data: null,
      error: error,
    };
  }
  return {
    status: true,
    data: data,
    error: "",
  };
}

export async function updateImagePageTable(body: {
  home?: string;
  discovery?: string;
}): Promise<ResponseType<any>> {
  const { data, error, status } = await ImagePageTable.updateImagePageTable(
    body
  );
  if (!status) {
    return {
      status: false,
      data: null,
      error: error,
    };
  }
  revalidatePath("/");
  revalidatePath("/discovery");
  return {
    status: true,
    data: data,
    error: "",
  };
}
