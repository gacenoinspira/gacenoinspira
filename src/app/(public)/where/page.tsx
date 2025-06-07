import React from "react";
import styles from "./where.module.css";
import { UiTabs } from "./components";
import { ContainerCards } from "./components/conatiner-card/container-cards";

export default function Page() {
  return (
    <div className={styles.where}>
      <div className={styles.image}>
        <UiTabs />
      </div>
      <div className={styles.card}>
        <ContainerCards />
        {/* <UiCard
          title="Card"
          description="Card Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit."
          price="20000"
          imageUrl="/img/san_luis.jpeg"
        />
        <UiCard
          title="Card"
          description="Card Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit."
          price="20000"
          imageUrl="/img/san_luis.jpeg"
        />
        <UiCard
          title="Card"
          description="Card Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit."
          price="20000"
          imageUrl="/img/san_luis.jpeg"
        />
        <UiCard
          title="Card"
          description="Card Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit."
          price="20000"
          imageUrl="/img/san_luis.jpeg"
        />
        <UiCard
          title="Card"
          description="Card Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit."
          price="20000"
          imageUrl="/img/san_luis.jpeg"
        /> */}
      </div>
    </div>
  );
}
