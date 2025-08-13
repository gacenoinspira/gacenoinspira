'use client';

import React, { useState, useEffect } from "react";
// Importar estilos CSS (se recomienda usar CSS Modules)
import styles from "./ui-form-carousel.module.css"; 
import { createClient } from '@supabase/supabase-js';

// Tipo para un ítem del carrusel
interface CarouselItem {
  id: number;
  created_at: string;
  src: string;
  alt: string;
  title: string | null;
  subtitle: string | null;
  buttonText: string | null;
  link: string | null;
}


const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function CarouselManager() {
  const [carouselItems, setCarouselItems] = useState<CarouselItem[]>([]);
  const [newItem, setNewItem] = useState<Omit<CarouselItem, 'id' | 'created_at'>>({
    src: "",
    alt: "",
    title: "",
    subtitle: "",
    buttonText: "",
    link: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [editingItemId, setEditingItemId] = useState<number | null>(null);
  
  // Función para obtener los ítems del carrusel desde Supabase
  const fetchCarouselItems = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from('carousel_items')
      .select('*')
      .order('created_at', { ascending: true }); // Ordena por fecha de creación

    if (error) {
      console.error('Error fetching carousel items:', error);
      // Reemplazamos alert() con una lógica de UI
    } else {
      setCarouselItems(data || []);
    }
    setIsLoading(false);
  };

  // Cargar los datos al montar el componente
  useEffect(() => {
    fetchCarouselItems();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: keyof CarouselItem, itemId: number | null = null) => {
    if (itemId !== null) {
      setCarouselItems(
        carouselItems.map((item) =>
          item.id === itemId ? { ...item, [field]: e.target.value } : item
        )
      );
    } else {
      setNewItem({ ...newItem, [field]: e.target.value });
    }
  };

  const handleAddItem = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const { error } = await supabase
        .from('carousel_items')
        .insert([ newItem ]);

      if (error) {
        console.error('Error adding carousel item:', error);
        // Reemplazamos alert() con una lógica de UI
      } else {
        // En un entorno real, mostrarías una notificación de éxito
        fetchCarouselItems();
        setNewItem({
          src: "",
          alt: "",
          title: "",
          subtitle: "",
          buttonText: "",
          link: "",
        });
      }
    } catch (error) {
      console.error("Error al agregar el ítem:", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleUpdateItem = async (item: CarouselItem) => {
    setIsSubmitting(true);
    
    try {
      const { error } = await supabase
        .from('carousel_items')
        .update(item)
        .eq('id', item.id);

      if (error) {
        console.error('Error updating carousel item:', error);
      } else {
        setEditingItemId(null);
        fetchCarouselItems();
      }
    } catch (error) {
      console.error("Error al actualizar el ítem:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteItem = async (id: number) => {
    setIsSubmitting(true);
    
    try {
      const { error } = await supabase
        .from('carousel_items')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting carousel item:', error);
      } else {
        fetchCarouselItems();
      }
    } catch (error) {
      console.error("Error al eliminar el ítem:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Gestor de Carrusel</h2>
      <p className={styles.description}>Agrega, edita o elimina los elementos del carrusel de la página principal.</p>
      
      {isLoading ? (
        <div className={styles.loadingContainer}>
          <p>Cargando ítems...</p>
        </div>
      ) : (
        <>
          {/* Formulario para agregar un nuevo ítem */}
          <form onSubmit={handleAddItem} className={styles.form}>
            <h3 className={styles.formTitle}>Agregar Nuevo Ítem</h3>
            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label htmlFor="src">URL de la Imagen (src)</label>
                <input
                  type="url"
                  id="src"
                  value={newItem.src}
                  onChange={(e) => handleInputChange(e, "src")}
                  className={styles.input}
                  placeholder="Ej: https://.../imagen.jpg"
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="alt">Texto Alternativo (alt)</label>
                <input
                  type="text"
                  id="alt"
                  value={newItem.alt}
                  onChange={(e) => handleInputChange(e, "alt")}
                  className={styles.input}
                  placeholder="Ej: Personas sonriendo"
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="title">Título</label>
                <input
                  type="text"
                  id="title"
                  value={newItem.title || ''}
                  onChange={(e) => handleInputChange(e, "title")}
                  className={styles.input}
                  placeholder="Ej: Descubre algo nuevo"
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="subtitle">Subtítulo</label>
                <input
                  type="text"
                  id="subtitle"
                  value={newItem.subtitle || ''}
                  onChange={(e) => handleInputChange(e, "subtitle")}
                  className={styles.input}
                  placeholder="Ej: Oportunidades ilimitadas"
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="buttonText">Texto del Botón</label>
                <input
                  type="text"
                  id="buttonText"
                  value={newItem.buttonText || ''}
                  onChange={(e) => handleInputChange(e, "buttonText")}
                  className={styles.input}
                  placeholder="Ej: Explorar ahora"
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="link">Enlace (link)</label>
                <input
                  type="string"
                  id="link"
                  value={newItem.link || ''}
                  onChange={(e) => handleInputChange(e, "link")}
                  className={styles.input}
                  placeholder="Ej: /nueva-pagina"
                />
              </div>
            </div>
            <button type="submit" disabled={isSubmitting} className={styles.submitButton}>
              {isSubmitting ? "Agregando..." : "Agregar Ítem"}
            </button>
          </form>

          {/* Lista de ítems existentes */}
          <div className={styles.listContainer}>
            <h3 className={styles.listTitle}>Ítems Existentes</h3>
            {carouselItems.length === 0 ? (
              <p className={styles.emptyList}>No hay ítems en el carrusel.</p>
            ) : (
              <div className={styles.cardGrid}>
                {carouselItems.map((item) => (
                  <div key={item.id} className={styles.itemCard}>
                    {editingItemId === item.id ? (
                      // Modo de edición
                      <div className={styles.editForm}>
                         <div className={styles.formGroup}>
                          <label htmlFor={`src-${item.id}`}>URL de la Imagen</label>
                          <input
                            type="url"
                            id={`src-${item.id}`}
                            value={item.src}
                            onChange={(e) => handleInputChange(e, "src", item.id)}
                            placeholder="URL de la imagen"
                            className={styles.editInput}
                          />
                        </div>
                        <div className={styles.formGroup}>
                          <label htmlFor={`alt-${item.id}`}>Texto Alternativo</label>
                          <input
                            type="text"
                            id={`alt-${item.id}`}
                            value={item.alt}
                            onChange={(e) => handleInputChange(e, "alt", item.id)}
                            placeholder="Texto alternativo"
                            className={styles.editInput}
                          />
                        </div>
                        <div className={styles.formGroup}>
                          <label htmlFor={`title-${item.id}`}>Título</label>
                          <input
                            type="text"
                            id={`title-${item.id}`}
                            value={item.title || ''}
                            onChange={(e) => handleInputChange(e, "title", item.id)}
                            placeholder="Título"
                            className={styles.editInput}
                          />
                        </div>
                        <div className={styles.formGroup}>
                          <label htmlFor={`subtitle-${item.id}`}>Subtítulo</label>
                          <input
                            type="text"
                            id={`subtitle-${item.id}`}
                            value={item.subtitle || ''}
                            onChange={(e) => handleInputChange(e, "subtitle", item.id)}
                            placeholder="Subtítulo"
                            className={styles.editInput}
                          />
                        </div>
                        <div className={styles.formGroup}>
                          <label htmlFor={`buttonText-${item.id}`}>Texto del Botón</label>
                          <input
                            type="text"
                            id={`buttonText-${item.id}`}
                            value={item.buttonText || ''}
                            onChange={(e) => handleInputChange(e, "buttonText", item.id)}
                            placeholder="Texto del botón"
                            className={styles.editInput}
                          />
                        </div>
                        <div className={styles.formGroup}>
                          <label htmlFor={`link-${item.id}`}>Enlace</label>
                          <input
                            type="url"
                            id={`link-${item.id}`}
                            value={item.link || ''}
                            onChange={(e) => handleInputChange(e, "link", item.id)}
                            placeholder="Enlace"
                            className={styles.editInput}
                          />
                        </div>
                      </div>
                    ) : (
                      // Modo de visualización de la tarjeta
                      <>
                        <img src={item.src} alt={item.alt} className={styles.itemImage} />
                        <div className={styles.itemContent}>
                          <h4 className={styles.itemTitle}>{item.title}</h4>
                          <p className={styles.itemSubtitle}>{item.subtitle}</p>
                          <p className={styles.itemLink}>{item.link}</p>
                        </div>
                      </>
                    )}
                    <div className={styles.itemActions}>
                      {editingItemId === item.id ? (
                        <>
                          <button
                            onClick={() => handleUpdateItem(item)}
                            className={`${styles.actionButton} ${styles.saveButton}`}
                            disabled={isSubmitting}
                          >
                            Guardar
                          </button>
                          <button
                            onClick={() => setEditingItemId(null)}
                            className={`${styles.actionButton} ${styles.cancelButton}`}
                            disabled={isSubmitting}
                          >
                            Cancelar
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => setEditingItemId(item.id)}
                            className={`${styles.actionButton} ${styles.editButton}`}
                            disabled={isSubmitting}
                          >
                            Editar
                          </button>
                          <button
                            onClick={() => handleDeleteItem(item.id)}
                            className={`${styles.actionButton} ${styles.deleteButton}`}
                            disabled={isSubmitting}
                          >
                            Eliminar
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
