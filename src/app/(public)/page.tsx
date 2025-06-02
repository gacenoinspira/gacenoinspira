import { Metadata } from "next";
import styles from "./page.module.css";
import { UiMap } from "@/components/index";

export const metadata: Metadata = {
  title: "Inicio - San Luis de Gaceno",
  description: "Pagina de inicio de San Luis de Gaceno",
};

export default function Home() {
  return (
    <div>
      <section className={styles.section_img}>
        <div className={styles.container_info}>
          <h1 className={styles.title}>Donde la aventura,</h1>
          <p className={styles.subtitle}>
            la cultura y la naturaleza se encuentran.
          </p>
          <p className={styles.info}>
            Explora los cinco corazones de San Luis de Gaceno y conecta con su
            gente, sus historias y sus paisajes.
          </p>
          <button className={styles.button}>Explorar Ahora</button>
        </div>
      </section>

      <section className={styles.section_info}>
        <img src="/img/check.svg" alt="check" className={styles.check} />
        <img src="/img/hash.svg" alt="hash" className={styles.hash} />
        <div className={styles.container_info}>
          <p className={styles.title}>
            Conoce San Luis de Gaceno como un local.
          </p>
          <p className={styles.title_2}>
            Descubre lo mejor de cada uno de nuestros centros poblados:
          </p>
          <p className={styles.title_3}>
            Guamal, Horizontes, San Carlos, La Mesa y Santa Teresa. Haz clic en
            el mapa y empieza tu viaje
          </p>
        </div>
      </section>
      {/* <section className={styles.section_map}>
        <UiMap />
      </section> */}
      {/* <section className={styles.section_cultura}>
        <h2 className={styles.title}>
          {" "}
          <span className={styles.orange}>Sumérgete</span> en nuestra cultura
        </h2>
        <p className={styles.info}>
          con eventos únicos, fiestas tradicionales y experiencias auténticas.
        </p>
      </section> */}
      {/* <section className={styles.section_join}>
        <div className={styles.imageContainer}>
          <Image
            src="/img/san_luis.jpeg"
            alt="San Luis de Gaceno"
            layout="fill"
            objectFit="cover"
          />
        </div>

        <div className={styles.textContainer}>
          <h2>
            <span className={styles.highlight}>¿Eres guía</span>, artesano,
            cocinero o anfitrión local?
          </h2>
          <p>
            Forma parte de Gaceno Inspira y conecta con quienes buscan lo que tú
            sabes ofrecer.
          </p>
          <button className={styles.ctaButton}>Únete aquí</button>
        </div>
      </section> */}
    </div>
  );
}
