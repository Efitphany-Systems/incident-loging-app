"use client";

import { Controller, Control, FieldValues, Path } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";

type RHFTextareaProps<TFieldValues extends FieldValues> = {
  control: Control<TFieldValues>;
  name: Path<TFieldValues>;

  label?: string;
  placeholder?: string;
  description?: string;
  required?: boolean;
  disabled?: boolean;

  className?: string;
  textareaClassName?: string;

  minRows?: number;
  maxRows?: number;
};

export function RHFTextarea<TFieldValues extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  description,
  required,
  disabled,
  className,
  textareaClassName,
  minRows = 1,
  maxRows,
}: RHFTextareaProps<TFieldValues>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        const error = fieldState.error?.message;
        const textareaRef = useRef<HTMLTextAreaElement | null>(null);

        const resizeTextarea = () => {
          const el = textareaRef.current;
          if (!el) return;

          el.style.height = "auto";
          el.style.height = `${el.scrollHeight}px`;

          if (maxRows) {
            const lineHeight = parseInt(window.getComputedStyle(el).lineHeight);
            const maxHeight = lineHeight * maxRows;

            if (el.scrollHeight > maxHeight) {
              el.style.height = `${maxHeight}px`;
              el.style.overflowY = "auto";
            } else {
              el.style.overflowY = "hidden";
            }
          }
        };

        useEffect(() => {
          resizeTextarea();
        }, [field.value]);

        return (
          <div className={cn("space-y-2", className)}>
            {label && (
              <Label className="flex items-center gap-1 font-semibold">
                {label}
                {required && <span className="text-destructive">*</span>}
              </Label>
            )}

            <Textarea
              {...field}
              ref={(el) => {
                field.ref(el);
                textareaRef.current = el;
              }}
              placeholder={placeholder}
              disabled={disabled}
              rows={minRows}
              className={cn("resize-none overflow-hidden", error && "border-destructive", textareaClassName)}
              value={field.value ?? ""}
              onChange={(e) => {
                field.onChange(e.target.value);
                resizeTextarea();
              }}
            />

            {description && !error && <p className="text-muted-foreground text-xs">{description}</p>}

            {error && <p className="text-destructive text-xs">{error}</p>}
          </div>
        );
      }}
    />
  );
}
