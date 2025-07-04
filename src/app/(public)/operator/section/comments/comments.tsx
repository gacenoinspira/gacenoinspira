"use client";

import { DetailsOperatorTable } from "@/lib/type";
import React from "react";
import styles from "./comments.module.css";
import { CommentsIcon } from "@/lib/icons";

interface Props {
  comments: DetailsOperatorTable[];
}

export function Comments({ comments }: Props) {
  const itemsCards = comments.map((comment) => ({
    name: comment.userInfo?.name,
    comment: comment.notes,
  }));

  return (
    <>
      {itemsCards.length ? (
        <div className={styles.container__comments}>
          <h1>Comentarios</h1>

          <div className={styles.carouselContainer}>
            {itemsCards.map((item, index) => {
              const initials = item.name
                ? item.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()
                : "US";
              const colors = [
                "#FF6B6B",
                "#4ECDC4",
                "#45B7D1",
                "#96CEB4",
                "#FFEEAD",
              ];
              const color = colors[1];

              return (
                <div className={styles.card} key={index}>
                  <div className={styles.cardHeader}>
                    <div
                      className={styles.avatar}
                      style={{ backgroundColor: color }}
                    >
                      {initials}
                    </div>
                    <div className={styles.userInfo}>
                      <h4 className={styles.userName}>
                        {item.name || "Usuario"}
                      </h4>
                      <span className={styles.commentDate}>Hoy</span>
                    </div>
                  </div>
                  <div className={styles.cardBody}>
                    <p className={styles.commentText}>
                      {item.comment || "Sin comentario"}
                    </p>
                  </div>
                  <div className={styles.cardFooter}>
                    <button className={styles.actionButton}>
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M4 12v7a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7"></path>
                        <polyline points="16 6 12 2 8 6"></polyline>
                        <line x1="12" y1="2" x2="12" y2="15"></line>
                      </svg>
                    </button>
                    <button className={styles.actionButton}>
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className={styles.noComments}>
          <CommentsIcon width={100} height={100} />
          <p>No hay comentarios</p>
        </div>
      )}
    </>
  );
}
