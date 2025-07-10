"use client";

import React from "react";
import styles from "./comentario.module.css";
import { DetailsOperatorTable } from "@/lib/type";
import { StarIcon } from "@/lib/icons/star-icon";

interface CommentariosProps {
  comments: DetailsOperatorTable[] | null;
}

export function Commentarios({ comments }: CommentariosProps) {
  return (
    <div className={styles.container}>
      <p className={styles.title}>Mis Reseñas</p>
      <p className={styles.text}>¿Ya visitaste San Luis de Gaceno?</p>
      <div className={styles.conatinerComentarios}>
        {comments?.length ? (
          comments.map((item) => (
            <div key={item.id} className={styles.comentario}>
              <p className={styles.name}>
                {item.operator?.name_company || item.operator?.name}
              </p>
              <div className={styles.stars}>
                <StarIcon isActive={item.start >= 1} />
                <StarIcon isActive={item.start >= 2} />
                <StarIcon isActive={item.start >= 3} />
                <StarIcon isActive={item.start >= 4} />
                <StarIcon isActive={item.start >= 5} />
              </div>
              <p className={styles.text}>{item.notes}</p>
            </div>
          ))
        ) : (
          <p>No hay reseñas</p>
        )}
      </div>
    </div>
  );
}
