import React from "react";
import styles from "./layout.module.css";
import { UiHeader } from "../(public)/components";
import { getInfoUser } from "@/lib/action";

interface Props {
  children: React.ReactNode;
}
export default async function Layout({ children }: Props) {
  const user = await getInfoUser();
  return (
    <div className={styles.main}>
      <UiHeader userDb={user.data} />
      {children}
    </div>
  );
}
