import webpfy from "webpfy";

export interface WebpfyResult {
  webpBlob: Blob;
  fileName: string;
}

export async function convertToWebP(file: File): Promise<WebpfyResult> {
  try {
    const { webpBlob, fileName } = await webpfy({
      image: file,
      quality: 80, // ajustable entre 0 y 100
    });
    return { webpBlob, fileName };
  } catch (error) {
    console.error("Error al convertir imagen a WebP:", error);
    throw error;
  }
}
