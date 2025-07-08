import React from "react";
import { Favorite, InfoUser } from "./section";
import { getDetailsOperatorByUser, getInfoUser } from "@/lib/action";

export default async function Perfil() {
  const user = await getInfoUser();
  const detailsOperator = await getDetailsOperatorByUser(
    user.data?.user_id ?? ""
  );
  console.log("detailsOperator", detailsOperator);
  return (
    <div>
      <InfoUser
        name={user.data?.name || ""}
        role={user.data?.rol === 1 ? "Admin" : "User"}
        initials={user.data?.name?.[0] || ""}
        avatar={user.data?.avatar || ""}
        id={user.data?.user_id || ""}
      />
      <Favorite
        favorites={
          detailsOperator.data
            ?.filter((item) => item.is_favorite)
            .map((item) => ({
              id: item.id,
              title: item.operator?.name_company || "",
              location: item.operator?.name_company || "",
              image: item.operator?.logo || "/img/san_luis.jpeg",
              isFavorite: item.is_favorite || false,
              accountId: item.id_operator,
            })) || []
        }
      />
    </div>
  );
}
