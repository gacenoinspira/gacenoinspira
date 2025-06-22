import { getOperatorById } from "@/lib/action";
import React from "react";
import { Info } from "../section";

interface Props {
  params: Promise<{ id: string }>;
}
export default async function Page({ params }: Props) {
  const { id } = await params;
  const operator = await getOperatorById(id);
  return (
    <div>
      <Info operator={operator.data} />
    </div>
  );
}
