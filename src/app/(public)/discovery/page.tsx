import React from "react";
import styles from "./discvery.module.css";
import Image from "next/image";
import { UiCard } from "./components";
import { getOperators } from "@/lib/action";
import { getImagePageTable } from "@/lib/action/img-page.action";
import { getDictionary } from "@/lib/translate/translate";

export default async function PageDiscovery() {
  const operators = await getOperators();
  const imgPage = await getImagePageTable();
  const { dictionary } = await getDictionary();
  return (
    <div className={styles.container}>
      <Image
        src={imgPage.data?.discovery || "/img/san_luis.jpeg"}
        alt="Paisaje de San Luis de Gaceno"
        width={1200}
        height={400}
        className={styles.heroImage}
        priority
      />

      <h1 className={styles.title}>
        {dictionary.discovery.title}
        <br />
        {dictionary.discovery.subtitle}
      </h1>

      <div className={styles.content}>
        <p className={styles.paragraph}>
          {dictionary.discovery.paragraphUno}
          <b> {dictionary.discovery.comillas}</b>
          {dictionary.discovery.paragraphDos}
        </p>

        <p className={styles.paragraph}>{dictionary.discovery.paragraphTres}</p>
        <img src="/img/diamante.webp" alt="diamante" className={styles.image} />

        <div className={styles.container_card}>
          {operators.data
            ?.filter((operator) => operator.type_activity === 4)
            .map((operator) => (
              <UiCard
                key={operator.id}
                id={operator.id}
                img={operator.logo || "/img/san_luis.jpeg"}
                title={operator.name || undefined}
              />
            ))}
        </div>
      </div>
    </div>
  );
}
