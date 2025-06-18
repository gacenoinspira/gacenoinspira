"use server";

import { SupabaseServer } from "@/lib/supabase/connection/supabase-server";
import { ResponseType } from "@/lib/type/response.type";
import { User } from "@supabase/supabase-js";



export const loginAction = async ({email, password}: {email: string, password: string}): Promise<ResponseType<User | null>> => {
    const supabase = await SupabaseServer()
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    })
    if (error) {
        return {
            status: false,
            data: null,
            error: error.message
        }
    }
    return {
        status: true,
        data: data.user,
        error: ""
    }
}


export const registerAction = async ({email, password}: {email: string, password: string}): Promise<ResponseType<User | null>> => {
    const supabase = await SupabaseServer()
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
    })
    if (error) {
        return {
            status: false,
            data: null,
            error: error.message
        }
    }
    return {
        status: true,
        data: data.user,
        error: ""
    }
}
