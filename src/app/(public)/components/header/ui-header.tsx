"use client";

import React from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./ui-header.module.css";
import { UiLink } from "@/lib/components/index";
import { SearchIcon } from "@/lib/icons/search.icon";
import { MenuBurger } from "@/lib/components/menu-burger/menu-burger";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export function UiHeader() {
  return (
    <header
      className={`${styles.header} fixed w-full z-50 transition-all duration-300`}
    >
      <div className="relative">
        <img src="/img/logo.svg" alt="Logo" className={styles.logo} />
      </div>
      <MenuBurger />
      <nav className={styles.nav}>
        <UiLink
          namePath="Home"
          href="/"
          className={`${styles.link_header} hover:text-primary-500 transition-colors duration-300`}
          classActive={styles.active}
        />
        <UiLink
          namePath="¿Donde ir?"
          href="/where"
          className={`${styles.link_header} hover:text-primary-500 transition-colors duration-300`}
          classActive={styles.active}
        />
        <UiLink
          namePath="¿Que hacer?"
          href="/what"
          className={`${styles.link_header} hover:text-primary-500 transition-colors duration-300`}
          classActive={styles.active}
        />
      </nav>
      <div className={`${styles.searchContainer} group`}>
        <input
          type="text"
          placeholder="Explora los cinco corazones"
          className={`${styles.input} focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300`}
        />
        <button
          className={`${styles.button} group-hover:bg-primary-600 transition-colors duration-300`}
        >
          <SearchIcon />
        </button>
      </div>
    </header>
  );
}
