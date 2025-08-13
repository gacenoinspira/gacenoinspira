import React from "react";
import { UiAdmin } from "./ui-admin";
import { getZones } from "@/lib/action/zone.action";
import { getCategories, getOperators } from "@/lib/action";
import { getImagePageTable } from "@/lib/action/img-page.action";

export default async function Page() {
  const zones = await getZones();
  const categories = await getCategories();
  const operators = await getOperators();
  const imagePage = await getImagePageTable();
  return (
    <div>
      <UiAdmin
        zones={zones.data ?? []}
        categories={categories.data ?? []}
        operators={operators.data ?? []}
        imgInicio={imagePage.data?.home}
        imgDescubre={imagePage.data?.discovery}
      />
    </div>
  );
}
