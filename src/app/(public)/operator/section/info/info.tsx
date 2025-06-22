"use client";

import { OperatorTableRow } from "@/lib/type";
import React from "react";
import styles from "./info.module.css";
import { PhoneIcon } from "@/lib/icons/phone-icon";
import { WhatsApp } from "@/lib/icons/whatsApp";
import { HeartIcon } from "@/lib/icons/heart-icon";

interface Props {
  operator: OperatorTableRow | null;
}
export function Info({ operator }: Props) {
  return (
    <div className={styles.container__info}>
      <div className={styles.container__info__img}>
        <div className={styles.content_heard}>
          <img
            src={operator?.logo ||  "/img/turismo.jpg"}
            alt={operator?.name}
          />
          <button className={styles.heart__icon}>
            <HeartIcon width={60} height={60} />
          </button>
        </div>
      </div>
      <div className={styles.container__info__info}>
        <h2 className={styles.title}>{operator?.name}</h2>
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
