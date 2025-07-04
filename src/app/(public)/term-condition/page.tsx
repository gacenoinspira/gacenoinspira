import React from "react";
import styles from "./term.module.css";

export default function PageTermCondition() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        Términos y Condiciones de Uso – Plataforma &quot;Gaceno Inspira&quot;
      </h1>
      <h2 className={styles.subtitle}>Plataforma &quot;Gaceno Inspira&quot;</h2>
      <p className={styles.date}>Fecha de entrada en vigencia: 24/06/2025</p>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>1. Aceptación de los Términos</h3>
        <div className={styles.sectionContent}>
          <p className={styles.text_term}>
            Al acceder, navegar o registrarse en la plataforma turística Gaceno
            Inspira, el usuario acepta cumplir con estos Términos y Condiciones
            en su totalidad. Si no está de acuerdo con alguna parte de estos
            términos, deberá abstenerse de utilizar la plataforma.
          </p>
        </div>
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>2. Objeto de la Plataforma</h3>
        <div className={styles.sectionContent}>
          <p className={styles.text_term}>
            Gaceno Inspira es un portal digital de carácter informativo,
            promocional e interactivo, cuyo objetivo es facilitar el acceso a
            información turística sobre San Luis de Gaceno, incluyendo
            atractivos, actividades, comercios y eventos del municipio. La
            plataforma permite a los usuarios registrarse, crear cuentas, dejar
            reseñas, guardar favoritos y planificar visitas turísticas.
          </p>
        </div>
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>3. Registro de Usuario</h3>
        <div className={styles.sectionContent}>
          <p className={styles.text_term}>
            {`Para acceder a ciertas funcionalidades (crear reseñas, favoritos, planificaciones), el usuario debe registrarse proporcionando información veraz y completa. El usuario se compromete a:
`}
          </p>
          <ul className={styles.text_term}>
            <li>Mantener la confidencialidad de su contraseña.</li>
            <li>No suplantar a terceros.</li>
            <li>No utilizar datos falsos o engañosos.</li>
            <li>
              Ser responsable de toda actividad realizada desde su cuenta.
            </li>
          </ul>
          <p className={styles.text_term}>
            La administración de la plataforma podrá suspender o cancelar
            cuentas que incumplan estos términos.
          </p>
        </div>
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>
          4. Uso adecuado de la plataforma
        </h3>
        <div className={styles.sectionContent}>
          <p className={styles.text_term}>
            El usuario se compromete a utilizar la plataforma conforme a la ley,
            la moral, el orden público y los presentes términos, absteniéndose
            de:
          </p>
          <ul className={styles.text_term}>
            <li>
              Publicar contenido ofensivo, falso, difamatorio o discriminatorio.
            </li>
            <li>Utilizar la plataforma con fines ilícitos o fraudulentos.</li>
            <li>
              Afectar la operatividad o seguridad del sitio mediante cualquier
              tipo de ataque informático.
            </li>
            <li>
              Promover actividades o productos que no estén relacionados con el
              turismo de San Luis de Gaceno sin autorización expresa.
            </li>
          </ul>
        </div>
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>
          5. Contenido generado por los usuarios
        </h3>
        <div className={styles.sectionContent}>
          <p className={styles.text_term}>
            Los usuarios pueden crear contenido dentro de la plataforma
            (reseñas, comentarios, planes de viaje). Dicho contenido:
          </p>
          <ul className={styles.text_term}>
            <li>
              Debe ser veraz, respetuoso y coherente con el propósito turístico
              de la plataforma.
            </li>
            <li>
              Puede ser moderado, editado o eliminado por el administrador si
              incumple las normas.
            </li>
            <li>
              No representa necesariamente la opinión de la Alcaldía de San Luis
              de Gaceno.
            </li>
          </ul>
        </div>
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>6. Propiedad Intelectual</h3>
        <div className={styles.sectionContent}>
          <p className={styles.text_term}>
            Todo el contenido institucional (textos, mapas, diseño gráfico,
            marca “Gaceno Inspira”, etc.) es propiedad de la Alcaldía de San
            Luis de Gaceno o cuenta con licencias para su uso. Queda prohibida
            la reproducción, distribución o modificación sin autorización previa
            y por escrito
          </p>
          <p className={styles.text_term}>
            Los usuarios conservan la titularidad de sus propios comentarios o
            reseñas, pero al publicarlos otorgan a la plataforma una licencia no
            exclusiva, gratuita y transferible para su uso en fines de promoción
            turística.
          </p>
        </div>
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>7. Enlaces a terceros</h3>
        <div className={styles.sectionContent}>
          <p className={styles.text_term}>
            La plataforma puede contener enlaces a sitios o servicios ofrecidos
            por terceros (hospedajes, restaurantes, guías turísticos, etc.).
            Estos servicios no son operados ni controlados por la Alcaldía. Por
            tanto, no se asume responsabilidad por:
          </p>
          <ul className={styles.text_term}>
            <li>
              Contenido, disponibilidad o veracidad de la información de dichos
              sitios.
            </li>
            <li>
              Calidad de los productos o servicios ofrecidos por terceros.
            </li>
          </ul>
        </div>
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>
          8. Limitación de responsabilidad
        </h3>
        <div className={styles.sectionContent}>
          <p className={styles.text_term}>
            La plataforma Gaceno Inspira se ofrece “tal cual”. No se garantiza
            la ausencia de errores técnicos ni la disponibilidad continua del
            servicio.
          </p>
          <p className={styles.text_term}>
            La Alcaldía no será responsable por:
          </p>
          <ul className={styles.text_term}>
            <li>Pérdidas de información por fallos en el sistema.</li>
            <li>Daños causados por el uso indebido de la plataforma.</li>
            <li>
              Consecuencias derivadas de la interacción con terceros anunciados
              en el portal.
            </li>
          </ul>
        </div>
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>9. Modificaciones</h3>
        <div className={styles.sectionContent}>
          <p className={styles.text_term}>
            Estos Términos pueden ser modificados en cualquier momento. Se
            notificará a los usuarios registrados a través del correo
            electrónico y/o mediante aviso destacado en el sitio. El uso
            continuo de la plataforma tras la modificación implica la aceptación
            de los nuevos términos.
          </p>
        </div>
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>
          10. Ley aplicable y jurisdicción
        </h3>
        <div className={styles.sectionContent}>
          <p className={styles.text_term}>
            Estos términos se rigen por las leyes de la República de Colombia.
            En caso de controversia, las partes se someten a los jueces
            competentes del municipio de San Luis de Gaceno, Boyacá.
          </p>
        </div>
      </div>
    </div>
  );
}
