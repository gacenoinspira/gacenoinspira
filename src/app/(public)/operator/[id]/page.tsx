import { getDetailsOperator, getInfoUser, getOperatorById } from "@/lib/action";
import React from "react";
import { Comments, Description, Galeria, Info } from "../section";
import { AddComments } from "../section/add-comments/add-comments";
import { Navigate } from "../section/navigate/navigate";

interface Props {
  params: Promise<{ id: string }>;
}
export default async function Page({ params }: Props) {
  const { id } = await params;
  const operator = await getOperatorById(id);
  const detailsOperator = await getDetailsOperator(id);
  const user = await getInfoUser();
  return (
    <div>
      <Info
        operator={operator.data}
        details={detailsOperator.data}
        id={id}
        accountId={id}
      />
      <Description
        description={operator.data?.description || "No hay descripción"}
      />
      <Galeria data={operator.data} />
      <Comments comments={detailsOperator?.data || []} />
      {!detailsOperator?.data?.find(
        (item) => item.user_id === user.data?.user_id
      )?.notes && <AddComments id={id} />}
      <Navigate operator={operator.data} />
    </div>
  );
}
