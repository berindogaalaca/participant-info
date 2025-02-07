/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Checkbox } from "../ui/checkbox";
import { FormItem, FormLabel, FormMessage } from "../ui/form";

interface RHFCheckboxProps {
  name: string;
  label?: string;
  helperText?: string;
}

export function RHFCheckbox({ name, label, helperText }: RHFCheckboxProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <FormItem>
          <Checkbox
            checked={field.value}
            onChange={field.onChange}
            label={label}
          />
          {helperText && <FormMessage>{helperText}</FormMessage>}
        </FormItem>
      )}
    />
  );
}

interface RHFMultiCheckboxProps {
  name: string;
  options: { label: string; value: any }[];
  label?: string;
  helperText?: string;
  row?: boolean;
}

export function RHFMultiCheckbox({
  name,
  options,
  label,
  helperText,
  row = false,
}: RHFMultiCheckboxProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <div className={row ? "flex gap-4" : "space-y-2"}>
            {options.map((option) => (
              <Checkbox
                key={option.value}
                checked={field.value.includes(option.value)}
                onChange={(checked) => {
                  if (checked) {
                    field.onChange([...field.value, option.value]);
                  } else {
                    field.onChange(
                      field.value.filter((value: any) => value !== option.value)
                    );
                  }
                }}
                label={option.label}
              />
            ))}
          </div>
          {(error || helperText) && (
            <FormMessage>{error ? error.message : helperText}</FormMessage>
          )}
        </FormItem>
      )}
    />
  );
}
