"use client";

import React from "react";
import styles from "./spinner.module.css";

interface SpinnerProps {
  fullScreen?: boolean;
  size?: 'sm' | 'md' | 'lg';
  color?: string;
}

export function Spinner({ 
  fullScreen = true, 
  size = 'md',
  color = '#3b82f6' 
}: SpinnerProps) {
  const sizeClasses = {
    sm: 'w-8 h-8 border-3',
    md: 'w-12 h-12 border-4',
    lg: 'w-16 h-16 border-[5px]'
  };

  const spinnerStyle = {
    '--spinner-color': color,
  } as React.CSSProperties;

  const spinner = (
    <div 
      className={`${styles.spinner} ${!fullScreen ? 'relative bg-transparent' : ''}`} 
      style={spinnerStyle}
    >
      <div className={`${styles.spinnerElement} ${sizeClasses[size]}`}></div>
    </div>
  );

  return spinner;
}
