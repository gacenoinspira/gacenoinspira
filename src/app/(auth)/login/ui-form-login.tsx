"use client";

import React from "react";
import styles from "./ui-form-login.module.css";
import { UiLink } from "@/lib/components/index";

export function UiFormLogin() {
  return (
    <form className={styles.form}>
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

      <p className={styles.signupLink}>
        ¿No tienes una cuenta?{" "}
        <UiLink
          namePath="Registrate"
          className={styles.signupLinkAction}
          href={"/register"}
        />
      </p>
    </form>
  );
}
