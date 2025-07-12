import React from "react";
import styles from "./layout.module.css";
import { UiHeader } from "../(public)/components";
import { getInfoUser } from "@/lib/action";
import { getDictionary } from "@/lib/translate/translate";

interface Props {
  children: React.ReactNode;
}
export default async function Layout({ children }: Props) {
  const user = await getInfoUser();
  const { lang, dictionary } = await getDictionary();
  return (
    <div className={styles.main}>
      <UiHeader userDb={user.data} lang={lang} dictionary={dictionary} />
      {children}
    </div>
  );
}
