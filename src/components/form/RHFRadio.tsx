"use client";

import { Controller, Control, FieldValues, Path } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

type RadioValue = string | boolean;

type Option<T extends RadioValue = RadioValue> = {
  label: string;
  value: T;
};

type RHFRadioProps<TFieldValues extends FieldValues, TValue extends RadioValue = RadioValue> = {
  control: Control<TFieldValues>;
  name: Path<TFieldValues>;
  label?: string;
  options: Option<TValue>[];
  className?: string;
};

export function RHFRadio<TFieldValues extends FieldValues, TValue extends RadioValue = RadioValue>({
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

        // convert RHF value → string for RadioGroup
        const stringValue = typeof field.value === "boolean" ? String(field.value) : (field.value ?? "");

        return (
          <div>
            {label && <Label className="mb-1 text-sm font-bold">{label}</Label>}

            <RadioGroup
              value={stringValue}
              onValueChange={(v) => {
                // detect boolean options automatically
                const opt = options.find((o) => String(o.value) === v);
                field.onChange(opt?.value ?? v);
              }}
              className={className}
            >
              {options.map((opt) => {
                const id = `${name}-${String(opt.value)}`;

                return (
                  <div key={id} className="flex items-center gap-2">
                    <RadioGroupItem value={String(opt.value)} id={id} />
                    <Label htmlFor={id}>{opt.label}</Label>
                  </div>
                );
              })}
            </RadioGroup>

            {error && <p className="text-destructive text-xs">{error}</p>}
          </div>
        );
      }}
    />
  );
}
