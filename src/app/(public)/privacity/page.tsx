import React from "react";
import styles from "./term.module.css";

export default function PagePrivacy() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        Política de Privacidad – Plataforma Gaceno Inspira
      </h1>
      <p className={styles.date}>Fecha de entrada en vigencia: 24/06/2025</p>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>
          Responsable del tratamiento de datos personales
        </h3>
        <p className={styles.text_term}>
          <b>Nombre:</b> Alcaldía Municipal de San Luis de Gaceno
        </p>
        <p className={styles.text_term}>
          <b>Ubicación:</b> San Luis de Gaceno, Risaralda, Colombia
        </p>
        <p className={styles.text_term}>
          <b>Correo electrónico:</b> gacenoinspira@gmail.com
        </p>
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>1. Objeto</h3>
        <div className={styles.sectionContent}>
          <p className={styles.text_term}>
            La presente Política de Privacidad tiene como propósito informar a
            los usuarios de la plataforma turística Gaceno Inspira sobre la
            recolección, tratamiento, almacenamiento y protección de sus datos
            personales, de conformidad con lo establecido en la Ley 1581 de
            2012, el Decreto 1377 de 2013, y demás normas concordantes en
            Colombia.
          </p>
        </div>
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>
          2. ¿Qué datos personales recolectamos?
        </h3>
        <div className={styles.sectionContent}>
          <p className={styles.text_term}>
            Al momento de interactuar con la plataforma, podemos recolectar los
            siguientes datos:
          </p>
          <ul className={styles.text_term}>
            <li>
              Información de contacto: nombre completo, correo electrónico,
              número de teléfono (opcional)
            </li>
            <li>
              Información de perfil: nombre de usuario, contraseña cifrada,
              intereses turísticos.
            </li>
            <li>
              Información de navegación: ubicación aproximada (si es
              autorizada), IP, dispositivo de acceso.
            </li>
            <li>
              Contenido generado por el usuario: reseñas, favoritos, planes
              turísticos creados dentro de la plataforma.
            </li>
          </ul>
        </div>
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>3. Finalidades del tratamiento</h3>
        <div className={styles.sectionContent}>
          <p className={styles.text_term}>
            Los datos serán utilizados para los siguientes propósitos:
          </p>
          <ul className={styles.text_term}>
            <li>
              Permitir la creación y administración de cuentas personales.
            </li>
            <li>
              Mostrar información personalizada sobre destinos, actividades o
              comercios según intereses.
            </li>
            <li>
              Permitir la interacción con funcionalidades como guardar
              favoritos, dejar reseñas o planear visitas.
            </li>
            <li>
              Mejorar la experiencia del usuario mediante análisis estadístico y
              funcional.
            </li>
            <li>
              Enviar comunicaciones promocionales o informativas relacionadas
              con eventos y turismo local (previa autorización).
            </li>
            <li>Cumplir con obligaciones legales y contractuales.</li>
          </ul>
        </div>
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>
          4. Derechos del titular de los datos
        </h3>
        <div className={styles.sectionContent}>
          <p className={styles.text_term}>
            De acuerdo con la legislación colombiana, los usuarios tienen
            derecho a:
          </p>
          <ul className={styles.text_term}>
            <li>
              Conocer, actualizar, rectificar o suprimir sus datos personales.
            </li>
            <li>Solicitar prueba de la autorización otorgada.</li>
            <li>Ser informados sobre el uso dado a sus datos.</li>
            <li>
              Revocar la autorización y/o solicitar la eliminación de sus datos
              cuando se infrinjan derechos constitucionales o legales.
            </li>
            <li>Acceder gratuitamente a sus datos personales.</li>
          </ul>
        </div>
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>5. Medidas de seguridad</h3>
        <div className={styles.sectionContent}>
          <p className={styles.text_term}>
            Gaceno Inspira implementa protocolos y medidas de seguridad físicas,
            electrónicas y administrativas para proteger los datos personales de
            accesos no autorizados, pérdida, alteración o destrucción.
          </p>
        </div>
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>
          6. Transferencia y transmisión de datos
        </h3>
        <div className={styles.sectionContent}>
          <p className={styles.text_term}>
            No compartimos ni comercializamos los datos personales con terceros.
            Solo se transferirán datos a entidades públicas o privadas en caso
            de obligación legal o mandato judicial.
          </p>
        </div>
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>7. Autorización del tratamiento</h3>
        <div className={styles.sectionContent}>
          <p className={styles.text_term}>
            Al registrarse en la plataforma o continuar navegando, el usuario
            manifiesta conocer y aceptar esta política, y autoriza de manera
            libre, expresa e informada el tratamiento de sus datos personales
            según las finalidades aquí descritas.
          </p>
        </div>
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>8. Vigencia</h3>
        <div className={styles.sectionContent}>
          <p className={styles.text_term}>
            La presente Política rige desde su publicación. Los datos
            recolectados se conservarán durante el tiempo necesario para cumplir
            las finalidades mencionadas o por el tiempo requerido legalmente.
          </p>
        </div>
      </div>
    </div>
  );
}
