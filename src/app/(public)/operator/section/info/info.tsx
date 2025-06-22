"use client";

import { DetailsOperatorTable, OperatorTableRow } from "@/lib/type";
import React from "react";
import styles from "./info.module.css";
import { UserIcon, PhoneIcon, WhatsApp, HeartIcon } from "@/lib/icons";

interface Props {
  operator: OperatorTableRow | null;
  details: DetailsOperatorTable | null;
}
export function Info({ operator, details }: Props) {
  return (
    <div className={styles.container__info}>
      <div className={styles.container__info__img}>
        <div className={styles.content_heard}>
          <img
            src={operator?.logo || "/img/turismo.jpg"}
            alt={operator?.name}
          />
          <button className={styles.heart__icon}>
            <HeartIcon width={60} height={60} isLike={!!details?.is_favorite} />
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
    </div>
  );
}
