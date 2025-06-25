"use client";

import React from "react";
import styles from "./modal.module.css";

interface ModalMessageProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
  buttonText?: string;
  onButtonClick?: () => void;
}

export function ModalMessage({
  isOpen,
  onClose,
  title = "Guardado en 'Mis Favoritos'",
  message = "Cuando vuelvas estará disponible para planear tu viaje o buscarlo con más facilidad",
  buttonText = "VER FAVORITOS",
  onButtonClick,
}: ModalMessageProps) {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={onClose}>
          ×
        </button>
        <div
          className={`${styles.checkCircle} ${
            title === "Error" ? styles.error : ""
          }`}
        >
          <span className={styles.checkIcon}>
            {title === "Error" ? "✗" : "✓"}
          </span>
        </div>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.message}>{message}</p>
        <button
          className={styles.actionButton}
          onClick={onButtonClick || onClose}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
}
