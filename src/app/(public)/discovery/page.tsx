import React from "react";
import styles from "./discvery.module.css";
import Image from "next/image";
import { UiCard } from "./components";
import { getOperators } from "@/lib/action";

export default async function PageDiscovery() {
  const operators = await getOperators();
  return (
    <div className={styles.container}>
      <Image
        src="/img/san_luis.jpeg"
        alt="Paisaje de San Luis de Gaceno"
        width={1200}
        height={400}
        className={styles.heroImage}
        priority
      />

      <h1 className={styles.title}>
        Conoce San Luis de Gaceno
        <br />
        puerta de oro del llano Casanareño
      </h1>

      <div className={styles.content}>
        <p className={styles.paragraph}>
          San Luis de Gaceno es un municipio ubicado al suroriente de Boyacá, en
          la provincia de Neira. Conocido como{" "}
          <b> &ldquo;La puerta de oro del llano casanareño&rdquo;</b>, donde
          existe una mezcla entre la cultura llanera y la boyacense,
          denominándose por propios y visitantes como &ldquo;La tierra del
          pija-sumercé&rdquo; en honor a las culturas presentes. Con un clima
          cálido con promedio de 28°C y una altura sobre el nivel del mar de
          aproximadamente 400 metros, esta localidad se convierte en el refugio
          de cientos de especies de aves, plantas, anfibios, reptiles y
          mamíferos que enriquecen la biodiversidad del piedemonte llanero.
        </p>

        <p className={styles.paragraph}>
          Este municipio cuenta con una serie de atractivos que lo hacen un
          destino perfecto para realizar actividades de turismo de naturaleza y
          aventura. Actualmente muchos de sus habitantes trabajan por reactivar
          el sector turismo y brindar una mejor atención a sus visitantes.
        </p>
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
