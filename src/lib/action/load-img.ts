"use server";

import { SupabaseServer } from "../supabase/connection/supabase-server";

// Define el tipo opcional para la metadata que devuelve supabase.storage.upload
interface UploadData {
  path: string;
  publicUrl: string;
}

// Parámetros de configuración del cliente

export async function uploadToSupabase({
  webpBlob,
  path,
  mimeType = "image/webp",
}: {
  webpBlob: Blob;
  path: string;
  mimeType?: string;
}): Promise<UploadData> {
  const supabase = await SupabaseServer();
  const { data, error } = await supabase.storage
    .from("fotos")
    .upload(path, webpBlob, {
      contentType: mimeType,
      cacheControl: "3600",
      upsert: false,
    });

  if (error) {
    throw error;
  }

  if (!data) {
    throw new Error("No se recibió data de confirmación al subir");
  }
  const {
    data: { publicUrl },
  } = supabase.storage.from("fotos").getPublicUrl(data.path);

  return { path: data.path, publicUrl };
}
