import React from "react";
import { Sections } from "../../components";
import styles from "./blog.module.css";
import { getOperators } from "@/lib/action";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: Props) {
  const { id } = await params;
  const operators = await getOperators();
  const operator = operators?.data?.find((operator) => operator.id === id);
  return (
    <div>
      <Sections className={styles.blog}>
        <h1 className={styles.title}>{operator?.name}</h1>
      </Sections>
      <Sections className={styles.content}>
        <p className={styles.title}>{operator?.name}</p>
        <div className={styles.question_response}>
          {operator?.blog?.map((blog, index) => (
            <div key={index}>
              {blog.startsWith("#") ? (
                <p key={index} className={styles.question}>
                  {blog.slice(1)}
                </p>
              ) : (
                <p key={index} className={styles.response}>
                  {blog.slice(1)}
                </p>
              )}
            </div>
          ))}
        </div>
      </Sections>
    </div>
  );
}
