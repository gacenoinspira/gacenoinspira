import React from "react";
import { UiHeader } from "../(public)/components";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <UiHeader />
      {children}
    </main>
  );
}
