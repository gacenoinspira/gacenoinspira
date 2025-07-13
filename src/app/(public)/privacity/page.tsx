import React from "react";
import styles from "./term.module.css";
import { getDictionary } from "@/lib/translate/translate";

export default async function PagePrivacy() {
  const { dictionary } = await getDictionary();
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{dictionary.privacy.titleMain}</h1>
      <p className={styles.date}>{dictionary.privacy.date}</p>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>
          {dictionary.privacy.responsibility}
        </h3>
        <p className={styles.text_term}>
          <b>{dictionary.privacy.name}</b> Alcaldía Municipal de San Luis de
          Gaceno
        </p>
        <p className={styles.text_term}>
          <b>{dictionary.privacy.address}</b> San Luis de Gaceno, Risaralda,
          Colombia
        </p>
        <p className={styles.text_term}>
          <b>{dictionary.privacy.email}</b> gacenoinspira@gmail.com
        </p>
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>
          {dictionary.privacy.section_1.title}
        </h3>
        <div className={styles.sectionContent}>
          <p className={styles.text_term}>
            {dictionary.privacy.section_1.paragraphs}
          </p>
        </div>
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>
          {dictionary.privacy.section_2.title}
        </h3>
        <div className={styles.sectionContent}>
          <p className={styles.text_term}>
            {dictionary.privacy.section_2.paragraphs}
          </p>
          <ul className={styles.text_term}>
            {dictionary.privacy.section_2.items.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>
          {dictionary.privacy.section_3.title}
        </h3>
        <div className={styles.sectionContent}>
          <p className={styles.text_term}>
            {dictionary.privacy.section_3.paragraphs}
          </p>
          <ul className={styles.text_term}>
            {dictionary.privacy.section_3.items.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>
          {dictionary.privacy.section_4.title}
        </h3>
        <div className={styles.sectionContent}>
          <p className={styles.text_term}>
            {dictionary.privacy.section_4.paragraphs}
          </p>
          <ul className={styles.text_term}>
            {dictionary.privacy.section_4.items.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>
          {dictionary.privacy.section_5.title}
        </h3>
        <div className={styles.sectionContent}>
          <p className={styles.text_term}>
            {dictionary.privacy.section_5.paragraphs}
          </p>
        </div>
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>
          {dictionary.privacy.section_6.title}
        </h3>
        <div className={styles.sectionContent}>
          <p className={styles.text_term}>
            {dictionary.privacy.section_6.paragraphs}
          </p>
        </div>
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>
          {dictionary.privacy.section_7.title}
        </h3>
        <div className={styles.sectionContent}>
          <p className={styles.text_term}>
            {dictionary.privacy.section_7.paragraphs}
          </p>
        </div>
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>
          {dictionary.privacy.section_8.title}
        </h3>
        <div className={styles.sectionContent}>
          <p className={styles.text_term}>
            {dictionary.privacy.section_8.paragraphs}
          </p>
        </div>
      </div>
    </div>
  );
}
