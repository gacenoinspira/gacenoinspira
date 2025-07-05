"use client";

import React from "react";
import styles from "./card.module.css";
import { useRouter } from "next/navigation";

interface Props {
  img?: string;
  title?: string;
  id: string;
}

export function UiCard({
  img = "/img/san_luis.jpeg",
  title = "card ejemplo del titulo",
  id,
}: Props) {
  const router = useRouter();
  return (
    <div
      style={{ backgroundImage: `url(${img})` }}
      className={styles.card}
      onClick={() => router.push(`/poblado/${id}`)}
    >
      <h2 className={styles.title}>{title}</h2>
    </div>
  );
}
