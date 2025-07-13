import React from "react";
import styles from "./term.module.css";
import { getDictionary } from "@/lib/translate/translate";

export default async function PageTermCondition() {
  const { dictionary } = await getDictionary();
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{dictionary.terms.titleMain}</h1>
      <h2 className={styles.subtitle}>{dictionary.terms.subtitleMain}</h2>
      <p className={styles.date}>{dictionary.terms.date}</p>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>
          {dictionary.terms.section_1.title}
        </h3>
        <div className={styles.sectionContent}>
          <p className={styles.text_term}>
            {dictionary.terms.section_1.paragraph}
          </p>
        </div>
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>
          {dictionary.terms.section_2.title}
        </h3>
        <div className={styles.sectionContent}>
          <p className={styles.text_term}>
            {dictionary.terms.section_2.paragraph}
          </p>
        </div>
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>
          {dictionary.terms.section_3.title}
        </h3>
        <div className={styles.sectionContent}>
          <p className={styles.text_term}>
            {dictionary.terms.section_3.paragraphs}
          </p>
          <ul className={styles.text_term}>
            {dictionary.terms.section_3.items.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
          <p className={styles.text_term}>
            {dictionary.terms.section_3.paragraphs_2}
          </p>
        </div>
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>
          {dictionary.terms.section_4.title}
        </h3>
        <div className={styles.sectionContent}>
          <p className={styles.text_term}>
            {dictionary.terms.section_4.paragraphs}
          </p>
          <ul className={styles.text_term}>
            {dictionary.terms.section_4.items.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>
          {dictionary.terms.section_5.title}
        </h3>
        <div className={styles.sectionContent}>
          <p className={styles.text_term}>
            {dictionary.terms.section_5.paragraphs}
          </p>
          <ul className={styles.text_term}>
            {dictionary.terms.section_5.items.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>
          {dictionary.terms.section_6.title}
        </h3>
        <div className={styles.sectionContent}>
          {dictionary.terms.section_6.paragraphs.map((paragraph, index) => (
            <p key={index} className={styles.text_term}>
              {paragraph}
            </p>
          ))}
        </div>
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>
          {dictionary.terms.section_7.title}
        </h3>
        <div className={styles.sectionContent}>
          <p className={styles.text_term}>
            {dictionary.terms.section_7.paragraphs}
          </p>
          <ul className={styles.text_term}>
            {dictionary.terms.section_7.items.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>
          {dictionary.terms.section_8.title}
        </h3>
        <div className={styles.sectionContent}>
          {dictionary.terms.section_8.paragraphs.map((paragraph, index) => (
            <p key={index} className={styles.text_term}>
              {paragraph}
            </p>
          ))}
          <ul className={styles.text_term}>
            {dictionary.terms.section_8.items.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>
          {dictionary.terms.section_9.title}
        </h3>
        <div className={styles.sectionContent}>
          <p className={styles.text_term}>
            {dictionary.terms.section_9.paragraphs}
          </p>
        </div>
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>
          {dictionary.terms.section_10.title}
        </h3>
        <div className={styles.sectionContent}>
          <p className={styles.text_term}>
            {dictionary.terms.section_10.paragraphs}
          </p>
        </div>
      </div>
    </div>
  );
}
