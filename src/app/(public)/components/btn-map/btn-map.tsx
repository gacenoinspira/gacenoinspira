"use client";

import Link from "next/link";
import React from "react";
import styles from "./btn-map.module.css";

export function BtnMap() {
  return (
    <Link href="/map">
      <div className={styles.map}>
        <p className={styles.link}>
          ¿Qué tan cerca estás de San Luis de Gaceno?
        </p>
      </div>
    </Link>
  );
}
