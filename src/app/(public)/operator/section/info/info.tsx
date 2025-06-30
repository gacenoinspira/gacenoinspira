"use client";

import { DetailsOperatorTable, OperatorTableRow } from "@/lib/type";
import React, { useEffect, useState } from "react";
import styles from "./info.module.css";
import { UserIcon, PhoneIcon, WhatsApp, HeartIcon } from "@/lib/icons";
import { UserStore } from "@/lib/store/user.store";
import { addComment, updateDetails } from "@/lib/action";
import { ModalMessage } from "@/lib/components/modal-message/modal-message";

interface Props {
  operator: OperatorTableRow | null;
  details: DetailsOperatorTable[] | null;
  id: string;
  accountId: string;
}
export function Info({ operator, details, id, accountId }: Props) {
  const user = UserStore((item) => item.user);
  const [isOpen, setIsOpen] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
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
      console.log("error", respo.error);
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

  return (
    <div className={styles.container__info}>
      <div className={styles.container__info__img}>
        <div className={styles.content_heard}>
          <img
            src={operator?.logo || "/img/turismo.jpg"}
            alt={operator?.name}
          />
          <button className={styles.heart__icon} onClick={handleHeartClick}>
            <HeartIcon width={30} height={30} isLike={isFavorite} />
          </button>
        </div>
      </div>
      <div className={styles.container__info__info}>
        <h2 className={styles.title}>{operator?.name_company}</h2>
        <div className={styles.phone}>
          <UserIcon width={30} height={30} />
          <div>
            <p>Nombre del Contacto</p>
            <p>{operator?.name}</p>
          </div>
        </div>
        <div className={styles.phone}>
          <PhoneIcon width={30} height={30} />
          <div>
            <p>Telefono</p>
            <a href={`tel:${operator?.phone}`}>{operator?.phone}</a>
          </div>
        </div>
        <div className={styles.phone}>
          <WhatsApp width={30} height={30} />
          <div>
            <p>Whatsapp</p>
            <a href={`https://wa.me/${operator?.phone}`}>{operator?.phone}</a>
          </div>
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
    </div>
  );
}
