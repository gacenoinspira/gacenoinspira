import React from "react";
import { UiAdmin } from "./ui-admin";
import { getZones } from "@/lib/action/zone.action";
import { getCategories, getOperators } from "@/lib/action";

export default async function Page() {
  const zones = await getZones();
  const categories = await getCategories();
  const operators = await getOperators();
  console.log(zones);
  return (
    <div>
      <UiAdmin zones={zones.data ?? []} categories={categories.data ?? []} operators={operators.data ?? []} />
    </div>
  );
}
