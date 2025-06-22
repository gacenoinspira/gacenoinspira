"use client";

import { OperatorTableRow } from "@/lib/type";
import React from "react";
import styles from "./info.module.css";
import { PhoneIcon } from "@/lib/icons/phone-icon";
import { WhatsApp } from "@/lib/icons/whatsApp";

interface Props {
  operator: OperatorTableRow | null;
}
export function Info({ operator }: Props) {
  return (
    <div className={styles.container__info}>
      <div className={styles.container__info__img}>
        <img src={"/img/turismo.jpg"} alt={operator?.name} />
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
