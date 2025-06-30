"use client";

import React, { useEffect, useRef } from "react";
import styles from "./menuBurger.module.css";
import { UiLink } from "../ui-link/ui-link";
import { logoutAction } from "@/lib/action";
import { UserType } from "@/lib/type";
import { UserStore } from "@/lib/store/user.store";

interface Props {
  user: UserType | null;
}

const menuItems = [
  { name: "Inicio", href: "/" },
  { name: "Planifica", href: "/where" },
  { name: "Blog", href: "/blog" },
];

export function MenuBurger({ user }: Props) {
  const [isOpen, setIsOpen] = React.useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const setUser = UserStore((set) => set.setUser);

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
              <UiLink
                key={item.href}
                namePath={item.name}
                href={item.href}
                className={styles.menuItem}
              />
            ))}
            {user?.user_id ? (
              <>
                <UiLink
                  namePath="Perfil"
                  href="/perfil"
                  className={`${styles.menuItem}`}
                />
                {user?.rol === 1 && (
                  <UiLink
                    namePath="Admin"
                    href="/admin"
                    className={`${styles.menuItem}`}
                  />
                )}
                <button
                  onClick={() => {
                    setUser(null);
                    logoutAction();
                  }}
                >
                  Cerrar Sesión
                </button>
              </>
            ) : (
              <>
                <UiLink
                  namePath="Login"
                  href="/login"
                  className={`${styles.menuItem}`}
                />
                <UiLink
                  namePath="Registrarse"
                  href="/register"
                  className={`${styles.menuItem}`}
                />
              </>
            )}
          </nav>
        </div>
      )}
    </div>
  );
}
