import React from "react";
import Link from "next/link";
import styles from "./blog.module.css";
import { getOperators } from "@/lib/action";
import { getDictionary } from "@/lib/translate/translate";

export default async function BlogPage() {
  const operators = await getOperators();
  const { dictionary } = await getDictionary();
  return (
    <>
      <div className={styles.hero}>
        <div className={styles.container}>
          <h1 className={styles.title}>{dictionary.blog.title}</h1>
          <p className={styles.subtitle}>{dictionary.blog.subtitle}</p>
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
