import React from "react";
import UiFormRegister from "./ui-form-register";
import { getDictionary } from "@/lib/translate/translate";

export default async function Page() {
  const { dictionary } = await getDictionary();
  return (
    <div>
      <UiFormRegister dictionary={dictionary}/>
    </div>
  );
}
