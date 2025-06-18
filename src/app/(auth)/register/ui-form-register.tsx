"use client";

import React from "react";
import styles from "./ui-form-register.module.css";
import { UiLink } from "@/lib/components/index";
import { useState } from "react";
import { registerAction } from "../server/login.action";
import { useRouter } from "next/navigation";

export function UiFormRegister() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }
    const response = await registerAction({ email, password });
    if (!response.status) {
      alert(response.error);
      return;
    }

    router.push("/login");
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
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
          minLength={8}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>

      <button type="submit" className={styles.submitButton}>
        Registrarse
      </button>

      <p className={styles.loginLink}>¿Ya tienes una cuenta?</p>
      <UiLink namePath="Inicia Sesión" href="/login" />
    </form>
  );
}

export default UiFormRegister;
