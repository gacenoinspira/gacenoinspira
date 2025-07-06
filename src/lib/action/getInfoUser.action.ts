"use server";

import { revalidatePath } from "next/cache";
import { UserTable } from "../repository";
import { SupabaseServer } from "../supabase/connection/supabase-server";
import {
  UserType,
  ResponseType,
  UserTableUpdate,
  UserTableWithRole,
} from "../type";

export const getInfoUser = async (): Promise<ResponseType<UserType | null>> => {
  const supabase = await SupabaseServer();
  const user = await supabase.auth.getUser();

  if (!user.data.user?.id) {
    return {
      status: false,
      data: null,
      error: "Error obtener informacion del user",
    };
  }

  const userTable = await UserTable.getUserById(user.data.user.id);

  if (!userTable.status) {
    return {
      data: null,
      error: "Error obtener informacion del user DB",
      status: false,
    };
  }

  return {
    data: {
      email: user.data.user.email ?? "",
      name: userTable.data?.name ?? "",
      rol: userTable.data?.rol ?? 0,
      user_id: user.data.user.id,
      avatar: userTable.data?.avatar ?? "",
    },
    error: "",
    status: true,
  };
};

export const updateInfoUser = async ({
  body,
  id,
}: {
  body: UserTableUpdate;
  id: string;
}): Promise<ResponseType<UserTableWithRole | null>> => {
  const userTable = await UserTable.updateUser(body, id);

  if (!userTable.status) {
    return {
      data: null,
      error: "Error obtener informacion del user DB",
      status: false,
    };
  }
  revalidatePath("/perfil");
  return {
    data: userTable.data,
    error: "",
    status: true,
  };
};
