"use client";
import React from "react";
import styles from "./footer.module.css";
import { DictionaryType } from "@/lib/translate/translate";

interface FooterProps {
  dictionary: DictionaryType;
}
export const Footer = ({ dictionary }: FooterProps) => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Header Section */}

        {/* Main Content Grid */}
        <div className={styles.grid}>
          {/* Newsletter Column */}
          <div className={styles.column}>
            <div className={styles.header}>
              <h1 className={styles.title}>
                {dictionary.footer.columna_titulo_principal.titulo}
              </h1>
              <p className={styles.tagline}>
                {dictionary.footer.columna_titulo_principal.eslogan}
              </p>
            </div>
            {/* <h2 className={styles.subtitle}>Contacto</h2>
            <div className={styles.contactForm}>
              <input
                type="email"
                placeholder="escribe tu email"
                className={styles.emailInput}
              />
              <button className={styles.subscribeButton}>suscribete</button>
            </div> */}
          </div>

          {/* Contact Info Column */}
          <div className={styles.column}>
            <h2 className={styles.subtitle}>
              {dictionary.footer.columna_contacto_alcaldia.titulo}
            </h2>
            <address className={styles.address}>
              <p className={styles.infoItem}>
                <span className={styles.label}>
                  {dictionary.footer.columna_contacto_alcaldia.direccion}:
                </span>
                <p className={ styles.directionalcaldia }>Carrera
                4 N° 6-09</p>
              </p>
              <p className={styles.infoItem}>
                <span className={styles.label}>
                  {dictionary.footer.columna_contacto_alcaldia.correo}:
                </span>
                <a
                  href="mailto:gacenoinspira@gmail.com"
                  className={styles.link}
                >
                  gacenoinspira@gmail.com
                </a>
              </p>
            </address>
          </div>

          {/* Social Links Column */}
          <div className={styles.column}>
            <h2 className={styles.subtitle}>
              {dictionary.footer.columna_redes_sociales.titulo}
            </h2>
            <ul className={styles.socialList}>
              <li className={styles.socialItem}>
                <a
                  href="https://www.facebook.com/profile.php?id=61577770353035"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                >
                  {dictionary.footer.columna_redes_sociales.facebook}
                </a>
              </li>
              <li className={styles.socialItem}>
                <a
                  href="https://www.instagram.com/gacenoinspira/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                >
                  {dictionary.footer.columna_redes_sociales.instagram}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright Section */}
        <div className={styles.copyright}>
          <p>
            © {new Date().getFullYear()}{" "}
            {dictionary.footer.seccion_derechos_autor.texto}
          </p>
        </div>
      </div>
    </footer>
  );
};
