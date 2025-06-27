import { HeaderPage } from "./section/header-page/headerPage";
import { UiContent } from "./section/content/ui-content";
import { getOperatorById } from "@/lib/action";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function PobladoPage({ params }: Props) {
  const { id } = await params;
  const operator = await getOperatorById(id);
  return (
    <main className="min-h-screen bg-white">
      <HeaderPage
        title={operator.data?.name || ""}
        logo={operator.data?.logo || ""}
      />
      <UiContent
        title={operator.data?.name || ""}
        description={operator.data?.description || ""}
      />
    </main>
  );
}
