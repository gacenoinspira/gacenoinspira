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
              <h1 className={styles.title}>GACENO INSPIRA</h1>
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
                Calle Principal #123, San Luis de Gaceno, Bogacol
              </p>
              <p className={styles.infoItem}>
                <span className={styles.label}>Correo:</span>
                <a
                  href="mailto:turismo@gacenoinspira.gov.co"
                  className={styles.link}
                >
                  turismo@gacenoinspira.gov.co
                </a>
              </p>
              <p className={styles.infoItem}>
                <span className={styles.label}>Teléfono:</span>
                <a href="tel:+573214567890" className={styles.link}>
                  (+57) 321 456 7890
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
                  href="https://facebook.com/gacenoinspira"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                >
                  Facebook
                </a>
              </li>
              <li className={styles.socialItem}>
                <a
                  href="https://instagram.com/gacenoinspira"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                >
                  Instagram
                </a>
              </li>
              <li className={styles.socialItem}>
                <a
                  href="https://youtube.com/gacenoinspira"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                >
                  YouTube
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
