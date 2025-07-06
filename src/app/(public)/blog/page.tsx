import React from "react";
import Link from "next/link";
import styles from "./blog.module.css";
import { getOperators } from "@/lib/action";

export default async function BlogPage() {
  const operators = await getOperators();
  return (
    <>
      <div className={styles.hero}>
        <div className={styles.container}>
          <h1 className={styles.title}>Nuestro Blog</h1>
          <p className={styles.subtitle}>
            Descubre las últimas noticias, consejos y guías sobre turismo en San
            Luis de Gaceno y sus alrededores.
          </p>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.container}>
          <div className={styles.blogGrid}>
            {operators?.data
              ?.filter((operator) => operator.type_activity === 5)
              .map((post) => (
                <Link
                  href={`/blog/${post.id}`}
                  key={post.id}
                  className={styles.blogCard}
                >
                  <div className={styles.cardContent}>
                    <h2 className={styles.cardTitle}>{post.name}</h2>
                    <div className={styles.cardFooter}>
                      <span className={styles.readMore}>Leer más →</span>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}
