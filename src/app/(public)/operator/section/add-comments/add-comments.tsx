"use client";

import React, { useState } from "react";
import styles from "./add-comments.module.css";
import { StarIcon } from "@/lib/icons/star-icon";
import { UserStore } from "@/lib/store/user.store";

export function AddComments() {
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const user = UserStore((item) => item.user);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;
    console.log("Comment submitted:", comment);
    // Here you would typically call an API to save the comment
    setComment("");
  };
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Deja tu comentario</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.star}>
          <button
            type="button"
            onClick={() => setRating(1)}
            className={styles.star__button}
          >
            <StarIcon isActive={rating >= 1} />
          </button>
          <button
            type="button"
            onClick={() => setRating(2)}
            className={styles.star__button}
          >
            <StarIcon isActive={rating >= 2} />
          </button>
          <button
            type="button"
            onClick={() => setRating(3)}
            className={styles.star__button}
          >
            <StarIcon isActive={rating >= 3} />
          </button>
          <button
            type="button"
            onClick={() => setRating(4)}
            className={styles.star__button}
          >
            <StarIcon isActive={rating >= 4} />
          </button>
          <button
            type="button"
            onClick={() => setRating(5)}
            className={styles.star__button}
          >
            <StarIcon isActive={rating >= 5} />
          </button>
        </div>
        <div className={styles.formGroup}>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className={styles.textarea}
            placeholder="Escribe tu comentario aquí..."
            rows={4}
            required
          />
        </div>
        <button
          type="submit"
          className={styles.submitButton}
          disabled={!user?.user_id}
        >
          {user?.user_id ? "Enviar comentario" : "Inicia sesión para comentar"}
        </button>
      </form>
    </div>
  );
}
