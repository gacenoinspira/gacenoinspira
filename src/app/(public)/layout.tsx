import React from "react";

import { Footer } from "./components/footer/ui-footer";
import { UiHeader } from "./components";
import styles from "./page.module.css";
import { getInfoUser } from "@/lib/action";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getInfoUser();
  return (
    <main className={styles.main}>
      <UiHeader userDb={user.data} />
      {children}
      <Footer />
    </main>
  );
}
