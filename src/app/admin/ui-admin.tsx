"use client";

import React, { useState } from "react";
import styles from "./ui-admin.module.css";

export const UiAdmin = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className={styles.tabsContainer}>
      <div className={styles.tabsHeader}>
        <button
          className={`${styles.tabButton} ${
            activeTab === "dashboard" ? styles.active : ""
          }`}
          onClick={() => setActiveTab("dashboard")}
        >
          Dashboard
        </button>
        <button
          className={`${styles.tabButton} ${
            activeTab === "comercios" ? styles.active : ""
          }`}
          onClick={() => setActiveTab("comercios")}
        >
          Comercios
        </button>
        <button
          className={`${styles.tabButton} ${
            activeTab === "usuarios" ? styles.active : ""
          }`}
          onClick={() => setActiveTab("usuarios")}
        >
          Usuarios
        </button>
      </div>

      <div className={styles.tabContent}>
        {activeTab === "dashboard" && (
          <div>
            <h2>Panel de Control</h2>
            <p>Bienvenido al panel de administración</p>
          </div>
        )}

        {activeTab === "comercios" && (
          <div>
            <h2>Gestión de Comercios</h2>
            <p>Administra los comercios registrados</p>
          </div>
        )}

        {activeTab === "usuarios" && (
          <div>
            <h2>Gestión de Usuarios</h2>
            <p>Administra los usuarios del sistema</p>
          </div>
        )}
      </div>
    </div>
  );
};
