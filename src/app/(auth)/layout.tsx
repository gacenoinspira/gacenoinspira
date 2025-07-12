import React from "react";
import { UiHeader } from "../(public)/components";
import styles from "./layout.module.css";
import { getInfoUser } from "@/lib/action";
import { getDictionary } from "@/lib/translate/translate";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getInfoUser();
  const { lang, dictionary } = await getDictionary();
  return (
    <main className={styles.main}>
      <UiHeader userDb={user.data} lang={lang} dictionary={dictionary} />
      {children}
    </main>
  );
}
