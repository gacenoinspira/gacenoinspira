"use client";

import React, { useState } from "react";
import styles from "./ui-form-login.module.css";
import { UiLink } from "@/lib/components/index";
import { useRouter } from "next/navigation";
import { loginAction } from "../server/login.action";
import { UserStore } from "@/lib/store/user.store";
import { ModalMessage } from "@/lib/components/modal-message/modal-message";
import { DictionaryType } from "@/lib/translate/translate";

interface Props {
  dictionary: DictionaryType;
}

export function UiFormLogin({ dictionary }: Props) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState({
    title: "",
    message: "",
    buttonText: "Aceptar",
  });
  const { setUser } = UserStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await loginAction({
        email: formData.email,
        password: formData.password,
      });

      if (!response.status) {
        setMessage({
          title: "Error",
          message: response.error || "Error al iniciar sesión",
          buttonText: "Entendido",
        });
        setIsOpen(true);
        return;
      }

      setUser(response.data);
      router.push(response.data?.rol === 1 ? "/admin" : "/");
    } catch {
      setMessage({
        title: "Error",
        message: "Ocurrió un error al intentar iniciar sesión",
        buttonText: "Entendido",
      });
      setIsOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.mainTitle}>{dictionary.login.title}</h1>
        <p className={styles.subtitle}>{dictionary.login.subtitle}</p>
      </div>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={`${styles.formGroup} ${styles.fullWidth}`}>
          <label htmlFor="email" className={styles.label}>
            {dictionary.login.email}
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className={styles.input}
            placeholder="tu@email.com"
            value={formData.email}
            onChange={handleChange}
            disabled={isLoading}
          />
        </div>

        <div className={`${styles.formGroup} ${styles.fullWidth}`}>
          <label htmlFor="password" className={styles.label}>
            {dictionary.login.password}
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className={styles.input}
            placeholder="••••••••"
            value={formData.password}
            onChange={handleChange}
            disabled={isLoading}
          />
        </div>

        <button
          type="submit"
          className={styles.submitButton}
          disabled={isLoading}
        >
          {isLoading ? dictionary.login.textLoading : dictionary.login.btnLogin}
        </button>
      </form>

      <div className={styles.loginLink}>
        {dictionary.login.createAccount}
        <UiLink
          namePath={dictionary.login.btnRegister}
          href="/register"
          className={styles.registerLink}
        />
      </div>

      <ModalMessage
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title={message.title}
        message={message.message}
        buttonText={message.buttonText}
      />
    </div>
  );
}
