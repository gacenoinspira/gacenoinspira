"use client";

import React, { useEffect, useRef } from "react";
import styles from "./menuBurger.module.css";
import Link from "next/link";

const menuItems = [
  { name: "Inicio", href: "/" },
  { name: "¿Dónde ir?", href: "/where" },
  { name: "¿Qué hacer?", href: "/what" },
  { name: "Galería", href: "/gallery" },
  { name: "Contacto", href: "/contact" },
];

export function MenuBurger() {
  const [isOpen, setIsOpen] = React.useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Cerrar menú al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.menuContainer} ref={menuRef}>
      <div className={styles.menuContainer}>
        <label className={styles.burger} htmlFor="burger">
          <input
            type="checkbox"
            id="burger"
            checked={isOpen}
            onChange={(e) => setIsOpen(e.target.checked)}
          />
          <span></span>
          <span></span>
          <span></span>
        </label>
      </div>

      {isOpen && (
        <div className={styles.dropdownMenu}>
          <nav className={styles.nav}>
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={styles.menuItem}
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </div>
  );
}
