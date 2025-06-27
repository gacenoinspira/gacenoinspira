import React from "react";
import { InfoUser } from "./section";
import { getInfoUser } from "@/lib/action";

export default async function Perfil() {
  const user = await getInfoUser();
  return (
    <div>
      <InfoUser
        name={user.data?.name || ""}
        role={user.data?.rol === 1 ? "Admin" : "User"}
        initials={user.data?.name?.[0] || ""}
      />
      {/* <Favorite /> */}
    </div>
  );
}
