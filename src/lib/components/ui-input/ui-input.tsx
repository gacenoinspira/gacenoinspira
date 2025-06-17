import React, { ComponentPropsWithRef } from "react";

interface InputProps extends ComponentPropsWithRef<"input"> {
  placeholder: string;
  name: string;
  id: string;
}

export function UiInput({ ...props }: InputProps) {
  return (
    <label>
      <input {...props} />
    </label>
  );
}
