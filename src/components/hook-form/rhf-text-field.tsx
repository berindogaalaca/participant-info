import * as React from "react";
import { useFormContext, FieldValues, Path } from "react-hook-form";
import { Input } from "@/components/ui/input";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";

interface RHFTextFieldProps<TFormValues extends FieldValues> {
  name: Path<TFormValues>;
  label?: string;
  type?: string;
  placeholder?: string;
  description?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
}

export default function RHFTextField<TFormValues extends FieldValues>({
  name,
  label,
  type = "text",
  placeholder,
  description,
  required,
  disabled,
  className,
}: RHFTextFieldProps<TFormValues>) {
  const { control } = useFormContext<TFormValues>();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          {label && (
            <FormLabel>
              {label}
              {required && <span className="text-red-500 ml-1">*</span>}
            </FormLabel>
          )}
          <FormControl>
            <Input
              {...field}
              type={type}
              placeholder={placeholder}
              disabled={disabled}
              value={
                type === "number" && field.value === 0 ? "" : field.value ?? ""
              }
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                if (type === "number") {
                  const numberValue =
                    e.target.value === "" ? 0 : Number(e.target.value);
                  field.onChange(numberValue);
                } else {
                  field.onChange(e.target.value);
                }
              }}
            />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
