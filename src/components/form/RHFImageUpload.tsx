"use client";

import { Controller, useFormContext } from "react-hook-form";
import ImageUploader from "../ImageUploader";

type Props = {
  name: string;
  maxFiles: number;
  label?: string;
  showCount?: boolean;
};

export default function RHFImageUploader({ name, maxFiles, label, showCount }: Props) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <ImageUploader
          label={label}
          maxFiles={maxFiles}
          showCount={showCount}
          value={field.value || []}
          onChange={field.onChange}
          error={fieldState.error?.message}
        />
      )}
    />
  );
}
