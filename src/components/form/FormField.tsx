// components/form/FormField.tsx
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Props {
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
  register: any;
  error?: string;
}

export function FormField({ id, label, type = "text", placeholder, register, error }: Props) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="font-semibold">
        {label}
      </Label>

      <Input id={id} type={type} placeholder={placeholder} {...register} />

      {error && <p className="text-destructive text-xs">{error}</p>}
    </div>
  );
}
