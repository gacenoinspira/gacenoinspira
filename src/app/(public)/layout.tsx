import React from "react";

import { Footer } from "./components/footer/ui-footer";
import { UiHeader } from "./components";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <UiHeader />
      {children}
      <Footer />
    </main>
  );
}
