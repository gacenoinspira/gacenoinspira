import React, { ComponentPropsWithRef } from "react";
import styles from "./ui-form.module.css";

interface FormProps extends ComponentPropsWithRef<"form"> {
  children: React.ReactNode;
}

export function UiForm({ children, ...props }: FormProps) {
  return (
    <form className={styles.form} {...props}>
      {children}
    </form>
  );
}
