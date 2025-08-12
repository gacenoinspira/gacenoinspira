'use client';

import React, { useState } from "react";
import styles from "./ui-form-carousel.module.css";

interface Props {
  imgInicio: string | null;
  imgDescubre: string | null;
}

export const UiFormCarousel = ({ imgInicio, imgDescubre }: Props) => {
  const [newImgInicio, setNewImgInicio] = useState(imgInicio || "");
  const [newImgDescubre, setNewImgDescubre] = useState(imgDescubre || "");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Aquí es donde harías la llamada a tu API o acción de servidor
    // para actualizar las imágenes del carrusel.
    try {
      console.log("Actualizando imágenes del carrusel...");
      console.log("Imagen de inicio:", newImgInicio);
      console.log("Imagen de descubre:", newImgDescubre);
      
      // Simular una llamada a la API
      await new Promise(resolve => setTimeout(resolve, 1500));

      alert("Imágenes del carrusel actualizadas con éxito (simulado)!");
    } catch (error) {
      console.error("Error al actualizar las imágenes:", error);
      alert("Hubo un error al actualizar las imágenes.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Gestionar Imágenes del Carrusel</h2>
      <p className={styles.description}>Actualiza las imágenes principales que se muestran en la página de inicio y la sección de "descubre".</p>

      <form onSubmit={handleUpdate} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="imgInicio">URL de la Imagen de Inicio</label>
          <input
            type="url"
            id="imgInicio"
            value={newImgInicio}
            onChange={(e) => setNewImgInicio(e.target.value)}
            className={styles.input}
            placeholder="Introduce la URL de la imagen de inicio"
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="imgDescubre">URL de la Imagen "Descubre"</label>
          <input
            type="url"
            id="imgDescubre"
            value={newImgDescubre}
            onChange={(e) => setNewImgDescubre(e.target.value)}
            className={styles.input}
            placeholder="Introduce la URL de la imagen de descubre"
            required
          />
        </div>

        <button type="submit" disabled={isSubmitting} className={styles.submitButton}>
          {isSubmitting ? "Guardando..." : "Actualizar Imágenes"}
        </button>
      </form>
      
      <div className={styles.imagePreviewContainer}>
        <h3 className={styles.previewTitle}>Vista Previa</h3>
        <div className={styles.imageWrapper}>
          <p>Imagen de Inicio</p>
          <img
            src={newImgInicio || "https://via.placeholder.com/400x200?text=Imagen+de+Inicio"}
            alt="Vista previa de la imagen de inicio"
            className={styles.previewImage}
          />
        </div>
        <div className={styles.imageWrapper}>
          <p>Imagen "Descubre"</p>
          <img
            src={newImgDescubre || "https://via.placeholder.com/400x200?text=Imagen+Descubre"}
            alt="Vista previa de la imagen de descubre"
            className={styles.previewImage}
          />
        </div>
      </div>

    </div>
  );
};
