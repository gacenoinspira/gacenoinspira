"use client";

import React from "react";
import styles from "./ui-header.module.css";
import { UiLink } from "@/components/index";
import { SearchIcon } from "@/lib/icons/search.icon";
import { MenuBurger } from "@/components/menu-burger/menu-burger";

export function UiHeader() {
  return (
    <header className={styles.header}>
      <img src="/img/logo.svg" alt="Logo" className={styles.logo} />
      <MenuBurger />
      <nav className={styles.nav}>
        <UiLink
          namePath="Home"
          href="/"
          className={styles.link_header}
          classActive={styles.active}
        />
        <UiLink
          namePath="¿Donde ir?"
          href="/where"
          className={styles.link_header}
          classActive={styles.active}
        />
        <UiLink
          namePath="¿Que hacer?"
          href="/what"
          className={styles.link_header}
          classActive={styles.active}
        />
      </nav>
      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Explora los cinco corazones"
          className={styles.input}
        />
        <button className={styles.button}>
          <SearchIcon />
        </button>
      </div>
    </header>
  );
}
