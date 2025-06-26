"use client";

import { DetailsOperatorTable, OperatorTableRow } from "@/lib/type";
import React, { useState } from "react";
import styles from "./info.module.css";
import { UserIcon, PhoneIcon, WhatsApp, HeartIcon } from "@/lib/icons";
import { UserStore } from "@/lib/store/user.store";
import { addComment, updateDetails } from "@/lib/action";
import { ModalMessage } from "@/lib/components/modal-message/modal-message";

interface Props {
  operator: OperatorTableRow | null;
  details: DetailsOperatorTable[] | null;
  id?: string;
  accountId: string;
}
export function Info({ operator, details, id, accountId }: Props) {
  const user = UserStore((item) => item.user);
  const [isOpen, setIsOpen] = useState(false);
  const [messageModal, setMessageModal] = useState({
    title: "",
    message: "",
    buttonText: "",
  });
  const handleHeartClick = async () => {
    if (!user?.user_id) {
      const respo = await addComment({
        is_favorite: true,
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
        is_favorite: !details?.find(
          (detail) => detail.user_id === user?.user_id
        )?.is_favorite,
      },
      id!,
      accountId
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
    <div className={styles.container__info}>
      <div className={styles.container__info__img}>
        <div className={styles.content_heard}>
          <img
            src={operator?.logo || "/img/turismo.jpg"}
            alt={operator?.name}
          />
          <button className={styles.heart__icon} onClick={handleHeartClick}>
            <HeartIcon
              width={60}
              height={60}
              isLike={
                !!details?.find((detail) => detail.user_id === user?.user_id)
                  ?.is_favorite
              }
            />
          </button>
        </div>
      </div>
      <div className={styles.container__info__info}>
        <h2 className={styles.title}>{operator?.name_company}</h2>
        <div className={styles.phone}>
          <UserIcon width={60} height={60} />
          <div>
            <p>Nombre del Contacto</p>
            <p>{operator?.name}</p>
          </div>
        </div>
        <div className={styles.phone}>
          <PhoneIcon width={60} height={60} />
          <div>
            <p>Telefono</p>
            <a href={`tel:${operator?.phone}`}>{operator?.phone}</a>
          </div>
        </div>
        <div className={styles.phone}>
          <WhatsApp width={60} height={60} />
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
