"use client";

import React, { useState } from "react";
import styles from "./add-comments.module.css";
import { StarIcon } from "@/lib/icons/star-icon";
import { UserStore } from "@/lib/store/user.store";
import { addComment } from "@/lib/action";

export function AddComments({ id }: { id: string }) {
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const user = UserStore((item) => item.user);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;
    setLoading(true);
    const resp = await addComment({
      notes: comment.trim(),
      start: rating,
      user_id: user?.user_id,
      id_operator: id,
    });
    setLoading(false);
    if (!resp.status) {
      alert(resp.error);
      return;
    }
    setComment("");
    setRating(0);
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
          disabled={!user?.user_id && (rating === 0 || comment.trim() === "")}
        >
          {user?.user_id
            ? loading
              ? "Enviando..."
              : "Enviar comentario"
            : "Inicia sesión para comentar"}
        </button>
      </form>
    </div>
  );
}
