import React from "react";
import { UiHeader } from "../(public)/components";
import styles from "./layout.module.css";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className={styles.main}>
      <UiHeader />
      {children}
    </main>
  );
}
