/* eslint-disable react-hooks/exhaustive-deps */
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Dispatch, SetStateAction, useEffect } from "react";
import { DialogTitle } from "@radix-ui/react-dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormProvider from "../hook-form/form-provider";
import { useToast } from "@/hooks/use-toast";
import { RHFCheckbox, RHFSelect, RHFTextField } from "../hook-form";
import { Label } from "../ui/label";
import { useTranslations } from "next-intl";
import {
  createUserSchema,
  CreateUserValues,
} from "@/app/api/user/upsert/schema";
import { User } from "@/types/users";
import { useDeleteUser, useUpsertUser } from "@/hooks/use-user";

interface ModalProps {
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
  initialData?: User | null;
  onAdd?: () => void;
  buttonText?: string;
  refetch: () => void;
}

export default function Modal({
  open,
  onOpenChange,
  initialData,
  refetch,
}: ModalProps) {
  const { toast } = useToast();
  const t = useTranslations();
  const { mutate } = useUpsertUser();
  const deleteUser = useDeleteUser();

  const defaultValues: Omit<User, "id" | "createdAt" | "updatedAt"> = {
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    mobile: "",
    gender: "",
    country: "",
    city: "",
    address: "",
    postalCode: "",
    newsletter_name: "",
    newsletter_email: "",
    newsletter_gender: "",
    isCheck: false,
  };
  const methods = useForm<CreateUserValues>({
    resolver: zodResolver(createUserSchema),
    defaultValues: initialData || defaultValues,
    shouldUseNativeValidation: false,
  });

  const { handleSubmit } = methods;

  useEffect(() => {
    if (initialData) {
      Object.keys(defaultValues).forEach((key) => {
        methods.setValue(
          key as keyof CreateUserValues,
          initialData[key as keyof User]
        );
      });
    }
  }, [initialData, methods]);

  const onSubmit = handleSubmit((values) => {
    mutate(
      { ...values, id: initialData?.id || "" },
      {
        onSuccess: (data) => {
          if (data.success) {
            toast({
              title: t("FORM.SUCCESS"),
              duration: 3000,
            });
            onOpenChange(false);
            refetch();
          } else {
            toast({
              title: t("FORM.FAIL"),
              variant: "destructive",
              duration: 3000,
            });
          }
        },
        onError: (error) => {
          console.error(t("FORM.FAIL"), error);
          toast({
            title: t("FORM.FAIL"),
            variant: "destructive",
            duration: 3000,
          });
        },
      }
    );
  });

  const handleDelete = (id: string) => {
    deleteUser.mutate(id, {
      onSuccess: (data) => {
        if (data.success) {
          toast({
            title: t("FORM.DELETE_SUCCESS"),
            duration: 3000,
          });
          methods.reset(defaultValues);
          onOpenChange(false);
          refetch();
        } else {
          toast({
            title: t("FORM.DELETE_FAIL"),
            variant: "destructive",
            duration: 3000,
          });
        }
      },
      onError: (error) => {
        console.error(t("FORM.DELETE_FAIL"), error);
        toast({
          title: t("FORM.DELETE_FAIL"),
          variant: "destructive",
          duration: 3000,
        });
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-10 w-full max-h-[90vh] overflow-y-auto dark:border-white">
        <DialogTitle className=""> {t("HEADER.TITLE")}</DialogTitle>
        <FormProvider methods={methods} onSubmit={onSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
            <RHFTextField
              name="email"
              placeholder={t("FORM.EMAIL")}
              type="email"
            />
            <RHFSelect
              name="gender"
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
            <RHFTextField
              name="first_name"
              placeholder={t("FORM.FIRST_NAME")}
            />
            <RHFTextField name="last_name" placeholder={t("FORM.LAST_NAME")} />
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
            <Label className="text-[#120C6E] text-lg font-semibold leading-6 dark:text-white">
              {t("FORM.TITLE")}
            </Label>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <RHFTextField
              name="newsletter_email"
              placeholder={t("FORM.EMAIL")}
              type="email"
            />
            <RHFSelect
              name="newsletter_gender"
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
            <RHFTextField
              name="newsletter_name"
              placeholder={t("FORM.FIRST_NAME")}
            />
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
        {initialData && (
          <Button
            onClick={() => handleDelete(initialData?.id)}
            className="w-1/2 font-semibold text-[20px] leading-8 bg-red-800 hover:bg-red-500 text-white rounded-full px-6 py-3 mt-6"
          >
            {t("FORM.DELETE")}
          </Button>
        )}
      </DialogContent>
    </Dialog>
  );
}
