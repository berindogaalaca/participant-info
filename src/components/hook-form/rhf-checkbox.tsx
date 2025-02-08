"use client";

import type * as React from "react";
import { useFormContext } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface RHFCheckboxProps
  extends React.ComponentPropsWithoutRef<typeof Checkbox> {
  name: string;
  label?: string;
  children?: React.ReactNode;
}

export function RHFCheckbox({
  name,
  label,
  children,
  ...other
}: RHFCheckboxProps) {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md">
          <FormControl>
            <Checkbox
              checked={field.value}
              onCheckedChange={field.onChange}
              {...other}
            />
          </FormControl>
          {(label || children) && (
            <FormLabel className="font-normal cursor-pointer">
              {label || children}
            </FormLabel>
          )}
          <FormMessage className="text-xs" />
        </FormItem>
      )}
    />
  );
}
