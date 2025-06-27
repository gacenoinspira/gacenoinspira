"use server";

import { UserTable } from "@/lib/repository";
import { SupabaseServer } from "@/lib/supabase/connection/supabase-server";
import { UserType } from "@/lib/type";
import { ResponseType } from "@/lib/type/response.type";

export const loginAction = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<ResponseType<UserType | null>> => {
  const supabase = await SupabaseServer();
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) {
    return {
      status: false,
      data: null,
      error: error.message,
    };
  }

  const user = await UserTable.getUserById(data.user?.id);
  if (!user.status) {
    return {
      status: false,
      data: null,
      error: user.error,
    };
  }

  return {
    status: true,
    data: {
      email: data.user?.email ?? "",
      user_id: data.user?.id ?? "",
      rol: user.data?.rol ?? 0,
      name: user.data?.name ?? "",
    },
    error: "",
  };
};

export const registerAction = async ({
  email,
  password,
  name,
}: {
  email: string;
  password: string;
  name: string;
}): Promise<ResponseType<UserType | null>> => {
  const supabase = await SupabaseServer();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  if (error || !data.user) {
    return {
      status: false,
      data: null,
      error: error?.message ?? "Error al registrar",
    };
  }
  const user = await UserTable.registerUser({
    rol: data.user?.email?.includes(
      process.env.ADMIN_EMAIL ?? "gacenoinspira@gmail.com"
    )
      ? 1
      : 2,
    user_id: data.user?.id,
    name: name,
    id: data.user?.id,
  });
  if (!user.status) {
    return {
      status: false,
      data: null,
      error: user.error,
    };
  }

  return {
    status: true,
    data: {
      email: data.user?.email ?? "",
      user_id: data.user?.id ?? "",
      rol: user.data?.rol ?? 0,
      name: user.data?.name ?? "",
    },
    error: "",
  };
};
