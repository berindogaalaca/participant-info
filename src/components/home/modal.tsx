import { z } from "zod";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Dispatch, SetStateAction } from "react";
import { DialogTitle } from "@radix-ui/react-dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormProvider from "../hook-form/form-provider";
import { useToast } from "@/hooks/use-toast";
import { RHFCheckbox, RHFSelect, RHFTextField } from "../hook-form";
import { Label } from "../ui/label";
import { useTranslations } from "next-intl";

interface ModalProps {
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
  onAdd?: () => void;
  buttonText?: string;
}

export default function Modal({ open, onOpenChange }: ModalProps) {
  const { toast } = useToast();
  const t = useTranslations();

  const UserSchema = z.object({
    firstName: z
      .string()
      .min(1, t("VALIDATIONS.FIRST_NAME_REQUIRED"))
      .regex(/^[a-zA-ZşŞçÇğĞüÜöÖıİ\s]+$/, t("VALIDATIONS.FIRST_NAME_INVALID")),

    lastName: z
      .string()
      .min(1, t("VALIDATIONS.LAST_NAME_REQUIRED"))
      .regex(/^[a-zA-ZşŞçÇğĞüÜöÖıİ\s]+$/, t("VALIDATIONS.LAST_NAME_INVALID")),

    email: z
      .string()
      .min(1, t("VALIDATIONS.EMAIL_REQUIRED"))
      .email(t("VALIDATIONS.EMAIL_INVALID"))
      .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, t("VALIDATIONS.EMAIL_INVALID")),

    phone: z.string().min(1, t("VALIDATIONS.PHONE_REQUIRED")),
    mobile: z.string().min(1, t("VALIDATIONS.PHONE_REQUIRED")),

    city: z.string().min(1, t("VALIDATIONS.CITY_REQUIRED")),
    address: z.string().min(1, t("VALIDATIONS.ADDRESS_REQUIRED")),
    country: z.string().min(1, t("VALIDATIONS.COUNTRY_REQUIRED")),

    salutation: z.string().min(1, t("VALIDATIONS.GENDER_REQUIRED")),

    postalCode: z
      .string()
      .min(1, t("VALIDATIONS.POSTAL_CODE_REQUIRED"))
      .regex(/^[0-9]{5}$/, t("VALIDATIONS.POSTAL_CODE_INVALID")),

    isCheck: z
      .boolean()
      .refine((val) => val === true, t("VALIDATIONS.TERMS_CONDITIONS")),
  });

  const defaultValues = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    mobile: "",
    salutation: "",
    country: "",
    city: "",
    address: "",
    postalCode: "",
    isCheck: false,
  };
  type UserSchemaType = z.infer<typeof UserSchema>;

  const methods = useForm<UserSchemaType>({
    resolver: zodResolver(UserSchema),
    defaultValues,
  });

  const { handleSubmit } = methods;

  const onSubmit = handleSubmit(async () => {
    try {
      const values = methods.getValues();
      console.log(values);

      toast({
        title: t("FORM.SUCCESS"),
        duration: 3000,
      });
    } catch (error) {
      console.error(t("FORM.FAIL"), error);
    }
  });
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-10 w-full max-h-[90vh] overflow-y-auto">
        <DialogTitle className=""> {t("HEADER.TITLE")}</DialogTitle>
        <FormProvider methods={methods} onSubmit={onSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
            <RHFTextField
              name="email"
              placeholder={t("FORM.EMAIL")}
              type="email"
            />
            <RHFSelect
              name="salutation"
              placeholder={t("FORM.SALUTATION")}
              options={[
                {
                  label: t("FORM.SALUTATION_MR"),
                  value: "Mr",
                },
                {
                  label: t("FORM.SALUTATION_MRS"),
                  value: "Mrs",
                },
              ]}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <RHFTextField name="firstName" placeholder={t("FORM.FIRST_NAME")} />
            <RHFTextField name="lastName" placeholder={t("FORM.LAST_NAME")} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <RHFTextField name="address" placeholder={t("FORM.ADDRESS")} />
            <RHFTextField
              name="postalCode"
              placeholder={t("FORM.POSTAL_CODE")}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <RHFTextField name="city" placeholder={t("FORM.CITY")} />
            <RHFTextField name="country" placeholder={t("FORM.COUNTRY")} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <RHFTextField name="phone" placeholder={t("FORM.PHONE")} />
            <RHFTextField name="mobile" placeholder={t("FORM.MOBILE")} />
          </div>
          <div className="mt-10">
            <Label className="text-[#120C6E] text-lg font-semibold leading-6">
              {t("FORM.TITLE")}
            </Label>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <RHFTextField
              name="email"
              placeholder={t("FORM.EMAIL")}
              type="email"
            />
            <RHFSelect
              name="salutation"
              placeholder={t("FORM.SALUTATION")}
              options={[
                {
                  label: "Mr",
                  value: "Mr",
                },
                {
                  label: "Mrs",
                  value: "Mrs",
                },
              ]}
            />{" "}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <RHFTextField name="firstName" placeholder={t("FORM.FIRST_NAME")} />
          </div>

          <div className="gap-6 mt-6">
            <RHFCheckbox name="isCheck">
              <Label>{t("FORM.CHECK")}</Label>
            </RHFCheckbox>
          </div>
          <Button
            type="submit"
            className="font-semibold text-[20px] leading-8 bg-[#15D2AD] hover:bg-emerald-500 text-white rounded-full px-6 py-3 mt-6"
          >
            {t("FORM.SAVE")}
          </Button>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
