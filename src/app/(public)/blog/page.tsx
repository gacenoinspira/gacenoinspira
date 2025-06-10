import React from "react";
import { Sections } from "../components";
import styles from "./blog.module.css";

export default function Page() {
  return (
    <div>
      <Sections className={styles.blog}>
        <h1 className={styles.title}>BLOG</h1>
        <p className={styles.text}>
          Historias, consejos y novedades desde el corazón de Boyacá.
        </p>
        <p className={styles.text}>
          Aquí encuentras relatos auténticos, guías prácticas y noticias sobre
          todo lo que pasa en San Luis de Gaceno y sus centros poblados. Es un
          espacio para inspirarte, conocer más sobre nuestra cultura, y planear
          mejor tu viaje.
        </p>
      </Sections>
      <Sections className={styles.content}>
        <p className={styles.title}>QUE ES UN CENTRO POBLADO</p>
        <p className={styles.subtitle}>
          Conoce mas de nuestras historias vivencias
        </p>
        <div className={styles.question_response}>
          <p className={styles.question}>
            ¿Descubre San Luis de Gaceno y sus centros poblados: tesoros rurales
            de Boyacá
          </p>
          <p className={styles.response}>
            Si estás buscando un destino tranquilo, lleno de naturaleza, cultura
            campesina y experiencias auténticas, San Luis de Gaceno es una joya
            escondida en el suroriente de Boyacá que no puedes dejar pasar.
            Ubicado entre montañas, ríos cristalinos y paisajes verdes
            interminables, este municipio ofrece mucho más que vistas hermosas:
            te invita a conocer el alma de la vida rural a través de sus centros
            poblados.
          </p>
          <p className={styles.question}>¿Qué es un centro poblado?</p>
          <p className={styles.response}>
            En Colombia, un centro poblado es una pequeña comunidad rural
            organizada. Aunque no es una ciudad ni una cabecera municipal, sí
            cuenta con casas agrupadas, una escuela, una iglesia, tiendas
            locales, y sobre todo, personas que mantienen vivas las tradiciones
            y la hospitalidad típica de nuestros pueblos. Visitar un centro
            poblado es como hacer una pausa en el tiempo. Es caminar por caminos
            de tierra rodeados de naturaleza, disfrutar una mazamorra recién
            hecha o conversar con un campesino que conoce cada rincón de su
            tierra
          </p>
          <p className={styles.question}>
            Los centros poblados de San Luis de Gaceno que debes conocer
          </p>
          <p className={styles.response}>
            San Luis de Gaceno no solo es encantador por su cabecera municipal,
            sino también por sus veredas y centros poblados llenos de vida y
            cultura. Aquí te presentamos cinco de ellos que puedes incluir en tu
            recorrido:
          </p>
          <p className={styles.response}>🏡 Guamal</p>
          <p className={styles.response}>
            Este centro poblado se caracteriza por su ambiente tranquilo y sus
            paisajes de verdes intensos. Es ideal para hacer caminatas, conocer
            fincas cafeteras y vivir una experiencia auténtica del campo
            boyacense.
          </p>
          <p className={styles.response}>🌅 Horizontes</p>
          <p className={styles.response}>
            Tal como su nombre lo indica, este lugar ofrece vistas panorámicas
            hermosas. Desde sus colinas puedes observar los atardeceres más
            impresionantes, mientras escuchas el canto de los pájaros y respiras
            aire puro.
          </p>
          <p className={styles.response}>🌽 San Carlos</p>
          <p className={styles.response}>
            Un rincón agrícola donde los cultivos y el trabajo del campo son el
            alma del día a día. Aquí puedes aprender sobre la siembra
            tradicional, compartir con los habitantes y saborear productos
            frescos directamente de la tierra.
          </p>
          <p className={styles.response}>🌿 La Mesa</p>
          <p className={styles.response}>
            Ideal para los amantes del ecoturismo y la fotografía. Su paisaje
            montañoso y su gente amable lo convierten en un lugar perfecto para
            conectar con la naturaleza y la cultura local.
          </p>
          <p className={styles.response}>🌻 Santa Teresa</p>
          <p className={styles.response}>
            Una comunidad vibrante y acogedora. Aquí las festividades, la
            gastronomía y el espíritu colaborativo de sus habitantes te harán
            sentir parte de la familia desde el primer momento.
          </p>
          <p className={styles.question}>
            ¿Por qué visitar los centros poblados?
          </p>
          <p className={styles.response}>
            Porque en cada uno encontrarás una experiencia diferente: un nuevo
            sabor, una historia que no conocías, una vista que te sorprende.
            Lejos del turismo masivo, estos lugares te ofrecen algo único: una
            conexión real con el territorio, su gente y su forma de vivir.
          </p>
          <p className={styles.question}>
            ¿Qué puedes hacer en los centros poblados?
          </p>
          <p className={styles.response}>
            Porque en cada uno encontrarás una experiencia diferente: un nuevo
            sabor, una historia que no conocías, una vista que te sorprende.
            Lejos del turismo masivo, estos lugares te ofrecen algo único: una
            conexión real con el territorio, su gente y su forma de vivir.
          </p>
          <p className={styles.question}>🚗 ¿Listo para explorar?</p>
          <p className={styles.response}>
            Te invitamos a recorrer San Luis de Gaceno y dejarte sorprender por
            sus centros poblados. Planea una visita guiada, toma tu cámara,
            prepárate para probar delicias locales y déjate llevar por la
            tranquilidad de estos destinos que aún conservan la magia de lo
            auténtico
          </p>
        </div>
      </Sections>
    </div>
  );
}
