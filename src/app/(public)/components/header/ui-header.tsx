"use client";

import React, { useEffect, useState } from "react";
import styles from "./ui-header.module.css";
import { UiLink } from "@/lib/components/index";
import { MenuBurger } from "@/lib/components/menu-burger/menu-burger";
import { UserStore } from "@/lib/store/user.store";
import { logoutAction } from "@/lib/action";
import { UserType } from "@/lib/type";
import { useNavegationStore } from "@/lib/store/navegation";

interface HeaderProp {
  userDb: UserType | null;
}

export function UiHeader({ userDb }: HeaderProp) {
  const [showModal, setShowModal] = useState(false);
  const user = UserStore((set) => set.user);
  const setUser = UserStore((set) => set.setUser);
  const setNavegation = useNavegationStore((set) => set.setValue);

  useEffect(() => {
    setUser(userDb);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude, accuracy } = position.coords;
          setNavegation({ lat: latitude, lng: longitude });
          console.log(`Lat: ${latitude}, Lon: ${longitude} (±${accuracy} m)`);
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
        <img src="/img/logo.svg" alt="Logo" className={styles.logo} />
      </div>
      <MenuBurger user={user} />
      <nav className={styles.nav}>
        <UiLink
          namePath="INICIO"
          href="/"
          className={`${styles.link_header}`}
          classActive={styles.active}
        />
        <UiLink
          namePath="DESCUBRE"
          href="/discovery"
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
                  namePath="Perfil"
                  href="/perfil"
                  className={`${styles.link}`}
                />
                {user.rol === 1 && (
                  <UiLink
                    namePath="Admin"
                    href="/admin"
                    className={`${styles.link}`}
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
                  className={`${styles.link}`}
                />
                <UiLink
                  namePath="Registrarse"
                  href="/register"
                  className={`${styles.link}`}
                />
              </>
            )}
          </div>
        </div>
        {/* <button className={`${styles.btn}`}>
          <img src="/img/search.svg" alt="search" />
        </button> */}
      </div>
    </header>
  );
}
