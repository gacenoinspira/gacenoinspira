import React from "react";
import { UiAdmin } from "./ui-admin";
import { getZones } from "@/lib/action/zone.action";

export default async function Page() {
  const zones = await getZones();
  console.log(zones);
  return (
    <div>
      <UiAdmin zones={zones.data ?? []} />
    </div>
  );
}
