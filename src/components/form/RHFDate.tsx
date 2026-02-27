"use client";

import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Control, FieldPath, FieldValues } from "react-hook-form";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";

type RHFDatePickerProps<T extends FieldValues> = {
  control: Control<T>;
  name: FieldPath<T>;
  label?: string;
  placeholder?: string;
  disabled?: (date: Date) => boolean;
};

export function RHFDatePicker<T extends FieldValues>({
  control,
  name,
  label,
  placeholder = "Pick a date",
  disabled,
}: RHFDatePickerProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        const value: Date | undefined = field.value ? new Date(field.value) : undefined;

        return (
          <FormItem className="flex flex-col">
            {label && <FormLabel>{label}</FormLabel>}

            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    type="button"
                    variant="outline"
                    className={cn("w-full justify-start text-left font-normal", !value && "text-muted-foreground")}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {value ? format(value, "PPP") : placeholder}
                  </Button>
                </FormControl>
              </PopoverTrigger>

              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={value}
                  onSelect={(date) => {
                    if (!date) return;
                    field.onChange(date.toISOString()); // ✅ string
                  }}
                  disabled={disabled}
                  initialFocus
                />
              </PopoverContent>
            </Popover>

            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}
