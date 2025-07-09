/* eslint-disable @next/next/no-img-element */
import styles from "./page.module.css";
import { UiMap } from "@/lib/components/ui-map/ui-map";
import { AnimatedText } from "@/components/AnimatedText";
import { getOperators } from "@/lib/action";
import { BtnMap, CardZone } from "./components";
import { Carrusel } from "@/lib/carrusel/carrusel";
import Link from "next/link";

export default async function Home() {
  const operators = await getOperators();
  return (
    <div>
      <section className={styles.section_img}>
        <div className={styles.container_info}>
          <AnimatedText className={`${styles.title} ${styles.mainTitle}`}>
            Donde la aventura,
          </AnimatedText>
          <AnimatedText delay={0.5} className={styles.subtitle}>
            la cultura y la naturaleza se encuentran.
          </AnimatedText>
          {/* <button className={styles.button}>Explorar Ahora</button> */}
        </div>
      </section>

      <section className={styles.section_info}>
        {/* <img src="/img/check.svg" alt="check" className={styles.check}/>
        <img src="/img/hash.svg" alt="hash" className={styles.hash} /> */}
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
        <div className={styles.gifs}>
          <Link href={"/map"}>
            <img src="/img/route.gif" alt="route" className={styles.route} />
          </Link>
        </div>
      </section>
      <BtnMap />
      <section className={styles.section_map}>
        <UiMap
          operators={
            operators.data?.filter(
              (operator) => operator.type_activity === 1
            ) || []
          }
        />
      </section>
      <section className={styles.sectionImg}>
        <img
          src="/img/mapa.png"
          alt="San Luis de Gaceno"
          className={styles.icons}
        />
        <img
          src="/img/bolso.png"
          alt="San Luis de Gaceno"
          className={styles.icons}
        />
      </section>
      <section className={styles.section_cultura}>
        <p className={styles.title}>Explora cada rincón</p>
        <p className={styles.info}>
          Cinco centros poblados, cinco maneras únicas de vivir el alma de
          Boyacá.
        </p>
        <div className={styles.container}>
          <div className={styles.zonaUno}>
            <CardZone zone="1" main />
          </div>
          <div className={styles.zonaDos}>
            <CardZone zone="2" />
          </div>
          <div className={styles.zonaTres}>
            <CardZone zone="3" />
          </div>
          <div className={styles.zonaCuatro}>
            <CardZone zone="4" />
          </div>
          <div className={styles.zonaCinco}>
            <CardZone zone="5" />
          </div>
        </div>
      </section>
      <section className={styles.sectionImg}>
        <img
          src="/img/hoja.png"
          alt="San Luis de Gaceno"
          className={styles.icons}
        />
        <img
          src="/img/pollo.png"
          alt="San Luis de Gaceno"
          className={styles.icons}
        />
      </section>
      <section className={styles.section_carrusel}>
        <h2 className={styles.section_title}>Sumérgete en nuestra cultura</h2>
        <p className={styles.section_subtitle}>
          conoce todos los planes que puedes hacer
        </p>
        <div className={styles.carrusel_container}>
          <Carrusel
            cards={
              operators.data
                ?.filter((operator) => operator.type_activity === 4)
                .map((operator) => ({
                  id: operator.id || "",
                  image: operator.logo || "/img/san_luis.jpeg",
                  title: operator.name || "",
                  description: operator.description || "",
                })) ?? []
            }
          />
        </div>
      </section>

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
