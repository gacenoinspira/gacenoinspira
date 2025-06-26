"use client";

import React from "react";
import styles from "./header-page.module.css";

// Extend the CSSProperties interface to include custom properties
declare module 'react' {
  interface CSSProperties {
    '--backgroundImage'?: string;
  }
}

export function HeaderPage() {
  return (
    <header
      className={styles.header}
      style={{
        '--backgroundImage': `url(${"/img/san_luis.jpeg"})`,
      } as React.CSSProperties}
    >
      <div className={styles.overlay}></div>
      <div className={styles.content}>
        <h1 className={styles.title}>
          <span>Iglesia Centro Poblado</span>
          <span>Guamal</span>
        </h1>
      </div>
    </header>
  );
}
