"use client";

import React from "react";
import styles from "./ui-form-register.module.css";
import { UiLink } from "@/lib/components/index";

export function UiFormRegister() {
  return (
    <form className={styles.form}>
      <h2 className={styles.title}>Crear Cuenta</h2>

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
          minLength={8}
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="confirmPassword" className={styles.label}>
          Confirmar Contraseña
        </label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          className={styles.input}
          placeholder="••••••••"
          required
          minLength={8}
        />
      </div>

      <button type="submit" className={styles.submitButton}>
        Registrarse
      </button>

      <p className={styles.loginLink}>
        ¿Ya tienes una cuenta? <UiLink namePath="Inicia Sesión" href="/login" />
      </p>
    </form>
  );
}

export default UiFormRegister;
