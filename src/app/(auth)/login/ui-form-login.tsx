"use client";

import React, { useState } from "react";
import styles from "./ui-form-login.module.css";
import { UiLink } from "@/lib/components/index";
import { useRouter } from "next/navigation";
import { loginAction } from "../server/login.action";
import { UserStore } from "@/lib/store/user.store";
import { ModalMessage } from "@/lib/components/modal-message/modal-message";

export function UiFormLogin() {
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
        password: formData.password 
      });
      
      if (!response.status) {
        setMessage({
          title: "Error",
          message: response.error || "Error al iniciar sesión",
          buttonText: "Entendido"
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
        buttonText: "Entendido"
      });
      setIsOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.mainTitle}>INICIAR SESIÓN</h1>
        <p className={styles.subtitle}>Bienvenido de nuevo a San Luis de Gaceno</p>
      </div>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={`${styles.formGroup} ${styles.fullWidth}`}>
          <label htmlFor="email" className={styles.label}>
            Correo electrónico
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
            Contraseña
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
          {isLoading ? 'Iniciando sesión...' : 'INICIAR SESIÓN'}
        </button>
      </form>

      <div className={styles.loginLink}>
        ¿No tienes una cuenta?{' '}
        <UiLink 
          namePath="Regístrate" 
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
