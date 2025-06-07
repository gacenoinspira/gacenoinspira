import React from "react";
import styles from "./where.module.css";
import { UiCard, UiTabs } from "./components";

export default function Page() {
  return (
    <div className={styles.where}>
      <div className={styles.image}>
        <UiTabs />
      </div>
      <div className={styles.card}>
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
        />
        <UiCard
          title="Card"
          description="Card Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit."
          price="20000"
          imageUrl="/img/san_luis.jpeg"
        />
      </div>
    </div>
  );
}
