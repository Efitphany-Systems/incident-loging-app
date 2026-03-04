"use client";

import { Controller, useFormContext } from "react-hook-form";
import ImageUploader from "../ImageUploader";

type Props = {
  name: string;
};

export default function RHFImageUploader({ name }: Props) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <ImageUploader value={field.value || []} onChange={field.onChange} error={fieldState.error?.message} />
      )}
    />
  );
}
