"use client";

import React, { useEffect, useState } from "react";
import styles from "./header-page.module.css";
import { DetailsOperatorTable } from "@/lib/type";
import { UserStore } from "@/lib/store/user.store";
import { addComment, updateDetails } from "@/lib/action";
import { ModalMessage } from "@/lib/components/index";

// Extend the CSSProperties interface to include custom properties
declare module "react" {
  interface CSSProperties {
    "--backgroundImage"?: string;
  }
}

interface HeaderPageProps {
  title: string;
  logo: string;
  id: string;
  type: number;
  details: DetailsOperatorTable[] | null;
}

export function HeaderPage({
  title,
  logo,
  id,
  type,
  details,
}: HeaderPageProps) {
  const user = UserStore((item) => item.user);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [messageModal, setMessageModal] = useState({
    title: "",
    message: "",
    buttonText: "",
  });

  const infoDetails = details?.find(
    (item) => item.user_id === user?.user_id && item.id_operator === id
  );

  useEffect(() => {
    setIsFavorite(infoDetails?.is_favorite || false);
  }, [infoDetails]);

  const handleHeartClick = async () => {
    if (!infoDetails?.id) {
      const respo = await addComment({
        is_favorite: !isFavorite,
        notes: "",
        start: 0,
        user_id: user?.user_id,
        id_operator: id!,
      });
      if (!respo.status) {
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
      return;
    }
    const resp = await updateDetails(
      {
        is_favorite: !isFavorite,
      },
      id, //operador
      id, //operador
      user?.user_id ?? ""
    );
    if (!resp.status) {
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
  return (
    <>
      <header
        className={styles.header}
        style={
          {
            "--backgroundImage": `url(${logo || "/img/san_luis.jpeg"})`,
          } as React.CSSProperties
        }
      >
        <div className={styles.overlay}></div>
        <div className={styles.content}>
          <h1 className={styles.title}>
            <span>{title}</span>
          </h1>
        </div>
        {type === 4 && (
          <button
            className={styles.btn__favorite}
            onClick={() => {
              handleHeartClick();
              setIsFavorite(!isFavorite);
            }}
          >
            {isFavorite ? "Quitar de favoritos" : "Agregar a favoritos"}
          </button>
        )}
      </header>
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
    </>
  );
}
