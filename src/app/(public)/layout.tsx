import React from "react";

import { Footer } from "./components/footer/ui-footer";
import { UiHeader } from "./components";
import styles from "./page.module.css";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className={styles.main}>
      <UiHeader />
      {children}
      <Footer />
    </main>
  );
}
