"use client";

import { useState } from "react";
import { Clock } from "lucide-react";
import { Control, FieldPath, FieldValues } from "react-hook-form";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

type RHFTimePickerProps<T extends FieldValues> = {
  control: Control<T>;
  name: FieldPath<T>;
  label?: string;
  placeholder?: string;
  interval?: number;
};

function generateTimeSlots(interval: number) {
  const slots: string[] = [];

  for (let h = 0; h < 24; h++) {
    for (let m = 0; m < 60; m += interval) {
      const date = new Date();
      date.setHours(h, m, 0, 0);

      const label = date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });

      slots.push(label);
    }
  }

  return slots;
}

export function RHFTimePicker<T extends FieldValues>({
  control,
  name,
  label,
  placeholder = "Select time",
  interval = 15,
}: RHFTimePickerProps<T>) {
  const [open, setOpen] = useState(false);
  const slots = generateTimeSlots(interval);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        const value: string | undefined = field.value;

        return (
          <FormItem className="flex flex-col">
            {label && <FormLabel>{label}</FormLabel>}

            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    type="button"
                    variant="outline"
                    className={cn("w-full justify-start text-left font-normal", !value && "text-muted-foreground")}
                  >
                    <Clock className="mr-2 h-4 w-4" />
                    {value || placeholder}
                  </Button>
                </FormControl>
              </PopoverTrigger>

              <PopoverContent className="w-60 p-0">
                <div className="max-h-60 overflow-y-auto">
                  {slots.map((time) => (
                    <button
                      key={time}
                      type="button"
                      onClick={() => {
                        field.onChange(time);
                        setOpen(false); // ✅ close after select
                      }}
                      className={cn(
                        "hover:bg-muted w-full px-3 py-2 text-left text-sm",
                        value === time && "bg-muted font-medium"
                      )}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </PopoverContent>
            </Popover>

            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}
