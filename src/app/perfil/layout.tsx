import React from "react";
import styles from "./layout.module.css";
import { UiHeader } from "../(public)/components";
import { getInfoUser } from "@/lib/action";
import { redirect } from "next/navigation";

interface Props {
  children: React.ReactNode;
}
export default async function Layout({ children }: Props) {
  const user = await getInfoUser();
  if (!user.data?.user_id) {
  }
  redirect("/register");
  return (
    <div className={styles.main}>
      <UiHeader userDb={user.data} />
      {children}
    </div>
  );
}
