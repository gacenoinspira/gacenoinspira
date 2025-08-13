"use client";

import React, { useEffect, useState } from "react";
import styles from "./ui-header.module.css";
import { UiLink } from "@/lib/components/index";
import { MenuBurger } from "@/lib/components/menu-burger/menu-burger";
import { UserStore } from "@/lib/store/user.store";
import { logoutAction } from "@/lib/action";
import { UserType } from "@/lib/type";
import { useNavegationStore } from "@/lib/store/navegation";
import Link from "next/link";
import { BtnLanguage } from "@/lib/components/btn-language/btn-language";
import { DictionaryType, langType } from "@/lib/translate/translate";

interface HeaderProp {
  userDb: UserType | null;
  lang: langType;
  dictionary: DictionaryType;
}

export function UiHeader({ userDb, lang, dictionary }: HeaderProp) {
  const [showModal, setShowModal] = useState(false);
  const user = UserStore((set) => set.user);
  const setUser = UserStore((set) => set.setUser);
  const setNavegation = useNavegationStore((set) => set.setValue);

  useEffect(() => {
    setUser(userDb);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude, } = position.coords;
          setNavegation({ lat: latitude, lng: longitude });
  
        },
        (error) => {
          console.error(
            "Error al obtener ubicación:",
            error.code,
            error.message
          );
        },
        {
          enableHighAccuracy: true, // precisa el GPS
          timeout: 10000, // tiempo máximo de espera en ms
          maximumAge: 0, // no usar ubicación caché
        }
      );
    } else {
      console.error("Tu navegador no soporta geolocalización");
    }
  }, []);
  return (
    <header className={`${styles.header}`}>
      <div>
        <Link href={"/"}>
          <img src="/img/logo.svg" alt="Logo" className={styles.logo} />
        </Link>
      </div>
      <MenuBurger user={user} dictionary={dictionary} lang={lang}/>
      <nav className={styles.nav}>
        <UiLink
          namePath={dictionary.headerInicio}
          href="/"
          className={`${styles.link_header}`}
          classActive={styles.active}
        />
        <UiLink
          namePath={dictionary.headerDescubre}
          href="/discovery"
          className={`${styles.link_header}`}
          classActive={styles.active}
        />
        <UiLink
          namePath={dictionary.headerPlanifica}
          href="/where"
          className={`${styles.link_header}`}
          classActive={styles.active}
        />
        <UiLink
          namePath={dictionary.headerBlog}
          href="/blog"
          className={`${styles.link_header}`}
          classActive={styles.active}
        />
      </nav>
      <div className={`${styles.searchContainer}`}>
        <div
          className={`${styles.btn} ${styles.menu}`}
          onClick={() => setShowModal(!showModal)}
        >
          <img src="/img/user.svg" alt="user" />
          <div
            className={`${styles.menuModal} ${showModal ? styles.active : ""}`}
          >
            {user?.user_id ? (
              <>
                <UiLink
                  namePath={dictionary.headerProfile}
                  href="/perfil"
                  className={`${styles.link}`}
                />
                {user.rol === 1 && (
                  <UiLink
                    namePath={dictionary.headerAdmin}
                    href="/admin"
                    className={`${styles.link}`}
                  />
                )}
                <button
                  onClick={() => {
                    setUser(null);
                    logoutAction();
                  }}
                  className={`${styles.logOut}`}
                >
                  {dictionary.headerLogout}
                </button>
              </>
            ) : (
              <>
                <UiLink
                  namePath={dictionary.headerLogin}
                  href="/login"
                  className={`${styles.link}`}
                />
                <UiLink
                  namePath={dictionary.headerRegister}
                  href="/register"
                  className={`${styles.link}`}
                />
              </>
            )}
            <BtnLanguage lang={lang} dictionary={dictionary} />
          </div>
        </div>
        {/* <button className={`${styles.btn}`}>
          <img src="/img/search.svg" alt="search" />
        </button> */}
      </div>
    </header>
  );
}
