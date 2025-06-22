import React from "react";

import styles from "./description.module.css";

interface Props {
  description: string;
}
export function Description({ description }: Props) {
  return (
    <div className={styles.container__description}>
      <p className={styles.info}>{description}</p>
    </div>
  );
}
