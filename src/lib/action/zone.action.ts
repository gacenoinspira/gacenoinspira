"use server";

import { ZoneTable } from "../repository";
import { ResponseType, ZoneTableRow } from "../type";

export const getZones = async (): Promise<
  ResponseType<ZoneTableRow[] | null>
> => {
  const zones = await ZoneTable.getZones();
  return zones;
};
