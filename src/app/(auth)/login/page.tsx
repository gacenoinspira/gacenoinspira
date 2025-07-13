import React from "react";
import { UiFormLogin } from "./ui-form-login";
import { getDictionary } from "@/lib/translate/translate";

export default async function Page() {
  const { dictionary } = await getDictionary();
  return (
    <div>
      <UiFormLogin dictionary={dictionary} />
    </div>
  );
}
