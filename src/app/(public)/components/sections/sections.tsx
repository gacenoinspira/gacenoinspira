import React, { ComponentPropsWithRef } from 'react';
import styles from './sections.module.css';

interface Props extends ComponentPropsWithRef<'section'> {
    children: React.ReactNode;
}

export function Sections ({children, className, ...props}: Props) {
  return (
    <section className={`${styles.section} ${className}`} {...props}>
    {children}
    </section>
  );
};
