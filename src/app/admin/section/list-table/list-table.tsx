"use client";

import { OperatorTableRow, OperatorTableUpdate } from "@/lib/type";
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
    const [editGalleryFiles, setEditGalleryFiles] = useState<File[]>([]);
    const [editLogoFile, setEditLogoFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);

    const handleEdit = (operator: OperatorTableRow) => {
        setEditingId(operator.id);
        setEditData({
            ...operator,
            latituddestino: operator.latituddestino || null,
            longituddestino: operator.longituddestino || null,
            latitudorigin: operator.latitudorigin || null,
            longitudorigin: operator.longitudorigin || null,
        });
        setEditLogoFile(null);
        setEditGalleryFiles([]);
    };

    const handleSave = async (id: string) => {
        setLoading(true);

        const finalBody: OperatorTableUpdate = {
            ...editData,
  
            latituddestino: (editData.latituddestino || '') || null,
            longituddestino:  (editData.longituddestino || '' )|| null,
            latitudorigin: (editData.latitudorigin || '') || null,
            longitudorigin: (editData.longitudorigin || '') || null,
        };

        // Lógica para subir el logo si hay un nuevo archivo
        if (editLogoFile) {
            const { webpBlob, fileName } = await convertToWebP(editLogoFile);
            const uploadLogo = await uploadToSupabase({
                webpBlob,
                path: `logo/${new Date().getTime()}${fileName}`,
                mimeType: "image/webp",
            });
            if (uploadLogo.publicUrl) {
                finalBody.logo = uploadLogo.publicUrl;
            }
        }

        // Lógica para subir la galería de imágenes si hay nuevos archivos
        if (editGalleryFiles.length > 0) {
            const photosUrls: string[] = [];
            for (const blob of editGalleryFiles) {
                const { webpBlob, fileName } = await convertToWebP(blob);
                const uploadPhoto = await uploadToSupabase({
                    webpBlob: webpBlob,
                    path: `gallery/${new Date().getTime()}${fileName}`,
                    mimeType: "image/webp",
                });
                photosUrls.push(uploadPhoto.publicUrl);
            }
            finalBody.img = [...(editData.img || []), ...photosUrls];
        }

        // Actualizar el operador con los nuevos datos e imágenes
        await updateOperator({ id, body: finalBody });

        // Resetear estados después de guardar
        setEditingId(null);
        setLoading(false);
        setEditData({});
        setEditGalleryFiles([]);
        setEditLogoFile(null);
    };

    const handleCancel = () => {
        setEditingId(null);
        setEditData({});
    };

    const handleChange = (
        field: keyof OperatorTableRow,
        value: string | string[] | number | null
    ) => {
        setEditData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleSingleImageUpload = (files: FileList) => {
        const file = files[0];
        if (file) {
            setEditLogoFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                const imageUrl = reader.result as string;
                handleChange("logo", imageUrl);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleMultipleImagesUpload = (files: FileList) => {
        const fileArray = Array.from(files);
        setEditGalleryFiles((prev) => [...prev, ...fileArray]);
        fileArray.forEach((file) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                const imageUrl = reader.result as string;
                setEditData((prev) => {
                    const currentImages = Array.isArray(prev.img) ? prev.img : [];
                    return {
                        ...prev,
                        img: [...currentImages, imageUrl],
                    };
                });
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
                        <th>Nombre</th>
                        <th>Logo</th>
                        <th>Galería</th>
                        <th>Latitud Origen</th>
                        <th>Longitud Origen</th>
                        <th>Latitud Destino</th>
                        <th>Longitud Destino</th>
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
                                        onChange={(e) => handleChange("name_company", e.target.value)}
                                        className={styles.input}
                                    />
                                ) : (
                                    `${operator.name_company ?? ""} (${operator.name})` || "Sin nombre"
                                )}
                            </td>
                            <td>
                                {editingId === operator.id ? (
                                    <div className={styles.imageUploadContainer}>
                                        <ImageUpload
                                            onUpload={handleSingleImageUpload}
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
                                            onUpload={handleMultipleImagesUpload}
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
                            <td>
                                {editingId === operator.id ? (
                                    <input
                                        type="number"
                                        step="any"
                                        value={editData.latitudorigin ?? ""}
                                        onChange={(e) => {
                                            const val = parseFloat(e.target.value);
                                            handleChange("latitudorigin", isNaN(val) ? null : val);
                                        }}
                                        className={styles.input}
                                    />
                                ) : (
                                    operator.latitudorigin ?? "N/A"
                                )}
                            </td>
                            <td>
                                {editingId === operator.id ? (
                                    <input
                                        type="number"
                                        step="any"
                                        value={editData.longitudorigin ?? ""}
                                        onChange={(e) => {
                                            const val = parseFloat(e.target.value);
                                            handleChange("longitudorigin", isNaN(val) ? null : val);
                                        }}
                                        className={styles.input}
                                    />
                                ) : (
                                    operator.longitudorigin ?? "N/A"
                                )}
                            </td>
                            <td>
                                {editingId === operator.id ? (
                                    <input
                                        type="number"
                                        step="any"
                                        value={editData.latituddestino ?? ""}
                                        onChange={(e) => {
                                            const val = parseFloat(e.target.value);
                                            handleChange("latituddestino", isNaN(val) ? null : val);
                                        }}
                                        className={styles.input}
                                    />
                                ) : (
                                    operator.latituddestino ?? "N/A"
                                )}
                            </td>
                            <td>
                                {editingId === operator.id ? (
                                    <input
                                        type="number"
                                        step="any"
                                        value={editData.longituddestino ?? ""}
                                        onChange={(e) => {
                                            const val = parseFloat(e.target.value);
                                            handleChange("longituddestino", isNaN(val) ? null : val);
                                        }}
                                        className={styles.input}
                                    />
                                ) : (
                                    operator.longituddestino ?? "N/A"
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