import { HeaderPage } from "./section/header-page/headerPage";
import { UiContent } from "./section/content/ui-content";
import { getDetailsOperator, getOperatorById } from "@/lib/action";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function PobladoPage({ params }: Props) {
  const { id } = await params;
  const operator = await getOperatorById(id);
  const detailsOperator = await getDetailsOperator(id);
  return (
    <main className="min-h-screen bg-white">
      <HeaderPage
        title={operator.data?.name || ""}
        logo={operator.data?.logo || ""}
        id={id}
        type={operator.data?.type_activity || 0}
        details={detailsOperator.data}
      />
      <UiContent
        title={operator.data?.name || ""}
        description={operator.data?.description || ""}
        logo={operator.data?.logo || "/img/san_luis.jpeg"}
        activity={operator.data?.activity || []}
        rules={operator.data?.rules || []}
        images={operator.data?.img || []}
        indications={operator.data?.indications || ""}
      />
    </main>
  );
}
