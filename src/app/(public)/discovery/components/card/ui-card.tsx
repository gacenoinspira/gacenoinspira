"use client";

import React from "react";
import styles from "./card.module.css";

interface Props {
  img?: string;
  title?: string;
}

export function UiCard({
  img = "/img/san_luis.jpeg",
  title = "card ejemplo del titulo",
}: Props) {
  return (
    <div style={{ backgroundImage: `url(${img})` }} className={styles.card}>
      <h2 className={styles.title}>{title}</h2>
    </div>
  );
}
