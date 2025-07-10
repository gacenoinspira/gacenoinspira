import React from "react";
import { Favorite, InfoUser } from "./section";
import { getDetailsOperatorByUser, getInfoUser } from "@/lib/action";
import styles from "./page-perfil.module.css";
import { Commentarios } from "./section/comentarios/commentarios";

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
      <Commentarios
        comments={detailsOperator.data?.filter((item) => item.notes) || []}
      />
      <p className={styles.paragraph}>
        Estos son los destinos, actividades y servicios que has seleccionado
        para tu viaje. Puedes eliminarlos, o añadir más destinos y actividades
      </p>
      <Favorite
        favorites={
          detailsOperator.data
            ?.filter((item) => item.is_favorite)
            .map((item) => ({
              id: item.operator?.id ?? "",
              title: item.operator?.name_company || item.operator?.name || "",
              location: item.operator?.name_company || "",
              image: item.operator?.logo || "/img/san_luis.jpeg",
              isFavorite: item.is_favorite || false,
              accountId: item.id_operator,
              type: item.operator?.type_activity || 0,
            })) || []
        }
      />
    </div>
  );
}
