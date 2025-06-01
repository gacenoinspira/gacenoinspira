"use client";

import React from "react";
import styles from "./menuBurger.module.css";

export function MenuBurger() {
  return (
    <label className={styles.burger} htmlFor="burger">
      <input type="checkbox" id="burger" />
      <span></span>
      <span></span>
      <span></span>
    </label>
  );
}
