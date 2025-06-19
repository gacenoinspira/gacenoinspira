/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState } from "react";
import styles from "./ui-header.module.css";
import { UiLink } from "@/lib/components/index";
import { MenuBurger } from "@/lib/components/menu-burger/menu-burger";

export function UiHeader() {
  const [showModal, setShowModal] = useState(false);
  return (
    <header className={`${styles.header}`}>
      <div>
        <img src="/img/logo.svg" alt="Logo" className={styles.logo} />
      </div>
      <MenuBurger />
      <nav className={styles.nav}>
        <UiLink
          namePath="INICIO"
          href="/"
          className={`${styles.link_header}`}
          classActive={styles.active}
        />
        <UiLink
          namePath="PLANIFICA"
          href="/where"
          className={`${styles.link_header}`}
          classActive={styles.active}
        />
        <UiLink
          namePath="BLOG"
          href="/blog"
          className={`${styles.link_header}`}
          classActive={styles.active}
        />
      </nav>
      <div className={`${styles.searchContainer}`}>
        <button
          className={`${styles.btn} ${styles.menu}`}
          onClick={() => setShowModal(!showModal)}
        >
          <img src="/img/user.svg" alt="user" />
          <div className={`${styles.menuModal} ${showModal ? styles.active : ""}`}>
            <UiLink
              namePath="Login"
              href="/login"
              className={`${styles.link}`}
            />
            <UiLink
              namePath="Registrarse"
              href="/register"
              className={`${styles.link}`}
            />
          </div>
        </button>
        {/* <button className={`${styles.btn}`}>
          <img src="/img/search.svg" alt="search" />
        </button> */}
      </div>
    </header>
  );
}
