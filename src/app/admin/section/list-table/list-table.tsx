"use client";

import { OperatorTableRow } from "@/lib/type";
import React, { useState } from "react";
import styles from "./table.module.css";
import { ImageUpload } from "@/components/image-upload";
import Image from "next/image";
import { convertToWebP } from "@/lib/utils/ceonvertWebp";
import { uploadToSupabase } from "@/lib/action/load-img";
import { deleteOperator, updateOperator } from "@/lib/action";

interface ImagePreviewProps {
  src: string;
  alt: string;
  onRemove?: () => void;
  className?: string;
}

const ImagePreview = ({
  src,
  alt,
  onRemove,
  className = "",
}: ImagePreviewProps) => (
  <div className={`${styles.imagePreview} ${className}`}>
    <Image
      src={src}
      alt={alt}
      width={80}
      height={80}
      className={styles.previewImage}
    />
    {onRemove && (
      <button className={styles.removeImage} onClick={onRemove}>
        ×
      </button>
    )}
  </div>
);

interface Props {
  operators: OperatorTableRow[];
}

export function ListTable({ operators }: Props) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState<Partial<OperatorTableRow>>({});
  const [editGallery, setEditGallery] = useState<File[]>([]);
  const [editLogo, setEditLogo] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleEdit = (operator: OperatorTableRow) => {
    setEditingId(operator.id);
    setEditData({ ...operator });
  };

  const logicMultipleImages = async (id: string) => {
    if (editGallery.length > 0) {
      const photosUrls: string[] = [];
      for (const blob of editGallery) {
        const { webpBlob, fileName } = await convertToWebP(blob);
        const uploadPhoto = await uploadToSupabase({
          webpBlob: webpBlob,
          path: `logo/${new Date().getTime()}${fileName}`,
          mimeType: "image/webp",
        });
        photosUrls.push(uploadPhoto.publicUrl);
      }
      if (photosUrls.length > 0) {
        const resp = await updateOperator({
          id,
          body: {
            img: photosUrls,
          },
        });
        return resp;
      }
    }
    return null;
  };

  const handleSave = async (id: string) => {
    setLoading(true);
    if (editLogo) {
      const { webpBlob, fileName } = editLogo
        ? await convertToWebP(editLogo as File)
        : { webpBlob: null, fileName: "" };

      const uploadLogo = editLogo
        ? await uploadToSupabase({
            webpBlob: webpBlob as Blob,
            path: `logo/${new Date().getTime()}${fileName}`,
            mimeType: "image/webp",
          })
        : { publicUrl: "" };
      if (uploadLogo.publicUrl) {
        updateOperator({
          id,
          body: {
            logo: uploadLogo.publicUrl,
          },
        });
      }
    }

    await logicMultipleImages(id);
    setEditingId(null);
    setLoading(false);
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditData({});
  };

  const handleChange = (
    field: keyof OperatorTableRow,
    value: string | string[]
  ) => {
    setEditData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSingleImageUpload =
    (id: string, field: keyof OperatorTableRow) => (files: FileList) => {
      const file = files[0];
      if (file) {
        setEditLogo(file);
        const reader = new FileReader();
        reader.onloadend = () => {
          const imageUrl = reader.result as string;
          handleChange(field, imageUrl);
        };
        reader.readAsDataURL(file);
      }
    };

  const handleMultipleImagesUpload =
    (id: string, field: keyof OperatorTableRow) => (files: FileList) => {
      const fileReaders: FileReader[] = [];
      const currentImages = Array.isArray(editData[field])
        ? [...(editData[field] as string[])]
        : [];

      Array.from(files).forEach((file, index) => {
        setEditGallery((prev) => [...prev, file]);
        const reader = new FileReader();
        fileReaders.push(reader);

        reader.onloadend = () => {
          const imageUrl = reader.result as string;
          const updatedImages = [...currentImages, imageUrl];

          // Update only when all files are processed
          if (index === fileReaders.length - 1) {
            handleChange(field, updatedImages);
          } else {
            currentImages.push(imageUrl);
          }
        };

        reader.readAsDataURL(file);
      });
    };

  const removeImage = (field: keyof OperatorTableRow, index: number) => {
    if (Array.isArray(editData[field])) {
      const images = [...(editData[field] as string[])];
      images.splice(index, 1);
      handleChange(field, images);
    } else {
      handleChange(field, "");
    }
  };

  if (!operators || operators.length === 0) {
    return <div className={styles.noData}>No hay operadores disponibles</div>;
  }

  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>nombre</th>
            <th>Logo</th>
            <th>Galería</th>
            <th>Tipo de Actividad</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {operators.map((operator) => (
            <tr key={operator.id} className={styles.row}>
              <td>{operator.id}</td>
              <td>
                {editingId === operator.id ? (
                  <input
                    type="text"
                    value={editData.name_company || ""}
                    onChange={(e) =>
                      handleChange("name_company", e.target.value)
                    }
                    className={styles.input}
                  />
                ) : (
                  `${operator.name_company ?? ""} (${operator.name})` ||
                  "Sin nombre"
                )}
              </td>
              <td>
                {editingId === operator.id ? (
                  <div className={styles.imageUploadContainer}>
                    <ImageUpload
                      onUpload={handleSingleImageUpload(operator.id, "logo")}
                      label="Subir logo"
                      className={styles.singleUpload}
                    />
                    {editData.logo && (
                      <ImagePreview
                        src={editData.logo as string}
                        alt="Logo"
                        onRemove={() => handleChange("logo", "")}
                        className={styles.singlePreview}
                      />
                    )}
                  </div>
                ) : operator.logo ? (
                  <Image
                    src={operator.logo}
                    alt="Logo"
                    width={50}
                    height={50}
                    className={styles.previewImage}
                  />
                ) : (
                  "Sin logo"
                )}
              </td>
              <td>
                {editingId === operator.id ? (
                  <div className={styles.imageUploadContainer}>
                    <ImageUpload
                      onUpload={handleMultipleImagesUpload(operator.id, "img")}
                      multiple
                      label="Subir imágenes"
                    />
                    <div className={styles.previewGallery}>
                      {(editData.img || []).map((img, idx) => (
                        <ImagePreview
                          key={idx}
                          src={img}
                          alt={`Imagen ${idx + 1}`}
                          onRemove={() => removeImage("img", idx)}
                        />
                      ))}
                    </div>
                  </div>
                ) : operator.img?.length ? (
                  <div className={styles.previewGallery}>
                    {operator.img?.slice(0, 3).map((img, idx) => (
                      <Image
                        key={idx}
                        src={img}
                        alt={`Imagen ${idx + 1}`}
                        width={50}
                        height={50}
                        className={styles.previewImage}
                      />
                    ))}
                    {operator?.img?.length > 3 && (
                      <div className={styles.moreImages}>
                        +{operator.img?.length - 3}
                      </div>
                    )}
                  </div>
                ) : (
                  "Sin imágenes"
                )}
              </td>
              <td>{operator.activityType?.name || "Sin tipo"}</td>
              <td className={styles.actions}>
                {editingId === operator.id ? (
                  <>
                    <button
                      onClick={() => handleSave(operator.id)}
                      className={`${styles.button} ${styles.save}`}
                      disabled={loading}
                    >
                      {loading ? "Guardando..." : "Guardar"}
                    </button>
                    <button
                      onClick={handleCancel}
                      className={`${styles.button} ${styles.cancel}`}
                    >
                      Cancelar
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => handleEdit(operator)}
                      className={`${styles.button} ${styles.edit}`}
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => deleteOperator(operator.id)}
                      className={`${styles.button} ${styles.delete}`}
                    >
                      Eliminar
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
