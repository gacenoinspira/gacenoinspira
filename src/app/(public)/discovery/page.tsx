import React from "react";
import styles from "./discvery.module.css";
import Image from "next/image";
import { getOperators } from "@/lib/action";
import { getImagePageTable } from "@/lib/action/img-page.action";
import { Carousel } from "./components/carousel/Carousel";

interface ImagePageData {
  data?: {
    discovery: string;
  };
}


export default async function PageDiscovery() {
  const operators = await getOperators();
  const imgPage: ImagePageData = await getImagePageTable();
  // const { dictionary }: { dictionary: DictionaryData } = await getDictionary();

  return (
    <div className={styles.container}>
      <div className={styles.heroContainer}>
        <Image
          src={imgPage.data?.discovery || "/img/san_luis.jpeg"}
          alt="Paisaje de San Luis de Gaceno"
          fill
          style={{ objectFit: "cover" }}
          priority
        />
        <div className={styles.heroOverlay}></div>
        
        <div className={styles.heroTitleContent}>
           <h1 className={styles.title}>
              Descubre el encanto de viajar a San Luis de Gaceno
            <br />
           </h1>
        </div>
      </div>

      <div className={styles.carouselSection}>
        <Carousel operators={ operators.data } />
      </div>

      {/* <div className={styles.content}>
        <p className={styles.paragraph}>
          {dictionary.discovery.paragraphUno}
          <b> {dictionary.discovery.comillas}</b>
          {dictionary.discovery.paragraphDos}
        </p>
        <p className={styles.paragraph}>{dictionary.discovery.paragraphTres}</p>
      </div> */}
    </div>
  );
}
