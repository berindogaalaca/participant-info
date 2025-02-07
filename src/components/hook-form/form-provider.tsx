import { CSSProperties } from "react";
import { UseFormReturn, FormProvider as Form } from "react-hook-form";

interface FormValues {
  [key: string]: unknown;
}

type Props = {
  children: React.ReactNode;
  methods: UseFormReturn<FormValues>;
  onSubmit?: VoidFunction;
  style?: CSSProperties;
};

export default function FormProvider({
  children,
  onSubmit,
  methods,
  style,
}: Props) {
  return (
    <Form {...methods}>
      <form onSubmit={onSubmit} style={style}>
        {children}
      </form>
    </Form>
  );
}
