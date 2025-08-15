"use server";

import { cookies } from "next/headers";
import es from "./es.json";
import en from "./en.json";

export type langType = "es" | "en";
export type DictionaryType = typeof es;

export interface PropsLang {
  lang: langType;
  dictionary: DictionaryType;
}

const dictionaries = {
  en,
  es,
};

export const getDictionary = async (): Promise<PropsLang> => {
  const cookieStore = await cookies();
  const lang = cookieStore.get("lang");
  const dictionary = dictionaries[lang?.value as langType] || dictionaries.es;
  return { lang: lang?.value as langType, dictionary };
};

export const setDictionary = async (lang: langType): Promise<void> => {
  const cookieStore = await cookies();
  cookieStore.set("lang", lang);
};
