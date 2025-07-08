"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./ui-admin.module.css";
import { UiFormBlog, UiFormOperator } from "./section";
import { CategoryTableRow, OperatorTableRow, ZoneTableRow } from "@/lib/type";
import { UiFormActivity } from "./section/ui-form-activity/ui-form-activity";
import { ListTable } from "./section/list-table/list-table";

// Icons (you can replace these with your actual icon components)
const DashboardIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="3" width="7" height="9"></rect>
    <rect x="14" y="3" width="7" height="5"></rect>
    <rect x="14" y="12" width="7" height="9"></rect>
    <rect x="3" y="16" width="7" height="5"></rect>
  </svg>
);

const StoreIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
    <polyline points="9 22 9 12 15 12 15 22"></polyline>
  </svg>
);

const UsersIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
    <circle cx="9" cy="7" r="4"></circle>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
  </svg>
);

const LogoutIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
    <polyline points="16 17 21 12 16 7"></polyline>
    <line x1="21" y1="12" x2="9" y2="12"></line>
  </svg>
);

const TabButton = ({
  active,
  onClick,
  icon: Icon,
  children,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
}) => (
  <button
    className={`${styles.tabButton} ${active ? styles.active : ""}`}
    onClick={onClick}
  >
    <span className={styles.icon}>
      <Icon />
    </span>
    <span className={styles.label}>{children}</span>
    <span className={styles.activeIndicator}></span>
  </button>
);

interface Props {
  zones: ZoneTableRow[];
  categories: CategoryTableRow[];
  operators: OperatorTableRow[];
}

export const UiAdmin = ({ zones, categories, operators }: Props) => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("list");
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = () => {
    setIsLoggingOut(true);
    // Simulate logout process
    setTimeout(() => {
      // Redirect to login page after logout
      router.push("/auth/login");
    }, 500);
  };

  return (
    <div className={styles.adminContainer}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.headerLeft}>
            <h1 className={styles.title}>Panel de Administración</h1>
            <p className={styles.subtitle}>Gestiona tu contenido turístico</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className={styles.logoutButton}
          disabled={isLoggingOut}
          aria-label="Cerrar sesión"
        >
          <LogoutIcon />
          <span>{isLoggingOut ? "Saliendo..." : "Cerrar sesión"}</span>
        </button>
      </header>

      <div className={styles.mainContent}>
        <div className={styles.tabsContainer}>
          <div className={styles.tabsHeader}>
            <TabButton
              active={activeTab === "list"}
              onClick={() => setActiveTab("list")}
              icon={DashboardIcon}
            >
              Listado
            </TabButton>
            <TabButton
              active={activeTab === "dashboard"}
              onClick={() => setActiveTab("dashboard")}
              icon={DashboardIcon}
            >
              Comercios
            </TabButton>

            <TabButton
              active={activeTab === "comercios"}
              onClick={() => setActiveTab("comercios")}
              icon={StoreIcon}
            >
              Actividades y Poblados
            </TabButton>

            <TabButton
              active={activeTab === "usuarios"}
              onClick={() => setActiveTab("usuarios")}
              icon={UsersIcon}
            >
              Blogs
            </TabButton>
          </div>

          <div className={styles.tabContent}>
            <div className={styles.contentWrapper}>
              {activeTab === "list" && (
                <div className={styles.tabPanel}>
                  <ListTable operators={operators} />
                </div>
              )}
              {activeTab === "dashboard" && (
                <div className={styles.tabPanel}>
                  <UiFormOperator
                    categories={categories}
                    operators={operators.filter(
                      (operator) => operator.type_activity === 1
                    )}
                  />
                </div>
              )}

              {activeTab === "comercios" && (
                <div className={styles.tabPanel}>
                  <UiFormActivity zones={zones} />
                </div>
              )}
              {activeTab === "usuarios" && (
                <div className={styles.tabPanel}>
                  <UiFormBlog />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
