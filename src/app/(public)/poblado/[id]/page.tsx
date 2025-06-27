import { HeaderPage } from "./section/header-page/headerPage";
import { UiContent } from "./section/content/ui-content";

export default function PobladoPage() {
  return (
    <main className="min-h-screen bg-white">
      <HeaderPage />
      <UiContent
        title="Título personalizado"
        description="Descripción personalizada"
      />
    </main>
  );
}
