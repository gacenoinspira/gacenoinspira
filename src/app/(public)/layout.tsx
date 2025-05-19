import React from "react";
import { UiHeader } from "./components";
import { Footer } from "./components/footer/ui-footer";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <UiHeader />
      {children}
      <Footer />
    </main>
  );
}
