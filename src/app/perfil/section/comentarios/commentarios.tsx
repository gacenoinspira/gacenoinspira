"use client";

import React, { useState } from "react";
import styles from "./comentario.module.css";
import { DetailsOperatorTable } from "@/lib/type";
import { StarIcon } from "@/lib/icons/star-icon";
import { ModalMessage } from "@/lib/components/index";
import { updateDetails } from "@/lib/action";
import { UserStore } from "@/lib/store/user.store";

interface CommentariosProps {
  comments: DetailsOperatorTable[] | null;
}

export function Commentarios({ comments }: CommentariosProps) {
  const user = UserStore((user) => user.user);
  const [messageModal, setMessageModal] = useState({
    title: "",
    message: "",
    buttonText: "",
  });
  const [isOpen, setIsOpen] = useState(false);
  const [commentSelected, setCommentSelected] = useState<string>("");
  const [commentId, setCommentId] = useState<string>("");
  const [commentAccountId, setCommentAccountId] = useState<string>("");

  const onToggleModal = () => {
    setIsOpen(!isOpen);
  };

  const onEditComment = async () => {
    const { data } = await updateDetails(
      { notes: commentSelected },
      commentAccountId,
      commentId,
      user?.user_id || ""
    );
    if (!data?.id) {
      setMessageModal({
        title: "Error",
        message: "No se pudo actualizar el detalle del operador",
        buttonText: "Aceptar",
      });
      setIsOpen(true);
      return;
    }
    setIsOpen(true);
    setMessageModal({
      title: "Detalle actualizado",
      message: "Detalle actualizado correctamente",
      buttonText: "Aceptar",
    });
    setCommentId("");
    setCommentSelected("");
  };

  const onDeleteComment = async ({
    id,
    accountId,
  }: {
    id: string;
    accountId: string;
  }) => {
    const { data } = await updateDetails(
      { notes: "", start: 0 },
      accountId,
      id,
      user?.user_id || ""
    );
    if (!data?.id) {
      setMessageModal({
        title: "Error",
        message: "No se pudo actualizar el detalle del operador",
        buttonText: "Aceptar",
      });
      setIsOpen(true);
      return;
    }
    setIsOpen(true);
    setMessageModal({
      title: "Detalle eliminado",
      message: "Detalle eliminado correctamente",
      buttonText: "Aceptar",
    });
    setCommentId("");
    setCommentSelected("");
  };

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
              {commentId === item.id ? (
                <textarea
                  value={commentSelected}
                  onChange={(e) => setCommentSelected(e.target.value)}
                  className={styles.textarea}
                />
              ) : (
                <p className={styles.text}>{item.notes}</p>
              )}
              <div className={styles.actions}>
                <button
                  className={styles.btn}
                  onClick={() => {
                    if (commentId === item.id) {
                      onEditComment();
                    } else {
                      setCommentId(item.id);
                      setCommentSelected(item.notes);
                      setCommentAccountId(item.id_operator);
                    }
                  }}
                >
                  {commentId === item.id ? "Guardar" : "Editar"}
                </button>
                <button
                  className={styles.btn}
                  onClick={() => {
                    if (commentId === item.id) {
                      setCommentId("");
                      setCommentSelected("");
                    } else {
                      onDeleteComment({
                        id: item.id,
                        accountId: item.id_operator,
                      });
                    }
                  }}
                >
                  {commentId === item.id ? "Cancelar" : "Eliminar"}
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No hay reseñas</p>
        )}
      </div>
      <ModalMessage
        isOpen={isOpen}
        onClose={onToggleModal}
        title={messageModal.title}
        message={messageModal.message}
        buttonText={messageModal.buttonText}
      />
    </div>
  );
}
