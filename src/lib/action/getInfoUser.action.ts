"use server";

import { UserTable } from "../repository";
import { SupabaseServer } from "../supabase/connection/supabase-server";
import { UserType, ResponseType } from "../type";

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
      error: "rror obtener informacion del user DB",
      status: false,
    };
  }

  return {
    data: {
      email: user.data.user.email ?? "",
      rol: userTable.data?.rol ?? 0,
      user_id: user.data.user.id,
    },
    error: "",
    status: true,
  };
};
