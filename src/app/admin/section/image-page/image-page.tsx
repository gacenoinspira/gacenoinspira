"use client";

import React, { useRef, useState } from "react";
import styles from "./image.module.css";
import {
  insertImagePageTable,
  updateImagePageTable,
} from "@/lib/action/img-page.action";
import { convertToWebP } from "@/lib/utils/ceonvertWebp";
import { uploadToSupabase } from "@/lib/action/load-img";
import { ModalMessage } from "@/lib/components/index";

interface Props {
  imgInicio: string | null;
  imgDescubre: string | null;
}

export function ImagePage({ imgInicio, imgDescubre }: Props) {
  const [image, setImage] = useState<File | undefined>(undefined);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const fileInputRefsec = useRef<HTMLInputElement>(null);
  const [imageSec, setImageSec] = useState<File | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({
    title: "",
    message: "",
    buttonText: "Aceptar",
  });
  const [modalMessage, setModalMessage] = useState(false);

  const onSubmitInicio = async () => {
    setLoading(true);
    const { webpBlob, fileName } = image
      ? await convertToWebP(image as File)
      : { webpBlob: null, fileName: "" };

    const uploadLogo = image
      ? await uploadToSupabase({
          webpBlob: webpBlob as Blob,
          path: `logo/${new Date().getTime()}${fileName}`,
          mimeType: "image/webp",
        })
      : { publicUrl: "" };
    if (imgInicio || imgDescubre) {
      const response = await updateImagePageTable({
        home: uploadLogo.publicUrl,
      });

      setMessage({
        title: !response.status ? "Error" : "Imagen actualizada",
        message: response.status
          ? "Error al actualizar la imagen"
          : "Imagen actualizada exitosamente",
        buttonText: "Entendido",
      });
      setModalMessage(true);
    } else {
      const response = await insertImagePageTable({
        home: uploadLogo.publicUrl,
        discovery: "",
      });
      setMessage({
        title: !response.status ? "Error" : "Imagen insertada",
        message: response.status
          ? "Error al insertar la imagen"
          : "Imagen insertada exitosamente",
        buttonText: "Entendido",
      });
      setModalMessage(true);
    }
    setLoading(false);
    setImage(undefined);
    setImageSec(undefined);
    if (fileInputRef?.current) {
      fileInputRef.current.value = "";
    }
    if (fileInputRefsec?.current) {
      fileInputRefsec.current.value = "";
    }
  };
  const onSubmitDescubre = async () => {
    setLoading(true);
    const { webpBlob, fileName } = imageSec
      ? await convertToWebP(imageSec as File)
      : { webpBlob: null, fileName: "" };
    const uploadLogo = imageSec
      ? await uploadToSupabase({
          webpBlob: webpBlob as Blob,
          path: `logo/${new Date().getTime()}${fileName}`,
          mimeType: "image/webp",
        })
      : { publicUrl: "" };
    if (imgDescubre || imgInicio) {
      const response = await updateImagePageTable({
        discovery: uploadLogo.publicUrl,
      });
      setMessage({
        title: !response.status ? "Error" : "Imagen actualizada",
        message: response.status
          ? "Error al actualizar la imagen"
          : "Imagen actualizada exitosamente",
        buttonText: "Entendido",
      });
      setModalMessage(true);
    } else {
      const response = await insertImagePageTable({
        home: "",
        discovery: uploadLogo.publicUrl,
      });
      setMessage({
        title: !response.status ? "Error" : "Imagen insertada",
        message: response.status
          ? "Error al insertar la imagen"
          : "Imagen insertada exitosamente",
        buttonText: "Entendido",
      });
      setModalMessage(true);
    }
    setLoading(false);
    setImage(undefined);
    setImageSec(undefined);
    if (fileInputRef?.current) {
      fileInputRef.current.value = "";
    }
    if (fileInputRefsec?.current) {
      fileInputRefsec.current.value = "";
    }
  };
  return (
    <div className={styles.activity}>
      <div className={styles.contentInput}>
        <label htmlFor="title" className={styles.label}>
          foto pagina inicio
        </label>
        <input
          ref={fileInputRef}
          type="file"
          placeholder="Titulo"
          className={styles.input}
          accept="image/*"
          onChange={(e) => setImage(e.target.files?.[0])}
        />
        <button onClick={() => onSubmitInicio()} className={styles.btn_add}>
          {loading && image ? "Cargando..." : "Guardar foto inicio"}
        </button>
      </div>
      <div className={styles.contentInput}>
        <label htmlFor="title" className={styles.label}>
          Foto pagina descubre
        </label>
        <input
          ref={fileInputRefsec}
          type="file"
          placeholder="Titulo"
          className={styles.input}
          accept="image/*"
          onChange={(e) => setImageSec(e.target.files?.[0])}
        />
        <button onClick={() => onSubmitDescubre()} className={styles.btn_add}>
          {loading && imageSec ? "Cargando..." : "Guardar foto descubre"}
        </button>
      </div>
      <ModalMessage
        isOpen={modalMessage}
        onClose={() => setModalMessage(false)}
        title={message.title}
        message={message.message}
        buttonText={message.buttonText}
      />
    </div>
  );
}
