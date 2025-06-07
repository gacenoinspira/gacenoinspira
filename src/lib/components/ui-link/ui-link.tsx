"use client";

import Link from "next/link";
import React, { ComponentPropsWithRef } from "react";
import { usePathname } from "next/navigation";
import LoadingIndicator from "./ui-indicador-loading-link";

interface Props extends ComponentPropsWithRef<typeof Link> {
  namePath: string;
  classActive?: string;
}

export function UiLink({
  namePath,
  href,
  classActive = "",
  className = "",
  ...props
}: Props) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <div>
      <Link
        href={href}
        className={`${isActive ? classActive : ""} ${className}`}
        {...props}
      >
        <span>{namePath}</span>
        <LoadingIndicator />
      </Link>
    </div>
  );
}
