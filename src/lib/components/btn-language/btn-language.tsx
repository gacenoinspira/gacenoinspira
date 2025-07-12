"use client";

import React from "react";
import styles from "./btn-language.module.css";
import { DictionaryType, setDictionary } from "@/lib/translate/translate";
import { FlagsIcon } from "../../icons";
import { langType } from "@/lib/translate/translate";

interface Props {
  lang: langType;
  dictionary: DictionaryType;
}

export function BtnLanguage({ lang, dictionary }: Props) {
  const onSetLanguage = () => {
    setDictionary(lang === "es" ? "en" : "es");
  };
  return (
    <button className={styles.btn_language} onClick={onSetLanguage}>
      {dictionary.btnLanguage}{" "}
      <FlagsIcon lang={lang === "es" ? "en" : "es"} height={24} width={24} />
    </button>
  );
}
