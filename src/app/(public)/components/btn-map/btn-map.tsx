"use client";

import Link from "next/link";
import React from "react";
import styles from "./btn-map.module.css";

interface Props {
  text: string;
}

export function BtnMap({ text }: Props) {
  return (
    <Link href="/map">
      <div className={styles.map}>
        <p className={styles.link}>{text}</p>
      </div>
    </Link>
  );
}
