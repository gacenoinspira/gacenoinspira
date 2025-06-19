import React from "react";
import { UiHeader } from "../(public)/components";
import styles from "./layout.module.css";
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
    </main>
  );
}
