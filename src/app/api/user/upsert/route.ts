import { ApiResponse } from "@/lib/api-response";
import { createUserSchema } from "./schema";
import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const user = await request.json();

    const validationResult = createUserSchema.safeParse(user);

    if (!validationResult.success) {
      console.error("Validation Error:", validationResult.error);
      return ApiResponse.error(
        "Geçersiz veri formatı",
        validationResult.error.errors
      );
    }

    const requiredFields = [
      "first_name",
      "last_name",
      "email",
      "phone",
      "mobile",
      "gender",
      "city",
      "address",
      "country",
      "postalCode",
      "newsletter_name",
      "newsletter_email",
      "newsletter_gender",
      "isCheck",
    ];

    const missingFields = requiredFields.filter(
      (field) => user[field] === undefined || user[field] === null
    );

    if (missingFields.length > 0) {
      return ApiResponse.error(
        `Eksik Parametreler: ${missingFields.join(", ")}`,
        missingFields
      );
    }

    const userData = {
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      phone: user.phone,
      mobile: user.mobile,
      gender: user.gender,
      city: user.city,
      address: user.address,
      country: user.country,
      postalCode: user.postalCode,
      newsletter_name: user.newsletter_name,
      newsletter_email: user.newsletter_email,
      newsletter_gender: user.newsletter_gender,
      isCheck: user.isCheck,
    };

    await prisma.user.upsert({
      where: {
        id: user.id || "",
      },
      update: userData,
      create: userData,
    });

    return ApiResponse.success("Kullanici başarıyla kaydedildi");
  } catch (error) {
    console.error("Kullanici kaydetme hatası:", {
      error,
      stack: error instanceof Error ? error.stack : undefined,
      details: error instanceof Error ? error : undefined,
    });
    return ApiResponse.error(
      "Kullanici kaydedilirken bir hata oluştu",
      error instanceof Error ? error.message : String(error)
    );
  }
}
