import { getDetailsOperator, getOperatorById } from "@/lib/action";
import React from "react";
import { Description, Galeria, Info } from "../section";

interface Props {
  params: Promise<{ id: string }>;
}
export default async function Page({ params }: Props) {
  const { id } = await params;
  const operator = await getOperatorById(id);
  const detailsOperator = await getDetailsOperator(id);
  return (
    <div>
      <Info operator={operator.data} details={detailsOperator.data} />
      <Description
        description={operator.data?.description || "No hay descripción"}
      />
      <Galeria data={operator.data} />
    </div>
  );
}
