"use client";

import React, { useState } from "react";
import styles from "./ui-form-register.module.css";
import { UiLink } from "@/lib/components/index";
import { registerAction } from "../server/login.action";
//import { useRouter } from "next/navigation";
import { UserStore } from "@/lib/store/user.store";
import { ModalMessage } from "@/lib/components/modal-message/modal-message";
import { DictionaryType } from "@/lib/translate/translate";

interface Props {
  dictionary: DictionaryType;
}

export function UiFormRegister({ dictionary }: Props) {
  const [formData, setFormData] = useState({
    firstName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [ ,setPasswordStrength] = useState("");
  const [passwordSuggestions, setPasswordSuggestions] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState({
    title: "",
    message: "",
    buttonText: "",
  });

  const setUser = UserStore((set) => set.setUser);
  //const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Password strength check
    if (name === "password") {
      checkPasswordStrength(value);
    }
  };

  const checkPasswordStrength = (password: string) => {
    const suggestions = [];

    if (password.length < 6) {
      suggestions.push("Al menos 6 caracteres");
    }
    // if (!/[a-z]/.test(password)) {
    //   suggestions.push("Letras minúsculas");
    // }
    // if (!/[A-Z]/.test(password)) {
    //   suggestions.push("Letras mayúsculas");
    // }
    // if (!/\d/.test(password)) {
    //   suggestions.push("Dígitos");
    // }
    // if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    //   suggestions.push("Signos de puntuación");
    // }

    setPasswordSuggestions(suggestions);

    if (suggestions.length === 0) {
      setPasswordStrength("Fuerte");
    } else if (suggestions.length <= 2) {
      setPasswordStrength("Media");
    } else {
      setPasswordStrength("Débil");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setMessage({
        title: "Error",
        message: "Las contraseñas no coinciden",
        buttonText: "Aceptar",
      });
      setIsOpen(true);
      return;
    }

    if (!termsAccepted || !privacyAccepted) {
      setMessage({
        title: "Error",
        message:
          "Debes aceptar los términos y condiciones y la política de privacidad",
        buttonText: "Aceptar",
      });
      setIsOpen(true);
      return;
    }

    if (!formData.firstName || !formData.email || !formData.password) {
      setMessage({
        title: "Error",
        message: "Los campos no pueden estar vacíos",
        buttonText: "Aceptar",
      });
      setIsOpen(true);
      return;
    }
    // passwordStrength !== "Fuerte" ||
    if (passwordSuggestions.length > 0) {
      setMessage({
        title: "Error",
        message: "La contraseña no cumple con los requisitos de seguridad",
        buttonText: "Aceptar",
      });
      setIsOpen(true);
      return;
    }

    if (!/^[a-zA-Z\s]+$/.test(formData.firstName)) {
      setMessage({
        title: "Error",
        message: "El nombre solo puede contener letras y espacios",
        buttonText: "Aceptar",
      });
      setIsOpen(true);
      return;
    }

    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(formData.email)) {
      setMessage({
        title: "Error",
        message: "El correo electrónico debe ser válido",
        buttonText: "Aceptar",
      });
      setIsOpen(true);
      return;
    }

    const response = await registerAction({
      email: formData.email,
      password: formData.password,
      name: formData.firstName,
    });

    if (!response.status) {
      setMessage({
        title: "Error",
        message: response.error,
        buttonText: "Aceptar",
      });
      setIsOpen(true);
      return;
    }

    setUser(response.data);
    // router.push("/");
    setIsOpen(true);
    setMessage({
      title: "Exito",
      message: "Usuario creado exitosamente",
      buttonText: "Aceptar",
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.mainTitle}>{dictionary.register.title}</h1>
        <p className={styles.subtitle}>{dictionary.register.subtitle}</p>
      </div>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formGrid}>
          <div className={styles.formGroup}>
            <label htmlFor="firstName" className={styles.label}>
              {dictionary.register.name}
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              className={styles.input}
              placeholder={dictionary.register.name}
              value={formData.firstName}
              onChange={handleChange}
            />
          </div>

          <div className={`${styles.formGroup} ${styles.fullWidth}`}>
            <label htmlFor="email" className={styles.label}>
              {dictionary.register.email}
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className={styles.input}
              placeholder="tu@email.com"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className={`${styles.formGroup} ${styles.fullWidth}`}>
            <label htmlFor="password" className={styles.label}>
              {dictionary.register.password}
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className={styles.input}
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <div className={`${styles.formGroup} ${styles.fullWidth}`}>
            <label htmlFor="confirmPassword" className={styles.label}>
              {dictionary.register.confirmPassword}
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              className={styles.input}
              placeholder="••••••••"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>

          {formData.password && (
            <div className={`${styles.passwordStrength} ${styles.fullWidth}`}>
              {/* <div className={styles.strengthHeader}>
                <span>Fortaleza de la contraseña:</span>
                <span
                  className={`${styles.strengthValue} ${
                    passwordStrength === "Fuerte"
                      ? styles.strong
                      : passwordStrength === "Media"
                      ? styles.medium
                      : styles.weak
                  }`}
                >
                  {passwordStrength}
                </span>
              </div> */}
              <ul className={styles.suggestionsList}>
                {passwordSuggestions.map((suggestion, index) => (
                  <li key={index} className={styles.suggestionItem}>
                    {suggestion}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className={styles.checkboxGroup}>
          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
              className={styles.checkbox}
            />
            <span>
              {dictionary.register.readTerms}{" "}
              <a href="/term-condition" className={styles.link} target="_blank">
                {dictionary.register.terms}
              </a>
            </span>
          </label>

          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked={privacyAccepted}
              onChange={(e) => setPrivacyAccepted(e.target.checked)}
              className={styles.checkbox}
            />
            <span>
              {dictionary.register.readTerms}{" "}
              <a href="/privacity" className={styles.link} target="_blank">
                {dictionary.register.privacy}
              </a>
            </span>
          </label>
        </div>

        <button type="submit" className={styles.submitButton}>
          {dictionary.register.btnRegister}
        </button>
      </form>

      <div className={styles.loginLink}>
        {dictionary.register.createAccount}{" "}
        <UiLink
          namePath={dictionary.login.title}
          href="/login"
          className={styles.loginLinkText}
        />
      </div>
      <ModalMessage
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        message={message.message}
        title={message.title}
        buttonText={message.buttonText}
      />
    </div>
  );
}

export default UiFormRegister;
