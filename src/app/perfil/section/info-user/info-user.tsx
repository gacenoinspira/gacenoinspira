"use client";
import React, { useState } from "react";
import styles from "./info-user.module.css";
import { convertToWebP } from "@/lib/utils/ceonvertWebp";
import { uploadToSupabase } from "@/lib/action/load-img";
import { updateInfoUser } from "@/lib/action";
import { ModalMessage, Spinner } from "@/lib/components/index";
import { DictionaryType } from "@/lib/translate/translate";

interface UserStats {
  label: string;
  value: number;
}

interface InfoUserProps {
  name?: string;
  role?: string;
  initials?: string;
  stats?: UserStats[];
  avatar?: string;
  id: string;
  dictionary?: DictionaryType;
}

export function InfoUser({
  name = "NOMBRE USUARIO",
  role = "VIAJERO",
  initials = "NU",
  id,
  avatar,
  dictionary,
}: InfoUserProps) {
  const [openModal, setOpenModal] = React.useState(false);
  const [message, setMessage] = useState({
    title: "",
    message: "",
    buttonText: "",
  });
  const [loading, setLoading] = useState(false);

  const uploadPhoto = async (file: File) => {
    setLoading(true);
    const { fileName, webpBlob } = await convertToWebP(file);
    const resp = await uploadToSupabase({
      path: `logo/${new Date().getTime()}${fileName}`,
      webpBlob: webpBlob,
      mimeType: "image/webp",
    });

    const respUpdate = await updateInfoUser({
      body: {
        avatar: resp.publicUrl,
      },
      id: id,
    });
    if (!respUpdate.status) {
      setMessage({
        title: "Error",
        message: respUpdate.error,
        buttonText: "Aceptar",
      });
      setOpenModal(true);
      setLoading(false);
      return;
    }
    setMessage({
      title: "Exito",
      message: "Avatar actualizado correctamente",
      buttonText: "Aceptar",
    });
    setOpenModal(true);
    setLoading(false);
  };
  return (
    <div className={styles.profileContainer}>
      <div className={styles.profileHeader}>
        <div className={styles.profileInfo}>
          <h1 className={styles.welcomeText}>{dictionary?.perfil.welcome}</h1>
          <p className={styles.descriptionText}>
            {dictionary?.perfil.paragraph}
          </p>

          <div className={styles.userInfo}>
            <h2 className={styles.userName}>{name}</h2>
            <p className={styles.userRole}>{role}</p>
          </div>
        </div>

        <div className={styles.avatarContainer}>
          <div
            className={styles.avatar}
            style={
              avatar
                ? {
                    backgroundImage: `url(${avatar})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }
                : {}
            }
          >
            {!avatar && (
              <span className={styles.avatarInitials}>{initials}</span>
            )}
            <input
              type="file"
              id="profile-photo"
              accept="image/*"
              className={styles.fileInput}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  // Aquí puedes manejar la subida de la imagen
                  uploadPhoto(file);
                }
              }}
            />
            <label htmlFor="profile-photo" className={styles.uploadButton}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="17 8 12 3 7 8"></polyline>
                <line x1="12" y1="3" x2="12" y2="15"></line>
              </svg>
            </label>
          </div>
        </div>
      </div>
      <ModalMessage
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        message={message.message}
        title={message.title}
        buttonText={message.buttonText}
      />
      {loading && <Spinner />}
    </div>
  );
}
