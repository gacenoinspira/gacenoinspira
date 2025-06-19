"use client";

import React, { useState } from "react";
import styles from "./ui-form-login.module.css";
import { UiLink } from "@/lib/components/index";
import { useRouter } from "next/navigation";
import { loginAction } from "../server/login.action";
import { UserStore } from "@/lib/store/user.store";

export function UiFormLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = UserStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await loginAction({ email, password });
    if (!response.status) {
      alert(response.error);
      return;
    }
    setUser(response.data);
    router.push(response.data?.rol === 1 ? "/admin" : "/");
  };
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2 className={styles.title}>Iniciar Sesión</h2>

      <div className={styles.formGroup}>
        <label htmlFor="email" className={styles.label}>
          Correo Electrónico
        </label>
        <input
          type="email"
          id="email"
          name="email"
          className={styles.input}
          placeholder="tu@email.com"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="password" className={styles.label}>
          Contraseña
        </label>
        <input
          type="password"
          id="password"
          name="password"
          className={styles.input}
          placeholder="••••••••"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className={styles.optionsContainer}>
        <UiLink
          namePath="¿Olvidaste tu contraseña?"
          href="#"
          className={styles.forgotPassword}
        />
      </div>

      <button type="submit" className={styles.submitButton}>
        Iniciar Sesión
      </button>

      <p className={styles.signupLink}>¿No tienes una cuenta? </p>
      <UiLink
        namePath="Registrate"
        className={styles.signupLinkAction}
        href={"/register"}
      />
    </form>
  );
}
