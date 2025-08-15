/* eslint-disable @next/next/no-img-element */
import styles from "./page.module.css";
import { UiMap } from "@/lib/components/ui-map/ui-map";
import { getOperators } from "@/lib/action";
import { BtnMap, CardZone } from "./components";
import { Carrusel } from "@/lib/carrusel/carrusel";
import Link from "next/link";
import { getDictionary } from "@/lib/translate/translate";
import { BannerPrincipal } from "./components/banner-principal/BannerPrincipal";

export default async function Home() {
  const operators = await getOperators();
  const { dictionary } = await getDictionary();
  return (
    <div>
      <BannerPrincipal />
      <section className={styles.section_info}>
        {/* <img src="/img/check.svg" alt="check" className={styles.check}/>
        <img src="/img/hash.svg" alt="hash" className={styles.hash} /> */}
        <div className={ styles.container_map_btn }>
          <div className={ styles.container_map_btn_info }>
            <div className={styles.container_info}>
            <p className={styles.title}>¿A cuántas horas estás de <strong> San Luis de Gaceno </strong>, el destino que <strong>inspira</strong> ?</p>
          </div>
          <div className={styles.gifs}>
              <BtnMap text="DESCUBRELO AQUI" />
          </div>
          </div>
          <div>
            
            <Link href={"/map"}>
              <img src="/img/route.gif" alt="route" className={styles.route} />
            </Link>
          </div>

        </div>
        
        
      </section>
      
      <section className={styles.section_map}>
        <UiMap
          operators={
            operators.data?.filter(
              (operator) => operator.type_activity === 1
            ) || []
          }
          selectText={dictionary.home.map.selectText}
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
        <p className={styles.title}>{dictionary.home.cultura.title}</p>
        <p className={styles.info}>{dictionary.home.cultura.info}</p>
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
        <h2 className={styles.section_title}>
          {dictionary.home.carrusel.title}
        </h2>
        <p className={styles.section_subtitle}>
          {dictionary.home.carrusel.subtitle}
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
      <section className={styles.section_contact}>
        <h2 className={styles.title_contact}>
          {dictionary.home.contact.title}
        </h2>
        <p className={styles.info_contact}>
          {dictionary.home.contact.subtitle}
        </p>
        <a href="mailto:gacenoinspira@gmail.com" className={styles.btnContact}>
          {dictionary.home.contact.text}
        </a>
      </section>
    </div>
  );
}
