/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import InputMask from "react-input-mask";
import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface RHFMaskTextFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  mask: string;
  label?: string;
  helperText?: string;
}

export default function RHFMaskTextField({
  name,
  mask,
  label,
  helperText,
  ...other
}: RHFMaskTextFieldProps) {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <InputMask
              mask={mask}
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              disabled={other.disabled}
              maskChar=""
            >
              {(inputProps: any) => (
                <Input {...inputProps} {...field} {...other} />
              )}
            </InputMask>
          </FormControl>
          {helperText && <FormDescription>{helperText}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
