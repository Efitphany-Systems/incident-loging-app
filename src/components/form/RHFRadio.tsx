"use client";

import { Controller, Control, FieldValues, Path } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

type Option<T extends string = string> = {
  label: string;
  value: T;
};

type RHFRadioProps<TFieldValues extends FieldValues, TValue extends string = string> = {
  control: Control<TFieldValues>;
  name: Path<TFieldValues>;
  label?: string;
  options: Option<TValue>[];
  className?: string;
};

export function RHFRadio<TFieldValues extends FieldValues, TValue extends string = string>({
  control,
  name,
  label,
  options,
  className = "flex gap-6",
}: RHFRadioProps<TFieldValues, TValue>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        const error = fieldState.error?.message;
        return (
          <div>
            {label && <Label className="mb-1 text-sm font-bold">{label}</Label>}
            <RadioGroup value={field.value ?? ""} onValueChange={(v) => field.onChange(v)} className={className}>
              {options.map((opt) => (
                <div key={opt.value} className="flex items-center gap-2">
                  <RadioGroupItem value={opt.value} id={`${name}-${opt.value}`} />
                  <Label htmlFor={`${name}-${opt.value}`}>{opt.label}</Label>
                </div>
              ))}
            </RadioGroup>
            {error && <p className="text-destructive text-xs">{error}</p>}
          </div>
        );
      }}
    />
  );
}
