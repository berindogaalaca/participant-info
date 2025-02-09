import { z } from "zod";

export const createUserSchema = z.object({
  first_name: z
    .string()
    .min(1, "VALIDATIONS.FIRST_NAME_REQUIRED")
    .regex(/^[a-zA-ZşŞçÇğĞüÜöÖıİ\s]+$/, "VALIDATIONS.FIRST_NAME_INVALID"),

  last_name: z
    .string()
    .min(1, "VALIDATIONS.LAST_NAME_REQUIRED")
    .regex(/^[a-zA-ZşŞçÇğĞüÜöÖıİ\s]+$/, "VALIDATIONS.LAST_NAME_INVALID"),

  email: z
    .string()
    .min(1, "VALIDATIONS.EMAIL_REQUIRED")
    .email("VALIDATIONS.EMAIL_INVALID")
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "VALIDATIONS.EMAIL_INVALID"),

  phone: z.string().min(1, "VALIDATIONS.PHONE_REQUIRED"),
  mobile: z.string().min(1, "VALIDATIONS.PHONE_REQUIRED"),

  city: z.string().min(1, "VALIDATIONS.CITY_REQUIRED"),
  address: z.string().min(1, "VALIDATIONS.ADDRESS_REQUIRED"),
  country: z.string().min(1, "VALIDATIONS.COUNTRY_REQUIRED"),

  gender: z.string().min(1, "VALIDATIONS.GENDER_REQUIRED"),

  postalCode: z
    .string()
    .min(1, "VALIDATIONS.POSTAL_CODE_REQUIRED")
    .regex(/^[0-9]{5}$/, "VALIDATIONS.POSTAL_CODE_INVALID"),

  newsletter_name: z
    .string()
    .min(1, "VALIDATIONS.FIRST_NAME_REQUIRED")
    .regex(/^[a-zA-ZşŞçÇğĞüÜöÖıİ\s]+$/, "VALIDATIONS.FIRST_NAME_INVALID"),

  newsletter_email: z
    .string()
    .min(1, "VALIDATIONS.EMAIL_REQUIRED")
    .email("VALIDATIONS.EMAIL_INVALID")
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "VALIDATIONS.EMAIL_INVALID"),

  newsletter_gender: z.string().min(1, "VALIDATIONS.GENDER_REQUIRED"),

  isCheck: z.boolean().optional().default(false),
});
export type CreateUserValues = z.infer<typeof createUserSchema>;
