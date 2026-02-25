"use client";

import { Controller, Control, FieldValues, Path } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

type RHFInputProps<TFieldValues extends FieldValues> = {
  control: Control<TFieldValues>;
  name: Path<TFieldValues>;

  label?: string;
  placeholder?: string;
  type?: string;

  description?: string;
  required?: boolean;
  disabled?: boolean;

  className?: string;
  inputClassName?: string;
};

export function RHFInput<TFieldValues extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  type = "text",
  description,
  required,
  disabled,
  className,
  inputClassName,
}: RHFInputProps<TFieldValues>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        const error = fieldState.error?.message;

        return (
          <div className={cn("space-y-2", className)}>
            {label && (
              <Label htmlFor={name} className="flex items-center gap-1 font-semibold">
                {label}
                {required && <span className="text-destructive">*</span>}
              </Label>
            )}

            <Input
              id={name}
              type={type}
              placeholder={placeholder}
              disabled={disabled}
              className={cn(error && "border-destructive", inputClassName)}
              {...field}
              value={field.value ?? ""}
            />

            {description && !error && <p className="text-muted-foreground text-xs">{description}</p>}

            {error && <p className="text-destructive text-xs">{error}</p>}
          </div>
        );
      }}
    />
  );
}
