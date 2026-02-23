import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

type RadioOption<T extends string = string> = {
  label: string;
  value: T;
};

interface RadioFieldProps<T extends string = string> {
  value?: T;
  onChange: (value: T) => void;
  name: string;
  options: RadioOption<T>[];
  className?: string;
}

export function RadioOption<T extends string = string>({
  value,
  onChange,
  name,
  options,
  className = "flex gap-6",
}: RadioFieldProps<T>) {
  return (
    <RadioGroup value={value ?? ""} onValueChange={(v) => onChange(v as T)} className={className}>
      {options.map((opt) => (
        <div key={opt.value} className="flex items-center gap-2">
          <RadioGroupItem value={opt.value} id={`${name}-${opt.value}`} />
          <Label htmlFor={`${name}-${opt.value}`}>{opt.label}</Label>
        </div>
      ))}
    </RadioGroup>
  );
}
