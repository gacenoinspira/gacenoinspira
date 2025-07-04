"use client";
import React from "react";
import styles from "./footer.module.css";

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Header Section */}

        {/* Main Content Grid */}
        <div className={styles.grid}>
          {/* Newsletter Column */}
          <div className={styles.column}>
            <div className={styles.header}>
              <h1 className={styles.title}>SAN LUIS DE GACENO INSPIRA</h1>
              <p className={styles.tagline}>
                Donde la aventura, la cultura y la naturaleza se encuentran.
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
              Alcaldía Municipal de San Luis de Gaceno
            </h2>
            <address className={styles.address}>
              <p className={styles.infoItem}>
                <span className={styles.label}>Dirección:</span>
                Dirección: Carrera 4 N° 6-09
              </p>
              <p className={styles.infoItem}>
                <span className={styles.label}>Correo:</span>
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
            <h2 className={styles.subtitle}>Redes Sociales</h2>
            <ul className={styles.socialList}>
              <li className={styles.socialItem}>
                <a
                  href="https://www.facebook.com/profile.php?id=61577770353035"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                >
                  Facebook
                </a>
              </li>
              <li className={styles.socialItem}>
                <a
                  href="https://www.instagram.com/gacenoinspira/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                >
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright Section */}
        <div className={styles.copyright}>
          <p>
            © {new Date().getFullYear()} Alcaldía Municipal de San Luis de
            Gaceno. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};
