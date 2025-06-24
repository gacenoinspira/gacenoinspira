import React from "react";
import styles from "./galeria.module.css";
import { OperatorTableRow } from "@/lib/type";
import { ImgIcon } from "@/lib/icons";

interface Props {
  data: OperatorTableRow | null;
}

export function Galeria({ data }: Props) {
  return (
    <div className={styles.container__galeria}>
      <div className={styles.info}>
        <h2>Galeria</h2>
        <img src="/img/pensamiento-turistico.png" alt="pensamiento turistico" />
      </div>
      <div className={styles.img}>
        {data?.img ? (
          data.img.map((img) => <img key={img} src={img} alt="turismo" />)
        ) : (
          <div className={styles.no__img}>
            <ImgIcon width={160} height={160} />
            <p>No hay imágenes</p>
          </div>
        )}
      </div>
    </div>
  );
}
