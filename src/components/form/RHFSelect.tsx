"use client";

import { Controller, Control, FieldValues, Path } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectItem } from "@/components/ui/select";

type Option<T extends string = string> = {
  label: string;
  value: T;
};

type RHFSelectProps<TFieldValues extends FieldValues, TValue extends string = string> = {
  control: Control<TFieldValues>;
  name: Path<TFieldValues>;
  label?: string;
  options: Option<TValue>[];
  placeholder?: string;
  className?: string;
};

export function RHFSelect<TFieldValues extends FieldValues, TValue extends string = string>({
  control,
  name,
  label,
  options,
  placeholder = "Select an option",
  className = "w-full",
}: RHFSelectProps<TFieldValues, TValue>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        const error = fieldState.error?.message;
        return (
          <div>
            {label && <Label className="mb-1 text-sm font-bold">{label}</Label>}

            <Select value={field.value ?? ""} onValueChange={field.onChange}>
              <SelectTrigger className={className}>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>

              <SelectContent>
                <SelectGroup>
                  {options.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            {error && <p className="text-destructive text-xs">{error}</p>}
          </div>
        );
      }}
    />
  );
}
