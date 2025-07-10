"use client";

import React, { useState } from "react";
import Image from "next/image";
import { FaHeart } from "react-icons/fa";
import styles from "./favorite.module.css";
import { useRouter } from "next/navigation";
import { updateDetails } from "@/lib/action";
import { UserStore } from "@/lib/store/user.store";
import { ModalMessage } from "@/lib/components/modal-message/modal-message";

interface FavoriteItem {
  id: string;
  title: string;
  location: string;
  image: string;
  isFavorite: boolean;
  accountId: string;
  type: number;
}

interface FavoriteSectionProps {
  title?: string;
  subtitle?: string;
  description?: string;
  favorites?: FavoriteItem[];
}

export function Favorite({
  title = "Mis Favoritos",
  subtitle = "Tus lugares y experiencias favoritas en San Luis de Gaceno",
  description = "Aquí encontrarás todos los destinos, actividades y servicios que has guardado como favoritos. Puedes eliminarlos o añadirlos cuando quieras.",
  favorites = [],
}: FavoriteSectionProps) {
  const user = UserStore((item) => item.user);
  const [messageModal, setMessageModal] = useState({
    title: "",
    message: "",
    buttonText: "",
  });
  const [isOpen, setIsOpen] = useState(false);

  const onToggleFavorite = async ({
    id,
    isFavorite,
    accountId,
  }: {
    id: string;
    isFavorite: boolean;
    accountId: string;
  }) => {
    const resp = await updateDetails(
      {
        is_favorite: isFavorite,
      },
      id,
      accountId,
      user?.user_id ?? ""
    );
    if (!resp.status) {
      console.log("error 2", resp.error);
      setMessageModal({
        title: "Error",
        message: "No se pudo actualizar el detalle del operador",
        buttonText: "Aceptar",
      });
      setIsOpen(true);
      return;
    }
    setIsOpen(true);
    setMessageModal({
      title: "Detalle actualizado",
      message: "Detalle actualizado correctamente",
      buttonText: "Aceptar",
    });
  };

  const router = useRouter();
  return (
    <section className={styles.favoriteSection}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.description}>{description}</p>
          <h3 className={styles.subtitle}>{subtitle}</h3>
        </div>

        <div className={styles.favoriteGrid}>
          {favorites.map((item) => (
            <div key={item.id} className={styles.favoriteCard}>
              <div className={styles.imageContainer}>
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className={styles.image}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <button
                  className={`${styles.favoriteButton} ${
                    item.isFavorite ? styles.favorited : ""
                  }`}
                  onClick={() =>
                    onToggleFavorite({
                      id: item.accountId,
                      isFavorite: !item.isFavorite,
                      accountId: item.accountId,
                    })
                  }
                  aria-label={
                    item.isFavorite
                      ? "Eliminar de favoritos"
                      : "Añadir a favoritos"
                  }
                >
                  <FaHeart className={styles.heartIcon} />
                </button>
              </div>
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>{item.title}</h3>
                <p className={styles.cardLocation}>{item.location}</p>
              </div>
              <button
                className={styles.exploreButton}
                onClick={() => {
                  router.push(
                    item.type === 4
                      ? `/poblado/${item.id}`
                      : `/operator/${item.id}`
                  );
                }}
              >
                VER MAS ...
              </button>
            </div>
          ))}
        </div>
      </div>
      <ModalMessage
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
          setMessageModal({
            title: "",
            message: "",
            buttonText: "",
          });
        }}
        title={messageModal.title}
        message={messageModal.message}
        buttonText={messageModal.buttonText}
      />
    </section>
  );
}
