"use client";

import React, { useEffect, useRef } from "react";
import styles from "./menuBurger.module.css";
import { UiLink } from "../ui-link/ui-link";
import { logoutAction } from "@/lib/action";
import { UserType } from "@/lib/type";
import { UserStore } from "@/lib/store/user.store";
import { DictionaryType, langType } from "@/lib/translate/translate";
import { BtnLanguage } from "../btn-language/btn-language";

interface Props {
  user: UserType | null;
  dictionary: DictionaryType;
  lang: langType;
}

export function MenuBurger({ user, dictionary, lang }: Props) {
  const [isOpen, setIsOpen] = React.useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const setUser = UserStore((set) => set.setUser);

  const menuItems = [
    { name: dictionary.headerInicio, href: "/" },
    { name: dictionary.headerDescubre, href: "/discovery" },
    { name: dictionary.headerPlanifica, href: "/where" },
    { name: dictionary.headerBlog, href: "/blog" },
  ];

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
          <nav className={styles.nav} onClick={() => setIsOpen(false)}>
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
                  className={`${styles.logOut}`}
                >
                  Cerrar Sesión
                </button>
              </>
            ) : (
              <>
                <UiLink
                  namePath={dictionary.headerLogin}
                  href="/login"
                  className={`${styles.menuItem}`}
                />
                <UiLink
                  namePath={dictionary.headerRegister}
                  href="/register"
                  className={`${styles.menuItem}`}
                />
              </>
            )}
            <BtnLanguage lang={lang} dictionary={dictionary} />
          </nav>
        </div>
      )}
    </div>
  );
}
