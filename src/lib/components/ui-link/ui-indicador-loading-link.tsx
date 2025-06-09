/* eslint-disable @next/next/no-img-element */
"use client";

import { useLinkStatus } from "next/link";
import styles from "./link-loading.module.css";

export default function LoadingIndicator() {
  const { pending } = useLinkStatus();
  return pending ? (
    <>
      <div role="status" className={styles.link_loading}>
        <img src="/img/Loading.svg" alt="Loading" className={styles.svg} />
      </div>
    </>
  ) : null;
}
