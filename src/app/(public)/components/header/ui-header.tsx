"use client";

import React from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./ui-header.module.css";
import { UiLink } from "@/lib/components/index";
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
          namePath="INICIO"
          href="/"
          className={`${styles.link_header} hover:text-primary-500 transition-colors duration-300`}
          classActive={styles.active}
        />
        <UiLink
          namePath="PLANIFICA"
          href="/where"
          className={`${styles.link_header} hover:text-primary-500 transition-colors duration-300`}
          classActive={styles.active}
        />
        <UiLink
          namePath="BLOG"
          href="/what"
          className={`${styles.link_header} hover:text-primary-500 transition-colors duration-300`}
          classActive={styles.active}
        />
      </nav>
      <div className={`${styles.searchContainer}`}>
        <button className={`${styles.btn}`}>
          <img src="/img/user.svg" alt="user" />
        </button>
        <button className={`${styles.btn}`}>
          <img src="/img/search.svg" alt="search" />
        </button>
      </div>
    </header>
  );
}
